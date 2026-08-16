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

function makeFixtures(size: number) {
  return {
    arr1: Array.from({ length: size }, (_, i) => i),
    arr2: Array.from({ length: size }, (_, i) => i + size / 2),
    arr3: Array.from({ length: size }, (_, i) => i + size),
  }
}

const s100 = makeFixtures(100)
const s10k = makeFixtures(10_000)

// ---------------------------------------------------------------------------
// Benchmarks — 100 elements per array
// ---------------------------------------------------------------------------

Deno.bench(
  'symmetricDifference (current)   — 100 items, 2 arrays',
  { group: 'symDiff-100-2' },
  () => {
    symmetricDifferenceCurrent(s100.arr1, s100.arr2)
  },
)

Deno.bench(
  'symmetricDifference (optimised) — 100 items, 2 arrays',
  { group: 'symDiff-100-2', baseline: true },
  () => {
    symmetricDifferenceOptimised(s100.arr1, s100.arr2)
  },
)

Deno.bench(
  'symmetricDifference (current)   — 100 items, 3 arrays',
  { group: 'symDiff-100-3' },
  () => {
    symmetricDifferenceCurrent(s100.arr1, s100.arr2, s100.arr3)
  },
)

Deno.bench(
  'symmetricDifference (optimised) — 100 items, 3 arrays',
  { group: 'symDiff-100-3', baseline: true },
  () => {
    symmetricDifferenceOptimised(s100.arr1, s100.arr2, s100.arr3)
  },
)

// ---------------------------------------------------------------------------
// Benchmarks — 10 000 elements per array
// ---------------------------------------------------------------------------

Deno.bench(
  'symmetricDifference (current)   — 10 000 items, 2 arrays',
  { group: 'symDiff-10k-2' },
  () => {
    symmetricDifferenceCurrent(s10k.arr1, s10k.arr2)
  },
)

Deno.bench(
  'symmetricDifference (optimised) — 10 000 items, 2 arrays',
  { group: 'symDiff-10k-2', baseline: true },
  () => {
    symmetricDifferenceOptimised(s10k.arr1, s10k.arr2)
  },
)

Deno.bench(
  'symmetricDifference (current)   — 10 000 items, 3 arrays',
  { group: 'symDiff-10k-3' },
  () => {
    symmetricDifferenceCurrent(s10k.arr1, s10k.arr2, s10k.arr3)
  },
)

Deno.bench(
  'symmetricDifference (optimised) — 10 000 items, 3 arrays',
  { group: 'symDiff-10k-3', baseline: true },
  () => {
    symmetricDifferenceOptimised(s10k.arr1, s10k.arr2, s10k.arr3)
  },
)
