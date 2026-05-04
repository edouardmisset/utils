/**
 * Benchmark fixtures for type operations.
 * Type operations are compile-time only, so no runtime fixtures needed.
 */

export interface FixtureFactory {
  /** Build a small representative fixture input. */
  small(): unknown
  /** Build a medium representative fixture input. */
  medium(): unknown
  /** Build a large representative fixture input. */
  large(): unknown
}

/** Type workspace has no runtime functions, so fixtures are minimal. */
export const fixtures: FixtureFactory = {
  small: () => null,
  medium: () => null,
  large: () => null,
}
