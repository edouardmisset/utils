/**
 * Benchmark fixtures for math operations.
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
  small: () => [1, 2, 3, 4, 5],

  medium: () => Array.from({ length: 100 }, (_, i) => i + 1),

  large: () => Array.from({ length: 10_000 }, (_, i) => Math.sin(i)),
}
