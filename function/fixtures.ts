/**
 * Benchmark fixtures for function operations.
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
  small: () => ((x: number) => x * 2),

  medium: () =>
    Array.from({ length: 100 }, (_, i) => (x: number) => x * (i + 1)),

  large: () => ({
    callbacks: Array.from(
      { length: 1_000 },
      (_, i) => (x: number) => x * (i + 1),
    ),
    data: Array.from({ length: 1_000 }, (_, i) => i),
  }),
}
