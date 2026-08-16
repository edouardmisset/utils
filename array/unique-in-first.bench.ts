/**
 * Benchmarks comparing the original `uniqueInFirst` implementation (one Set
 * per "other" array, O(n·m) lookup via `.some()`) against the optimised version
 * (single merged Set, O(1) per lookup).
 *
 * @module
 */

// ---------------------------------------------------------------------------
// Original implementation
// ---------------------------------------------------------------------------

function uniqueInFirstCurrent<T>(
  firstArray: T[] | readonly T[],
  ...otherArrays: (T[] | readonly T[])[]
): T[] {
  const sets = otherArrays.map((array) => new Set(array))
  return firstArray.filter((item) => !sets.some((set) => set.has(item)))
}

// ---------------------------------------------------------------------------
// Optimised implementation (single merged Set)
// ---------------------------------------------------------------------------

function uniqueInFirstOptimised<T>(
  firstArray: T[] | readonly T[],
  ...otherArrays: (T[] | readonly T[])[]
): T[] {
  const excluded = new Set(otherArrays.flat())
  return firstArray.filter((item) => !excluded.has(item))
}

// ---------------------------------------------------------------------------
// Fixture data
// ---------------------------------------------------------------------------

const SIZE = 1_000

const firstArray = Array.from({ length: SIZE }, (_, i) => i)
const other1 = Array.from({ length: SIZE }, (_, i) => i + SIZE / 2)
const other2 = Array.from({ length: SIZE }, (_, i) => i + SIZE)
const other3 = Array.from({ length: SIZE }, (_, i) => i + SIZE * 2)
const other4 = Array.from({ length: SIZE }, (_, i) => i + SIZE * 3)

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

Deno.bench(
  'uniqueInFirst (current)   — 2 other arrays',
  { group: 'uniqueInFirst-2' },
  () => {
    uniqueInFirstCurrent(firstArray, other1, other2)
  },
)

Deno.bench(
  'uniqueInFirst (optimised) — 2 other arrays',
  { group: 'uniqueInFirst-2', baseline: true },
  () => {
    uniqueInFirstOptimised(firstArray, other1, other2)
  },
)

Deno.bench(
  'uniqueInFirst (current)   — 4 other arrays',
  { group: 'uniqueInFirst-4' },
  () => {
    uniqueInFirstCurrent(firstArray, other1, other2, other3, other4)
  },
)

Deno.bench(
  'uniqueInFirst (optimised) — 4 other arrays',
  { group: 'uniqueInFirst-4', baseline: true },
  () => {
    uniqueInFirstOptimised(firstArray, other1, other2, other3, other4)
  },
)
