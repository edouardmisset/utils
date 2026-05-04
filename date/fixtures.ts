/**
 * Benchmark fixtures for date operations.
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
  small: () => new Date('2024-01-15'),

  medium: () =>
    Array.from({ length: 100 }, (_, i) => new Date(2024, 0, (i % 28) + 1)),

  large: () =>
    Array.from(
      { length: 10_000 },
      (_, i) => new Date(2024, i % 12, (i % 28) + 1),
    ),
}
