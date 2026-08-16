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

const SIZE = 1_000

const items: Item[] = Array.from({ length: SIZE }, (_, i) => ({
  id: i,
  name: `name-${i}`,
}))

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

Deno.bench('keyBy (current)   — 1 000 items', { group: 'keyBy' }, () => {
  keyByCurrent(items, 'id')
})

Deno.bench(
  'keyBy (optimised) — 1 000 items',
  { group: 'keyBy', baseline: true },
  () => {
    keyByOptimised(items, 'id')
  },
)
