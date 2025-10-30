import { bold, green, yellow } from '@std/fmt/colors'
import { join } from '@std/path'
import {
  BARREL_FILE_NAME,
  DENO_FILE_NAME,
  getWorkspacePaths,
  readDenoConfig,
  ROOT_DIRECTORY,
} from './deno-config.ts'

type Result = {
  pkg: string
  moduleUpdated: boolean
  denoJsonUpdated: boolean
}



async function getTypescriptFiles(directory: string): Promise<string[]> {
  const expected: string[] = []
  for await (const entry of Deno.readDir(directory)) {
    if (!entry.isFile) continue
    if (!entry.name.endsWith('.ts')) continue
    if (entry.name === BARREL_FILE_NAME) continue
    if (entry.name.endsWith('.test.ts')) continue
    expected.push(entry.name)
  }
  expected.sort()
  return expected
}

async function getModuleDocumentComment(modulePath: string): Promise<string> {
  try {
    const content = await Deno.readTextFile(modulePath)
    // Extract the JSDoc comment block at the top of the file
    const docMatch = content.match(/^\/\*\*[\s\S]*?\*\/\n\n/m)
    return docMatch ? docMatch[0] : ''
  } catch (error) {
    globalThis.console.error(error)
    return ''
  }
}

function generateModuleContent(files: string[], documentComment: string): string {
  const documentationComment = documentComment || '\n/**\n * @module\n */\n\n'

  const exports = files.map((file) => `export * from './${file}'`).join('\n')
  return `${documentationComment + exports}\n`
}

async function updateBarrelFile(
  packageDirectory: string,
  files: string[],
): Promise<boolean> {
  const modulePath = join(packageDirectory, BARREL_FILE_NAME)

  // Get existing doc comment if barrel file exists
  const existingDocumentation = await getModuleDocumentComment(modulePath)
  const newContent = generateModuleContent(files, existingDocumentation)

  const currentContent = await Deno.readTextFile(modulePath)
  if (currentContent.trim() === newContent.trim()) return false // No changes needed

  await Deno.writeTextFile(modulePath, newContent)
  return true
}

async function updateDenoExports(
  packageDirectory: string,
  files: string[],
): Promise<boolean> {
  const denoPath = join(packageDirectory, DENO_FILE_NAME)

  try {
    const config = await readDenoConfig(denoPath)

    // Build the new exports object
    const newExports: Record<string, string> = {
      '.': `./${BARREL_FILE_NAME}`,
    }

    for (const file of files) {
      newExports[`./${file}`] = `./${file}`
    }

    // Check if exports are already correct
    const currentExports = config.exports ?? {}
    const exportsMatch = JSON.stringify(currentExports).trim() ===
      JSON.stringify(newExports).trim()
    if (exportsMatch) return false

    // Update the exports field
    config.exports = newExports

    // Write back with proper formatting (2 spaces)
    await Deno.writeTextFile(denoPath, `${JSON.stringify(config, null, 2)}\n`)

    return true
  } catch (error) {
    globalThis.console.error(
      yellow(`Warning: Could not update ${denoPath}: ${error}`),
    )
    return false
  }
}

async function processPackage(packageDirectory: string): Promise<Result> {
  const files = await getTypescriptFiles(packageDirectory)

  const [modUpdated, denoJsonUpdated] = await Promise.all([
    updateBarrelFile(packageDirectory, files),
    updateDenoExports(packageDirectory, files),
  ])

  return {
    pkg: packageDirectory,
    moduleUpdated: modUpdated,
    denoJsonUpdated,
  }
}

async function main(): Promise<void> {
  const rootDenoConfig = await readDenoConfig(`${ROOT_DIRECTORY}/${DENO_FILE_NAME}`)
  const workspaces = getWorkspacePaths(rootDenoConfig)
  if (workspaces.length === 0) {
    globalThis.console.warn(
      yellow(`No workspace packages defined in ${DENO_FILE_NAME}`),
    )
    Deno.exit(0)
  }

  const results = await Promise.all(workspaces.map((ws) => processPackage(ws)))

  let hasUpdates = false
  for (const { pkg, moduleUpdated: modUpdated, denoJsonUpdated } of results) {
    if (!modUpdated && !denoJsonUpdated) continue

    hasUpdates = true
    const updates: string[] = []
    if (modUpdated) updates.push(BARREL_FILE_NAME)
    if (denoJsonUpdated) updates.push(DENO_FILE_NAME)

    globalThis.console.log(
      bold(green(`✓ ${pkg}: updated ${updates.join(' and ')}`)),
    )
  }

  if (hasUpdates) {
    globalThis.console.log(
      green(bold('\n✅ All files have been updated')),
    )
  } else {
    globalThis.console.log(green(bold('✅ All files are up to date')))
  }
}

if (import.meta.main) {
  await main()

  await new Deno.Command('deno', { args: ['task', 'format'] }).output()
}
