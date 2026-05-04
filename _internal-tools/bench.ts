import { getAllWorkspaceConfigs } from './deno-config.ts'
import { validateFixturesOrThrow } from './validate-fixtures.ts'

/**
 * Main benchmark runner script.
 * Validates fixtures before running any benchmarks.
 */
async function main(): Promise<void> {
  try {
    const workspaces = await getAllWorkspaceConfigs()
    globalThis.console.log(` Validating ${workspaces.length} workspace fixtures...\n`)

    // Validate all fixtures before running benchmarks (fail fast)
    await validateFixturesOrThrow()

    globalThis.console.log(' All workspace fixtures are valid!\n')

    // TODO: Add actual benchmark execution here
    // For now, this is a placeholder for future benchmark implementation
    globalThis.console.log(' Benchmark execution would start here...')
    globalThis.console.log('   (Benchmark runner implementation pending)\n')
  } catch (error) {
    // Print the detailed error message and exit with error code
    globalThis.console.error(error instanceof Error ? error.message : String(error))
    Deno.exit(1)
  }
}

// Run the main function
if (import.meta.main) {
  await main()
}

// Made with Bob
