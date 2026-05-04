/**
 * Interface that all workspace fixtures must implement.
 * Provides test data at different scales for benchmarking.
 */
export interface FixtureFactory {
  /**
   * Returns a small dataset for quick benchmarks
   */
  small: () => unknown

  /**
   * Returns a medium-sized dataset for standard benchmarks
   */
  medium: () => unknown

  /**
   * Returns a large dataset for stress testing
   */
  large: () => unknown
}

// Made with Bob
