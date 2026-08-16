/**
 * Benchmarks comparing the original `symmetricDifference` implementation
 * (`.flat()` + chained `.filter().map()` over entries) against the optimised
 * version (nested `for…of` loops, single-pass result collection).
 *
 * @module
 */

// ---------------------------------------------------------------------------
// Original implementation
// ---------------------------------------------------------------------------

function symmetricDifferenceCurrent<T>(
  ...arrays: (T[] | readonly T[])[]
): T[] {
  const counts = new Map<T, number>()
  arrays.flat().forEach((value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  })

  return [...counts.entries()]
    .filter(([, count]) => count === 1)
    .map(([value]) => value)
}

// ---------------------------------------------------------------------------
// Optimised implementation (no flat, no chained filter/map)
// ---------------------------------------------------------------------------

function symmetricDifferenceOptimised<T>(
  ...arrays: (T[] | readonly T[])[]
): T[] {
  const counts = new Map<T, number>()
  for (const array of arrays) {
    for (const value of array) {
      counts.set(value, (counts.get(value) ?? 0) + 1)
    }
  }

  const result: T[] = []
  for (const [value, count] of counts) {
    if (count === 1) result.push(value)
  }
  return result
}

// ---------------------------------------------------------------------------
// Fixture data
// ---------------------------------------------------------------------------

const SIZE = 1_000

const arr1 = Array.from({ length: SIZE }, (_, i) => i)
const arr2 = Array.from({ length: SIZE }, (_, i) => i + SIZE / 2)
const arr3 = Array.from({ length: SIZE }, (_, i) => i + SIZE)

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

Deno.bench(
  'symmetricDifference (current)   — 2 arrays',
  { group: 'symDiff-2' },
  () => {
    symmetricDifferenceCurrent(arr1, arr2)
  },
)

Deno.bench(
  'symmetricDifference (optimised) — 2 arrays',
  { group: 'symDiff-2', baseline: true },
  () => {
    symmetricDifferenceOptimised(arr1, arr2)
  },
)

Deno.bench(
  'symmetricDifference (current)   — 3 arrays',
  { group: 'symDiff-3' },
  () => {
    symmetricDifferenceCurrent(arr1, arr2, arr3)
  },
)

Deno.bench(
  'symmetricDifference (optimised) — 3 arrays',
  { group: 'symDiff-3', baseline: true },
  () => {
    symmetricDifferenceOptimised(arr1, arr2, arr3)
  },
)
