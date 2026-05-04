/**
 * Fixture factory for array benchmarks
 * Provides test data at different scales
 */

/**
 * Returns a small dataset for quick benchmarks
 */
export function small(): number[] {
  return Array.from({ length: 10 }, (_, index) => index)
}

/**
 * Returns a medium-sized dataset for standard benchmarks
 */
export function medium(): number[] {
  return Array.from({ length: 1000 }, (_, index) => index)
}

/**
 * Returns a large dataset for stress testing
 */
export function large(): number[] {
  return Array.from({ length: 100_000 }, (_, index) => index)
}


