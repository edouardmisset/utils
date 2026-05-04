import { exists } from '@std/fs'
import { join, toFileUrl } from '@std/path'
import {
  getAllWorkspaceConfigs,
  ROOT_DIRECTORY,
} from './deno-config.ts'
import type { FixtureFactory } from './fixture-types.ts'

/** Error details for a single workspace fixture validation failure */
interface FixtureValidationError {
  workspaceName: string
  expectedPath: string
  missing: string[]
}

/** Result of fixture validation across all workspaces */
interface ValidationResult {
  success: boolean
  errors: FixtureValidationError[]
}

/**
 * Validates that a workspace has a fixtures.ts file with required exports
 * @param workspaceName - Name of the workspace to validate
 * @returns Validation error if any, null if valid
 */
async function validateWorkspaceFixtures(
  workspaceName: string,
): Promise<FixtureValidationError | null> {
  const fixturePath = join(ROOT_DIRECTORY, workspaceName, 'fixtures.ts')
  const missing: string[] = []

  // Check if fixtures.ts exists
  const fixtureExists = await exists(fixturePath)
  if (!fixtureExists) {
    missing.push('fixtures.ts file')
    return {
      workspaceName,
      expectedPath: fixturePath,
      missing,
    }
  }

  // Try to import and validate exports
  try {
    // Use proper URL construction for cross-platform compatibility
    const fixtureUrl = toFileUrl(fixturePath).href
    const url = new URL(fixtureUrl)

    // Validate that the import path is a safe local file URL
    if (url.protocol !== 'file:') {
      throw new Error(`Invalid fixture import path: ${fixtureUrl}`)
    }

    // codacy-disable-next-line
    const fixtureModule = await import(url.href)

    // Support both named exports and default export object
    const source = fixtureModule.default ?? fixtureModule

    // Validate required function exports
    const requiredFunctions: (keyof FixtureFactory)[] = [
      'small',
      'medium',
      'large',
    ]

    for (const functionName of requiredFunctions) {
      if (typeof source[functionName] !== 'function') {
        missing.push(`${functionName}() function`)
      }
    }

    if (missing.length > 0) {
      return {
        workspaceName,
        expectedPath: fixturePath,
        missing,
      }
    }

    return null
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    missing.push(`valid fixtures.ts (import failed: ${errorMessage})`)
    return {
      workspaceName,
      expectedPath: fixturePath,
      missing,
    }
  }
}

/**
 * Validates fixtures across all workspaces
 * @returns Validation result with any errors found
 */
export async function validateAllFixtures(): Promise<ValidationResult> {
  const workspaceConfigs = await getAllWorkspaceConfigs()
  const errors: FixtureValidationError[] = []

  // Validate each workspace in parallel
  const validationResults = await Promise.all(
    workspaceConfigs.map(({ workspaceName }) =>
      validateWorkspaceFixtures(workspaceName)
    ),
  )

  // Collect errors
  for (const result of validationResults) {
    if (result !== null) {
      errors.push(result)
    }
  }

  return {
    success: errors.length === 0,
    errors,
  }
}

/**
 * Formats validation errors into a readable error message
 * @param errors - Array of validation errors
 * @returns Formatted error message
 */
function formatValidationErrors(errors: FixtureValidationError[]): string {
  const lines = [
    ' Fixture validation failed!\n',
    `Found ${errors.length} workspace${errors.length === 1 ? '' : 's'} with missing or invalid fixtures:\n`,
  ]

  for (const error of errors) {
    lines.push(`\n   Workspace: ${error.workspaceName}`)
    lines.push(`     Path: ${error.expectedPath}`)
    lines.push(`     Missing: ${error.missing.join(', ')}`)
  }

  lines.push('\n\n Required: Each workspace must have a fixtures.ts file that exports:')
  lines.push('   • small(): function returning small test dataset')
  lines.push('   • medium(): function returning medium test dataset')
  lines.push('   • large(): function returning large test dataset')
  lines.push('\n   Supports both named exports and default export object.')

  return lines.join('\n')
}

/**
 * Validates all workspace fixtures and throws if any are invalid
 * @throws Error with detailed information about missing fixtures
 */
export async function validateFixturesOrThrow(): Promise<void> {
  const result = await validateAllFixtures()

  if (!result.success) {
    // Errors are intentionally propagated and handled by bench.ts
    throw new Error(formatValidationErrors(result.errors))
  }
}

// Made with Bob
