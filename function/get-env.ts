/**
 * A Readonly object mapping environment prefixes to different environments.
 */
import process from 'node:process'

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
 * @param {string} environmentVariable - The name of the environment variable to retrieve.
 * @param {EnvType} [environmentType='node'] - The environment from which to retrieve the variable.
 * 'node' and 'CRA' will use process.env, 'vite' will use import.meta.env.
 *
 * @throws {TypeError} Will throw an error if the environment variable is not set.
 *
 * @returns {Promise<string>} The value of the environment variable.
 *
 * @example
 * ```typescript
 * getEnv('MY_VARIABLE', 'node').then(value => console.log(value)) // logs the value of MY_VARIABLE from process.env
 * getEnv('MY_VARIABLE', 'vite').then(value => console.log(value)) // logs the value of MY_VARIABLE from import.meta.env
 * ```
 */
export async function getEnv(
  environmentVariable: string,
  environmentType: EnvType = 'node',
): Promise<string> {
  const prefix = ENVIRONNEMENT_PREFIX[environmentType]
  let value: string | undefined = undefined

  if (environmentType === 'node' || environmentType === 'CRA') {
    value = process.env[environmentVariable] ??
      process.env[`${prefix}${environmentVariable}`]
  }
  if (environmentType === 'vite') {
    // @ts-expect-error: it depends on the environment
    value = import.meta.env[environmentVariable] ??
      // @ts-expect-error: it depends on the environment
      import.meta.env[`${prefix}${environmentVariable}`]
  }

  if (environmentType === 'deno') {
    try {
      const dotenv = await import('@std/dotenv')
      const env = await dotenv?.load()
      value = env[environmentVariable]
    } catch (error) {
      globalThis.console.error("Error loading Deno's `dotenv` library:", error)
    }
  }

  if (value === undefined) {
    throw new TypeError(
      `It seems like the variable "${environmentVariable}" is not set in the environment (\`.env\` file).
    @Dev: Did you forget to execute "cp .env.dev .env" and adjust variables in the .env file to match your own environment ?`,
    )
  }
  return value
}
