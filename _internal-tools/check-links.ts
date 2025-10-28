import { bold, green, red, rgb24 } from '@std/fmt/colors'

/**
 * Script to verify that all {@link ...} references in module JSDoc blocks (barrel files)
 * resolve to actual exported symbols present in the repository.
 *
 * Strategy:
 * 1. Discover all barrel files (top-level `mod.ts` plus workspace package mod.ts files).
 * 2. Extract JSDoc comment blocks preceding `@module` or the export list.
 * 3. Collect all {@link symbol} or {@link module.symbol} occurrences.
 * 4. Build a set of exported symbols by parsing each exported file for its exported identifiers
 *    using a lightweight regex (covers `export function`, `export const`, `export class`,
 *    `export interface`, `export type`, `export enum`, and re-exports `export { a, b as c } ...`).
 * 5. Report any links whose target symbol is missing.
 *
 * Limitations:
 * - Does not resolve symbols re-exported under a different name via `as` in `export * as` syntax.
 * - Does not parse default exports (since they are rarely used with {@link}).
 * - For namespaced {@link some/file.ts#Symbol} patterns, only symbol part after `#` is used.
 * - If a link includes a path (e.g., {@link ./math/mod.ts#sum}) the symbol after `#` is validated.
 *
 * Exit code is non-zero if any missing links are found.
 */

interface JSDocCheckResult {
  file: string
  missing: string[]
  links: string[]
}

const projectRoot = new URL('.', import.meta.url).pathname

async function listTsFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  for await (const entry of Deno.readDir(dir)) {
    if (entry.name.startsWith('.')) continue
    const full = `${dir}/${entry.name}`
    if (entry.isDirectory) {
      files.push(...await listTsFiles(full))
    } else if (entry.isFile && entry.name.endsWith('.ts')) {
      files.push(full)
    }
  }
  return files
}

// Collect exported identifiers from all .ts files
async function collectExports(): Promise<Set<string>> {
  const files = await listTsFiles(projectRoot)
  const exports = new Set<string>()
  const exportRegexes: RegExp[] = [
    /export\s+function\s+([A-Za-z0-9_]+)/g,
    /export\s+const\s+([A-Za-z0-9_]+)/g,
    /export\s+class\s+([A-Za-z0-9_]+)/g,
    /export\s+interface\s+([A-Za-z0-9_]+)/g,
    /export\s+type\s+([A-Za-z0-9_]+)/g,
    /export\s+enum\s+([A-Za-z0-9_]+)/g,
    /export\s+{([^}]+)}/g,
  ]

  for (const file of files) {
    const content = await Deno.readTextFile(file)
    for (const reg of exportRegexes) {
      reg.lastIndex = 0
      let m: RegExpExecArray | null
      while ((m = reg.exec(content))) {
        if (reg === exportRegexes[6]) { // destructured export list
          const names = m[1].split(',').map((s) => s.trim()).filter(Boolean)
          for (const n of names) {
            // handle `a as b`
            const parts = n.split(/\s+as\s+/i)
            exports.add((parts[1] ?? parts[0]).trim())
          }
        } else {
          exports.add(m[1])
        }
      }
    }
  }
  return exports
}

// Identify barrel files: top-level mod.ts plus any mod.ts in first-level subdirectories
async function discoverBarrelFiles(): Promise<string[]> {
  const barrelFiles: string[] = []
  for await (const entry of Deno.readDir(projectRoot)) {
    if (entry.isFile && entry.name === 'mod.ts') {
      barrelFiles.push(`${projectRoot}${entry.name}`)
    }
    if (entry.isDirectory) {
      const modPath = `${projectRoot}${entry.name}/mod.ts`
      try {
        const stat = await Deno.stat(modPath)
        if (stat.isFile) barrelFiles.push(modPath)
      } catch (_) { /* ignore: directory may not contain mod.ts */ }
    }
  }
  return barrelFiles
}

function extractJsDocLinks(content: string): string[] {
  // Grab the first big JSDoc block
  const blockMatch = content.match(/\/\*\*[\s\S]*?\*\//)
  if (!blockMatch) return []
  const block = blockMatch[0]
  const links: string[] = []
  const linkRegex = /{@link\s+([^}\s]+)(?:\s+[^}]*)?}/g
  let m: RegExpExecArray | null
  while ((m = linkRegex.exec(block))) {
    let target = m[1].trim()
    // If contains # pick part after
    if (target.includes('#')) target = target.split('#').pop() as string
    // Strip module path qualifiers like module:, jsr:, file paths, ./, ../
    target = target.replace(/^module:|^jsr:[^#]*#?/, '')
    if (target.includes('/')) target = target.split('/').pop() as string
    if (target) links.push(target)
  }
  return links
}

async function checkBarrel(
  file: string,
  exportedSymbols: Set<string>,
): Promise<JSDocCheckResult> {
  const content = await Deno.readTextFile(file)
  const links = extractJsDocLinks(content)
  const missing = links.filter((l) => !exportedSymbols.has(l))
  return { file, links, missing }
}

const exportedSymbols = await collectExports()
const barrels = await discoverBarrelFiles()
const results: JSDocCheckResult[] = []
for (const barrel of barrels) {
  results.push(await checkBarrel(barrel, exportedSymbols))
}

let hasErrors = false
for (const r of results) {
  if (r.missing.length) {
    hasErrors = true
    globalThis.console.error(red(`❌ ${r.file}\n`))
    globalThis.console.error(
      red(`  Missing symbols for links: ${r.missing.join(', ')}\n`),
    )
  } else {
    globalThis.console.log(green(`✅ ${r.file} (${r.links.length} links OK)\n`))
  }
}

if (hasErrors) {
  globalThis.console.error(red('Errors found in JSDoc links.'))

  Deno.exit(1)
} else {
  globalThis.console.log(
    bold(
      green(
        `✅ All JSDoc {${
          rgb24('@link', { r: 222, g: 49, b: 99 })
        }} references are valid.`,
      ),
    ),
  )
}
