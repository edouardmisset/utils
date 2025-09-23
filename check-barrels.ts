import { bold, green, red, yellow } from 'jsr:@std/fmt/colors'
import { extname, join } from 'jsr:@std/path'
import rootDenoJson from './deno.json' with { type: 'json' }

type Result = {
  pkg: string
  missing: string[]
  extra: string[]
  ok: boolean
}

function normalizeExportPath(p: string): string {
  // Ensure we compare using explicit .ts extension and a leading ./
  let out = p.trim()
  if (!out.startsWith('./')) out = `./${out}`
  if (extname(out) === '') out = `${out}.ts`
  return out
}

async function getExportsFromBarrel(modPath: string): Promise<Set<string>> {
  const content = await Deno.readTextFile(modPath)
  const re = /export\s+(?:\*\s+from|\{[^}]*\}\s+from)\s+['"]([^'"\n]+)['"];?/g
  const exported = new Set<string>()
  let m: RegExpExecArray | null
  while ((m = re.exec(content)) !== null) {
    exported.add(normalizeExportPath(m[1]))
  }
  return exported
}

async function getExpectedModuleFiles(dir: string): Promise<string[]> {
  const expected: string[] = []
  for await (const entry of Deno.readDir(dir)) {
    if (!entry.isFile) continue
    if (!entry.name.endsWith('.ts')) continue
    if (entry.name === 'mod.ts') continue
    if (entry.name.endsWith('.test.ts')) continue
    expected.push(`./${entry.name}`)
  }
  expected.sort()
  return expected
}

async function checkPackage(pkgDir: string): Promise<Result> {
  const modPath = join(pkgDir, 'mod.ts')
  try {
    await Deno.stat(modPath)
  } catch {
    return { pkg: pkgDir, missing: ['mod.ts'], extra: [], ok: false }
  }

  const [exported, expected] = await Promise.all([
    getExportsFromBarrel(modPath),
    getExpectedModuleFiles(pkgDir),
  ])

  const missing: string[] = []
  for (const rel of expected) {
    if (!exported.has(rel)) missing.push(rel)
  }

  const extra: string[] = []
  for (const rel of exported) {
    if (!expected.includes(rel)) extra.push(rel)
  }

  return {
    pkg: pkgDir,
    missing,
    extra,
    ok: missing.length === 0 && extra.length === 0,
  }
}

async function main(): Promise<void> {
  const workspaces = (rootDenoJson.workspace ?? []) as string[]
  if (!Array.isArray(workspaces) || workspaces.length === 0) {
    globalThis.console.warn(
      yellow('No workspace packages defined in deno.json'),
    )
    Deno.exit(0)
  }

  const results = await Promise.all(workspaces.map((ws) => checkPackage(ws)))

  let failed = false
  for (const result of results) {
    const { pkg, missing, extra, ok } = result
    if (ok) {
      globalThis.console.log(green(`✔ ${pkg}: barrel up to date`))
      continue
    }
    failed = true
    globalThis.console.error(bold(red(`✖ ${pkg}: barrel mismatch`)))
    const workspaceModPath = join(pkg, 'mod.ts')

    if (missing.length) {
      globalThis.console.error(red(bold(workspaceModPath)))
      globalThis.console.error(red('  Missing re-exports:'))
      for (const m of missing) globalThis.console.error(red(`    - ${m}`))
    }

    if (extra.length) {
      globalThis.console.error(yellow(bold(workspaceModPath)))
      globalThis.console.error(yellow('  Extra re-exports (no matching file):'))
      for (const e of extra) globalThis.console.error(yellow(`    - ${e}`))
    }
  }

  if (failed) Deno.exit(1)
  globalThis.console.log(green(bold('All barrel files are consistent ✅')))
}

if (import.meta.main) {
  await main()
}
