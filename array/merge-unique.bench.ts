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

const SIZE = 1_000

const left = Array.from({ length: SIZE }, (_, i) => i)
const right = Array.from({ length: SIZE }, (_, i) => i + SIZE / 2)

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

Deno.bench(
  'mergeUnique (current)   — 1 000 + 1 000 items',
  { group: 'mergeUnique' },
  () => {
    mergeUniqueCurrent(left, right)
  },
)

Deno.bench(
  'mergeUnique (optimised) — 1 000 + 1 000 items',
  { group: 'mergeUnique', baseline: true },
  () => {
    mergeUniqueOptimised(left, right)
  },
)
