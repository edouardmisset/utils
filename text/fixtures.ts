/**
 * Benchmark fixtures for text operations.
 */

export interface FixtureFactory {
  /** Build a small representative fixture input. */
  small(): unknown
  /** Build a medium representative fixture input. */
  medium(): unknown
  /** Build a large representative fixture input. */
  large(): unknown
}

/** Runtime benchmark fixtures keyed by size. */
export const fixtures: FixtureFactory = {
  small: () => 'Hello World!',

  medium: () => 'The quick brown fox jumps over the lazy dog. '.repeat(10),

  large: () => 'The quick brown fox jumps over the lazy dog. '.repeat(1_000),
}
