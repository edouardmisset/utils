import { join } from '@std/path'
import { z } from 'zod'

/** Barrel file name used for module exports */
export const BARREL_FILE_NAME = 'mod.ts'
/** Deno's configuration file name */
export const DENO_FILE_NAME: string = 'deno.json'
/** This is the project's root directory */
export const ROOT_DIRECTORY: string = new URL('..', import.meta.url).pathname
/** This is the path to the root Deno configuration file */
export const ROOT_DENO_FILE_PATH: string = join(ROOT_DIRECTORY, DENO_FILE_NAME)

/** Basic Deno configuration schema */
const basicDenoConfigSchema = z.object({
  name: z.string(),
  version: z.string(),
  workspace: z.array(z.string()),
  exports: z.record(z.string(), z.string()),
}).partial()

/** Basic Deno configuration type */
export type BasicDenoConfig = z.infer<typeof basicDenoConfigSchema>

/**
 * Reads and validates a basic deno configuration file
 * @param path - Path to the deno file
 * @returns Validated configuration object
 * @throws Error if file cannot be read or validation fails
 */
export async function readDenoConfig(path: string): Promise<BasicDenoConfig> {
  try {
    const content = await Deno.readTextFile(path)
    const parsedConfig = JSON.parse(content)
    return basicDenoConfigSchema.parse(parsedConfig)
  } catch (error) {
    throw new Error(
      `Invalid ${DENO_FILE_NAME} configuration at ${path}: ${error}`,
    )
  }
}

/**
 * Gets workspace member paths from a Deno configuration.
 * The returned paths are normalized by removing any leading './' prefix.
 * @param config - The deno configuration object
 * @returns Array of normalized workspace member paths (without leading './')
 */
export function getWorkspacePaths(
  config: BasicDenoConfig,
): string[] {
  return config.workspace
    ?.map((pkg) => pkg.replace(/^\.\//, '')) ?? []
}

/**
 * Gets all deno configurations from workspace members
 * @param rootConfig - The root deno configuration object
 * @returns Array of workspace member configurations with their paths
 */
export async function getAllWorkspaceConfigs(): Promise<
  { workspaceName: string; path: string; config: BasicDenoConfig }[]
> {
  const rootConfig = await readDenoConfig(ROOT_DENO_FILE_PATH)
  const workspaceInfo = getWorkspacePaths(rootConfig).map((path) => {
    const workspaceName = path.replace(/^\.\//, '')
    return {
      workspaceName,
      path: join(ROOT_DIRECTORY, workspaceName, DENO_FILE_NAME),
    }
  })

  const configs = await Promise.all(
    workspaceInfo.map(async ({ path, workspaceName }) => ({
      workspaceName,
      path,
      config: await readDenoConfig(path),
    })),
  )

  return configs.filter((item) => item.config !== null)
}
