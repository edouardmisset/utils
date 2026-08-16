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

function makeFixtures(size: number) {
  return {
    firstArray: Array.from({ length: size }, (_, i) => i),
    other1: Array.from({ length: size }, (_, i) => i + size / 2),
    other2: Array.from({ length: size }, (_, i) => i + size),
    other3: Array.from({ length: size }, (_, i) => i + size * 2),
    other4: Array.from({ length: size }, (_, i) => i + size * 3),
  }
}

const s100 = makeFixtures(100)
const s10k = makeFixtures(10_000)

// ---------------------------------------------------------------------------
// Benchmarks — 100 elements
// ---------------------------------------------------------------------------

Deno.bench(
  'uniqueInFirst (current)   — 100 items, 2 other arrays',
  { group: 'uniqueInFirst-100-2' },
  () => {
    uniqueInFirstCurrent(s100.firstArray, s100.other1, s100.other2)
  },
)

Deno.bench(
  'uniqueInFirst (optimised) — 100 items, 2 other arrays',
  { group: 'uniqueInFirst-100-2', baseline: true },
  () => {
    uniqueInFirstOptimised(s100.firstArray, s100.other1, s100.other2)
  },
)

Deno.bench(
  'uniqueInFirst (current)   — 100 items, 4 other arrays',
  { group: 'uniqueInFirst-100-4' },
  () => {
    uniqueInFirstCurrent(
      s100.firstArray,
      s100.other1,
      s100.other2,
      s100.other3,
      s100.other4,
    )
  },
)

Deno.bench(
  'uniqueInFirst (optimised) — 100 items, 4 other arrays',
  { group: 'uniqueInFirst-100-4', baseline: true },
  () => {
    uniqueInFirstOptimised(
      s100.firstArray,
      s100.other1,
      s100.other2,
      s100.other3,
      s100.other4,
    )
  },
)

// ---------------------------------------------------------------------------
// Benchmarks — 10 000 elements
// ---------------------------------------------------------------------------

Deno.bench(
  'uniqueInFirst (current)   — 10 000 items, 2 other arrays',
  { group: 'uniqueInFirst-10k-2' },
  () => {
    uniqueInFirstCurrent(s10k.firstArray, s10k.other1, s10k.other2)
  },
)

Deno.bench(
  'uniqueInFirst (optimised) — 10 000 items, 2 other arrays',
  { group: 'uniqueInFirst-10k-2', baseline: true },
  () => {
    uniqueInFirstOptimised(s10k.firstArray, s10k.other1, s10k.other2)
  },
)

Deno.bench(
  'uniqueInFirst (current)   — 10 000 items, 4 other arrays',
  { group: 'uniqueInFirst-10k-4' },
  () => {
    uniqueInFirstCurrent(
      s10k.firstArray,
      s10k.other1,
      s10k.other2,
      s10k.other3,
      s10k.other4,
    )
  },
)

Deno.bench(
  'uniqueInFirst (optimised) — 10 000 items, 4 other arrays',
  { group: 'uniqueInFirst-10k-4', baseline: true },
  () => {
    uniqueInFirstOptimised(
      s10k.firstArray,
      s10k.other1,
      s10k.other2,
      s10k.other3,
      s10k.other4,
    )
  },
)
