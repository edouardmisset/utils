/**
 * Fixture factory for array benchmarks
 * Provides test data at different scales
 */

/**
 * Returns a small dataset for quick benchmarks
 */
export function small(): number[] {
  return Array.from({ length: 10 }, (_, i) => i)
}

/**
 * Returns a medium-sized dataset for standard benchmarks
 */
export function medium(): number[] {
  return Array.from({ length: 1000 }, (_, i) => i)
}

/**
 * Returns a large dataset for stress testing
 */
export function large(): number[] {
  return Array.from({ length: 100000 }, (_, i) => i)
}

// Made with Bob
