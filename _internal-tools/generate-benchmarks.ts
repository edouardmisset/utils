// deno-lint-ignore-file no-console
/**
 * Generator script to create benchmark files for all functions
 */

import { join } from '@std/path'
import { ensureFile } from '@std/fs'

const WORKSPACES = [
  'array',
  'date',
  'function',
  'math',
  'object',
  'text',
  'type',
]

// Template for benchmark file
function generateBenchmarkTemplate(
  functionName: string,
  _workspace: string,
): string {
  const importPath = `./${functionName}.ts`
  const camelCaseName = functionName.replace(/-./g, (x) => x[1].toUpperCase())

  return `/**
 * Benchmark for ${functionName} function
 */

import { ${camelCaseName} } from '${importPath}'

// TODO: Add appropriate test data and benchmark cases
// Example:
// const testData = { /* your test data */ }

Deno.bench('${camelCaseName} - basic case', () => {
  // ${camelCaseName}(testData)
  // TODO: Implement benchmark
})

// Add more benchmark cases as needed:
// Deno.bench('${camelCaseName} - edge case', () => {
//   // ${camelCaseName}(edgeCaseData)
// })
`
}

/**
 * Get all function files in a workspace
 */
async function getFunctionFiles(workspace: string): Promise<string[]> {
  const workspacePath = join(Deno.cwd(), workspace)
  const functionFiles: string[] = []

  try {
    for await (const entry of Deno.readDir(workspacePath)) {
      if (
        entry.isFile &&
        entry.name.endsWith('.ts') &&
        !entry.name.endsWith('.test.ts') &&
        !entry.name.endsWith('.bench.ts') &&
        entry.name !== 'mod.ts'
      ) {
        functionFiles.push(entry.name.replace('.ts', ''))
      }
    }
  } catch (error) {
    console.error(`Error reading workspace ${workspace}:`, error)
  }

  return functionFiles
}

/**
 * Main function
 */
async function main(): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('📝 Generating benchmark files...\n')

  let totalCreated = 0
  let totalSkipped = 0

  for (const workspace of WORKSPACES) {
    console.log(`Processing ${workspace}...`)
    const functionFiles = await getFunctionFiles(workspace)

    for (const functionName of functionFiles) {
      const benchPath = join(
        Deno.cwd(),
        workspace,
        `${functionName}.bench.ts`,
      )

      try {
        // Check if benchmark file already exists
        try {
          await Deno.stat(benchPath)
          console.log(`  ⏭️  Skipping ${functionName} (already exists)`)
          totalSkipped++
          continue
        } catch {
          // File doesn't exist, create it
        }

        // Create the benchmark file
        const content = generateBenchmarkTemplate(functionName, workspace)
        await ensureFile(benchPath)
        await Deno.writeTextFile(benchPath, content)

        console.log(`  ✅ Created ${functionName}.bench.ts`)
        totalCreated++
      } catch (error) {
        console.error(
          `  ❌ Error creating benchmark for ${functionName}:`,
          error,
        )
      }
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`  Created: ${totalCreated}`)
  console.log(`  Skipped: ${totalSkipped}`)
  console.log(`\n⚠️  Note: Generated files contain templates only.`)
  console.log(`   Please update them with appropriate test data and cases.`)
}

if (import.meta.main) {
  await main()
}
