/**
 * Benchmarks comparing the original `shallowEqual` implementation (sort both
 * key arrays before checking length) against the optimised version (check
 * length before sorting).
 *
 * @module
 */

import { objectKeys } from '@edouardmisset/object'
import type { ObjectOfType } from '@edouardmisset/type'

// ---------------------------------------------------------------------------
// Original implementation
// ---------------------------------------------------------------------------

function shallowEqualCurrent<Object_ extends ObjectOfType>(
  leftObject: Object_,
  rightObject: Object_,
): boolean {
  const leftKeys = objectKeys(leftObject).sort()
  const rightKeys = objectKeys(rightObject).sort()

  if (leftKeys.length !== rightKeys.length) return false

  return leftKeys.every(
    (key, index) =>
      key === rightKeys[index] &&
      (Number.isNaN(leftObject[key]) && Number.isNaN(rightObject[key])
        ? true
        : leftObject[key] === rightObject[key]),
  )
}

// ---------------------------------------------------------------------------
// Optimised implementation (early-exit before sorting)
// ---------------------------------------------------------------------------

function shallowEqualOptimised<Object_ extends ObjectOfType>(
  leftObject: Object_,
  rightObject: Object_,
): boolean {
  const leftKeys = objectKeys(leftObject)
  const rightKeys = objectKeys(rightObject)

  if (leftKeys.length !== rightKeys.length) return false

  leftKeys.sort()
  rightKeys.sort()

  return leftKeys.every(
    (key, index) =>
      key === rightKeys[index] &&
      (Number.isNaN(leftObject[key]) && Number.isNaN(rightObject[key])
        ? true
        : leftObject[key] === rightObject[key]),
  )
}

// ---------------------------------------------------------------------------
// Fixture data
// ---------------------------------------------------------------------------

// Same-size objects — sorting happens in both implementations
const objA = Object.fromEntries(
  Array.from({ length: 50 }, (_, i) => [`key${i}`, i]),
)
const objB = Object.fromEntries(
  Array.from({ length: 50 }, (_, i) => [`key${i}`, i]),
)

// Different-size objects — optimised version skips sorting entirely
const objSmall = Object.fromEntries(
  Array.from({ length: 10 }, (_, i) => [`key${i}`, i]),
)
const objLarge = Object.fromEntries(
  Array.from({ length: 50 }, (_, i) => [`key${i}`, i]),
)

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

Deno.bench(
  'shallowEqual (current)   — same size (50 keys)',
  { group: 'shallowEqual-same' },
  () => {
    shallowEqualCurrent(objA, objB)
  },
)

Deno.bench(
  'shallowEqual (optimised) — same size (50 keys)',
  { group: 'shallowEqual-same', baseline: true },
  () => {
    shallowEqualOptimised(objA, objB)
  },
)

Deno.bench(
  'shallowEqual (current)   — different sizes (early exit)',
  { group: 'shallowEqual-diff' },
  () => {
    shallowEqualCurrent(objSmall, objLarge)
  },
)

Deno.bench(
  'shallowEqual (optimised) — different sizes (early exit)',
  { group: 'shallowEqual-diff', baseline: true },
  () => {
    shallowEqualOptimised(objSmall, objLarge)
  },
)
