/**
 * Benchmark fixtures for object operations.
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
  small: () => ({ x: 1, y: 2, z: 3 }),

  medium: () =>
    Object.fromEntries(
      Array.from({ length: 100 }, (_, i) => [`key${i}`, Math.sin(i)]),
    ),

  large: () =>
    Object.fromEntries(
      Array.from({ length: 10_000 }, (_, i) => [`key${i}`, Math.sin(i)]),
    ),
}
