import { err, ok, type Result, tryCatch } from '@edouardmisset/function'
import process from 'node:process'

/**
 * A Readonly object mapping environment prefixes to different environments.
 */
export const ENVIRONNEMENT_PREFIX = {
  node: '',
  CRA: 'REACT_APP_',
  vite: 'VITE_',
  next: 'NEXT_',
  deno: '',
} as const

/**
 * Type of the environment for which to retrieve the environment variable.
 */
export type EnvType = keyof typeof ENVIRONNEMENT_PREFIX

/**
 * Retrieves the value of an environment variable.
 *
 * @param {string} environmentVariable - The name of the environment variable to
 * retrieve.
 * @param {EnvType} [environmentType='node'] - The environment from which to
 * retrieve the variable. 'node' and 'CRA' will use process.env, 'vite' will use
 * import.meta.env.
 *
 * @returns {Promise<Result<string, TypeError>>} A Result containing either the
 * environment variable value or a TypeError if not found.
 */
export async function getEnv(
  environmentVariable: string,
  environmentType: EnvType = 'node',
): Promise<Result<string, TypeError>> {
  const prefix = ENVIRONNEMENT_PREFIX[environmentType]

  const getValue = async (): Promise<string | undefined> => {
    if (environmentType === 'node' || environmentType === 'CRA') {
      return process.env[environmentVariable] ??
        process.env[`${prefix}${environmentVariable}`]
    }
    if (environmentType === 'vite') {
      // @ts-expect-error: it depends on the environment
      return import.meta.env[environmentVariable] ??
        // @ts-expect-error: it depends on the environment
        import.meta.env[`${prefix}${environmentVariable}`]
    }
    if (environmentType === 'deno') {
      const loadDotenv = async () => {
        const dotenv = await import('@std/dotenv')
        const env = await dotenv.load()
        return env[environmentVariable]
      }

      const result = await tryCatch(loadDotenv())

      if (result.error) {
        globalThis.console.error(
          "Error loading Deno's `dotenv` library:",
          result.error,
        )
        return undefined
      }
      return result.data
    }
    return undefined
  }

  const value = await getValue()

  if (value === undefined) {
    return err(
      new TypeError(
        `It seems like the variable "${environmentVariable}" is not set in the environment (\`.env\` file).
    @Dev: Did you forget to execute "cp .env.dev .env" and adjust variables in the .env file to match your own environment ?`,
      ),
    ) as Result<string, TypeError>
  }
  return ok(value) as Result<string, TypeError>
}
