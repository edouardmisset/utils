/**
 * Benchmarks comparing the original `mergeUnique` implementation (spread both
 * arrays into a new array before constructing a Set) against the optimised
 * version (seed the Set from the left array, then add right elements
 * incrementally).
 *
 * @module
 */

// ---------------------------------------------------------------------------
// Original implementation
// ---------------------------------------------------------------------------

function mergeUniqueCurrent<T>(
  leftArray: T[] | readonly T[],
  rightArray: T[] | readonly T[],
): T[] {
  return Array.from(new Set([...leftArray, ...rightArray]))
}

// ---------------------------------------------------------------------------
// Optimised implementation (no spread intermediate array)
// ---------------------------------------------------------------------------

function mergeUniqueOptimised<T>(
  leftArray: T[] | readonly T[],
  rightArray: T[] | readonly T[],
): T[] {
  const set = new Set(leftArray)
  for (const v of rightArray) set.add(v)
  return Array.from(set)
}

// ---------------------------------------------------------------------------
// Fixture data
// ---------------------------------------------------------------------------

const left100 = Array.from({ length: 100 }, (_, i) => i)
const right100 = Array.from({ length: 100 }, (_, i) => i + 50)

const left10k = Array.from({ length: 10_000 }, (_, i) => i)
const right10k = Array.from({ length: 10_000 }, (_, i) => i + 5_000)

// ---------------------------------------------------------------------------
// Benchmarks — 100 + 100 items
// ---------------------------------------------------------------------------

Deno.bench(
  'mergeUnique (current)   — 100 + 100 items',
  { group: 'mergeUnique-100' },
  () => {
    mergeUniqueCurrent(left100, right100)
  },
)

Deno.bench(
  'mergeUnique (optimised) — 100 + 100 items',
  { group: 'mergeUnique-100', baseline: true },
  () => {
    mergeUniqueOptimised(left100, right100)
  },
)

// ---------------------------------------------------------------------------
// Benchmarks — 10 000 + 10 000 items
// ---------------------------------------------------------------------------

Deno.bench(
  'mergeUnique (current)   — 10 000 + 10 000 items',
  { group: 'mergeUnique-10k' },
  () => {
    mergeUniqueCurrent(left10k, right10k)
  },
)

Deno.bench(
  'mergeUnique (optimised) — 10 000 + 10 000 items',
  { group: 'mergeUnique-10k', baseline: true },
  () => {
    mergeUniqueOptimised(left10k, right10k)
  },
)
