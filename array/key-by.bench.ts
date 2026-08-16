/**
 * Benchmarks comparing the original `keyBy` implementation (two-pass
 * `.filter().map()`) against the optimised version (single-pass `for…of`).
 *
 * @module
 */

import type { ObjectOfType } from '@edouardmisset/type'

type Item = { id: number; name: string }

// ---------------------------------------------------------------------------
// Original implementation
// ---------------------------------------------------------------------------

function keyByCurrent<
  Object_ extends Record<string, unknown>,
  Key extends keyof Object_,
>(array: Object_[], key: Key): undefined | ObjectOfType<Object_> {
  return array.length === 0
    ? undefined
    : (Object.fromEntries(
        array
          .filter((value) => value[key] !== undefined && value[key] !== null)
          .map((value) => [String(value[key]), value]),
      ) as ObjectOfType<Object_>)
}

// ---------------------------------------------------------------------------
// Optimised implementation (single pass)
// ---------------------------------------------------------------------------

function keyByOptimised<
  Object_ extends Record<string, unknown>,
  Key extends keyof Object_,
>(array: Object_[], key: Key): undefined | ObjectOfType<Object_> {
  if (array.length === 0) return undefined
  const entries: [string, Object_][] = []
  for (const value of array) {
    if (value[key] != null) entries.push([String(value[key]), value])
  }
  return Object.fromEntries(entries) as ObjectOfType<Object_>
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

Deno.bench('keyBy (current)   — 100 items', { group: 'keyBy-100' }, () => {
  keyByCurrent(items100, 'id')
})

Deno.bench(
  'keyBy (optimised) — 100 items',
  { group: 'keyBy-100', baseline: true },
  () => {
    keyByOptimised(items100, 'id')
  },
)

// ---------------------------------------------------------------------------
// Benchmarks — 10 000 items
// ---------------------------------------------------------------------------

Deno.bench('keyBy (current)   — 10 000 items', { group: 'keyBy-10k' }, () => {
  keyByCurrent(items10k, 'id')
})

Deno.bench(
  'keyBy (optimised) — 10 000 items',
  { group: 'keyBy-10k', baseline: true },
  () => {
    keyByOptimised(items10k, 'id')
  },
)
