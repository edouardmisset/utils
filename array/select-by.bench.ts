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

const SIZE = 1_000

const items: Item[] = Array.from({ length: SIZE }, (_, i) => ({
  id: i,
  name: `name-${i}`,
}))

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

Deno.bench('selectBy (current)   — 1 000 items', { group: 'selectBy' }, () => {
  selectByCurrent(items, 'name')
})

Deno.bench(
  'selectBy (optimised) — 1 000 items',
  { group: 'selectBy', baseline: true },
  () => {
    selectByOptimised(items, 'name')
  },
)
