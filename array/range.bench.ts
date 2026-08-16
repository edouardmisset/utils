/**
 * Benchmarks comparing the original `range` implementation (with a redundant
 * `.sort()`) against the optimised version (no sort needed because values are
 * already generated in ascending order).
 *
 * @module
 */

// ---------------------------------------------------------------------------
// Original implementation
// ---------------------------------------------------------------------------

function rangeCurrent(start: number, end?: number, step = 1): number[] {
  if (step === 0) return []

  const adjustedEnd = end ?? start
  const adjustedStart = end === undefined ? 0 : start

  const lowerBound = Math.min(adjustedStart, adjustedEnd)
  const upperBound = Math.max(adjustedStart, adjustedEnd)

  const length =
    Math.ceil(Math.abs(upperBound - lowerBound) / Math.abs(step)) + 1

  return Array.from(
    { length },
    (_, index) => lowerBound + index * (step < 0 ? -step : step),
  ).sort((a, b) => a - b)
}

// ---------------------------------------------------------------------------
// Optimised implementation (no redundant sort)
// ---------------------------------------------------------------------------

function rangeOptimised(start: number, end?: number, step = 1): number[] {
  if (step === 0) return []

  const adjustedEnd = end ?? start
  const adjustedStart = end === undefined ? 0 : start

  const lowerBound = Math.min(adjustedStart, adjustedEnd)
  const upperBound = Math.max(adjustedStart, adjustedEnd)

  const length =
    Math.ceil(Math.abs(upperBound - lowerBound) / Math.abs(step)) + 1

  const absStep = step < 0 ? -step : step
  return Array.from({ length }, (_, index) => lowerBound + index * absStep)
}

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

const SMALL = 100
const LARGE = 10_000

Deno.bench('range (current)  — small (0..100)', { group: 'range-small' }, () => {
  rangeCurrent(0, SMALL)
})

Deno.bench(
  'range (optimised) — small (0..100)',
  { group: 'range-small', baseline: true },
  () => {
    rangeOptimised(0, SMALL)
  },
)

Deno.bench(
  'range (current)  — large (0..10 000)',
  { group: 'range-large' },
  () => {
    rangeCurrent(0, LARGE)
  },
)

Deno.bench(
  'range (optimised) — large (0..10 000)',
  { group: 'range-large', baseline: true },
  () => {
    rangeOptimised(0, LARGE)
  },
)
