/**
 * Benchmarks comparing the original `standardDeviation` implementation (two
 * separate `reduce` passes) against the optimised version (single-pass
 * Welford's online algorithm).
 *
 * @module
 */

// ---------------------------------------------------------------------------
// Original implementation
// ---------------------------------------------------------------------------

function standardDeviationCurrent(
  numbers: number[],
  options?: { usePopulation?: boolean },
): number {
  const { usePopulation = false } = options ?? {}
  if (numbers.length === 1) return 0

  const size = numbers.length
  const mean = numbers.reduce((total, value) => total + value, 0) / size
  const variance = numbers.reduce(
    (accumulatedVariance, value) => accumulatedVariance + (value - mean) ** 2,
    0,
  ) / (size - (usePopulation ? 0 : 1))

  return Math.sqrt(variance)
}

// ---------------------------------------------------------------------------
// Optimised implementation (Welford's online algorithm, single pass)
// ---------------------------------------------------------------------------

function standardDeviationOptimised(
  numbers: number[],
  options?: { usePopulation?: boolean },
): number {
  const { usePopulation = false } = options ?? {}
  if (numbers.length === 1) return 0

  const size = numbers.length
  let mean = 0
  let m2 = 0
  for (let i = 0; i < size; i++) {
    const delta = numbers[i] - mean
    mean += delta / (i + 1)
    m2 += delta * (numbers[i] - mean)
  }
  return Math.sqrt(m2 / (size - (usePopulation ? 0 : 1)))
}

// ---------------------------------------------------------------------------
// Fixture data
// ---------------------------------------------------------------------------

const SMALL = Array.from({ length: 100 }, (_, i) => i + 1)
const LARGE = Array.from({ length: 10_000 }, (_, i) => i + 1)

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

Deno.bench(
  'standardDeviation (current)   — 100 numbers',
  { group: 'stddev-small' },
  () => {
    standardDeviationCurrent(SMALL)
  },
)

Deno.bench(
  'standardDeviation (optimised) — 100 numbers',
  { group: 'stddev-small', baseline: true },
  () => {
    standardDeviationOptimised(SMALL)
  },
)

Deno.bench(
  'standardDeviation (current)   — 10 000 numbers',
  { group: 'stddev-large' },
  () => {
    standardDeviationCurrent(LARGE)
  },
)

Deno.bench(
  'standardDeviation (optimised) — 10 000 numbers',
  { group: 'stddev-large', baseline: true },
  () => {
    standardDeviationOptimised(LARGE)
  },
)
