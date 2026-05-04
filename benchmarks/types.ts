/**
 * Benchmark record types for tracking performance over time.
 */

/**
 * Aggregated timing stats for one benchmark case.
 */
export interface BenchmarkStats {
  /** Number of iterations executed during the measurement window. */
  n: number
  /** Fastest observed duration in nanoseconds. */
  min: number
  /** Slowest observed duration in nanoseconds. */
  max: number
  /** 75th percentile duration in nanoseconds. */
  p75: number
  /** 99th percentile duration in nanoseconds. */
  p99: number
  /** Mean duration in nanoseconds. */
  average: number
}

/**
 * Persisted benchmark result enriched with runtime metadata.
 */
export interface BenchmarkRecord {
  /** Workspace where the benchmarked function lives. */
  workspace: string
  /** Export name of the benchmarked function. */
  functionName: string
  /** Canonical alias target, when this function maps to another name. */
  canonicalName: string | null
  /** Fixture size used for the run. */
  fixtureSize: 'small' | 'medium' | 'large'
  /** ISO timestamp for when the record was produced. */
  timestamp: string
  /** Git commit hash associated with the run. */
  gitCommit: string
  /** Deno runtime version used for the run. */
  denoVersion: string
  /** Benchmark record schema version. */
  benchmarkSchemaVersion: string
  /** Package version read from project metadata. */
  packageVersion: string
  /** Operating system identifier. */
  os: string
  /** CPU architecture identifier. */
  arch: string
  /** CPU model when available from host metadata. */
  cpuModel: string | null
  /** Whether this benchmark case was intentionally skipped. */
  skipped: boolean
  /** Reason for skipping the case when skipped is true. */
  skipReason?: string
  /** Collected performance stats for executed cases. */
  stats?: BenchmarkStats
}
