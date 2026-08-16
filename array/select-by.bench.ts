/**
 * Benchmarks comparing the original `selectBy` implementation (`flatMap` with
 * per-element wrapper arrays) against the optimised version (`for…of` with
 * `push`).
 *
 * @module
 */

import type { ObjectOfType } from '@edouardmisset/type'

type Item = { id: number; name: string }

// ---------------------------------------------------------------------------
// Original implementation
// ---------------------------------------------------------------------------

function selectByCurrent<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(array: Object_[], key: Key): Object_[Key][] {
  return array.flatMap((item) => (Object.hasOwn(item, key) ? [item[key]] : []))
}

// ---------------------------------------------------------------------------
// Optimised implementation (for-loop with push)
// ---------------------------------------------------------------------------

function selectByOptimised<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(array: Object_[], key: Key): Object_[Key][] {
  const result: Object_[Key][] = []
  for (const item of array) {
    if (Object.hasOwn(item, key)) result.push(item[key])
  }
  return result
}

// ---------------------------------------------------------------------------
// Fixture data
// ---------------------------------------------------------------------------

const items100: Item[] = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `name-${i}`,
}))

const items10k: Item[] = Array.from({ length: 10_000 }, (_, i) => ({
  id: i,
  name: `name-${i}`,
}))

// ---------------------------------------------------------------------------
// Benchmarks — 100 items
// ---------------------------------------------------------------------------

Deno.bench('selectBy (current)   — 100 items', { group: 'selectBy-100' }, () => {
  selectByCurrent(items100, 'name')
})

Deno.bench(
  'selectBy (optimised) — 100 items',
  { group: 'selectBy-100', baseline: true },
  () => {
    selectByOptimised(items100, 'name')
  },
)

// ---------------------------------------------------------------------------
// Benchmarks — 10 000 items
// ---------------------------------------------------------------------------

Deno.bench(
  'selectBy (current)   — 10 000 items',
  { group: 'selectBy-10k' },
  () => {
    selectByCurrent(items10k, 'name')
  },
)

Deno.bench(
  'selectBy (optimised) — 10 000 items',
  { group: 'selectBy-10k', baseline: true },
  () => {
    selectByOptimised(items10k, 'name')
  },
)
