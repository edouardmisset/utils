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

// Same-size objects — 100 keys
const objA100 = Object.fromEntries(
  Array.from({ length: 100 }, (_, i) => [`key${i}`, i]),
)
const objB100 = Object.fromEntries(
  Array.from({ length: 100 }, (_, i) => [`key${i}`, i]),
)

// Same-size objects — 10 000 keys
const objA10k = Object.fromEntries(
  Array.from({ length: 10_000 }, (_, i) => [`key${i}`, i]),
)
const objB10k = Object.fromEntries(
  Array.from({ length: 10_000 }, (_, i) => [`key${i}`, i]),
)

// Different-size objects — optimised version skips sorting entirely
// 100 vs 10 000 keys (early exit scenario)
const objSmall = Object.fromEntries(
  Array.from({ length: 100 }, (_, i) => [`key${i}`, i]),
)
const objLarge = Object.fromEntries(
  Array.from({ length: 10_000 }, (_, i) => [`key${i}`, i]),
)

// ---------------------------------------------------------------------------
// Benchmarks — same size, 100 keys
// ---------------------------------------------------------------------------

Deno.bench(
  'shallowEqual (current)   — same size, 100 keys',
  { group: 'shallowEqual-same-100' },
  () => {
    shallowEqualCurrent(objA100, objB100)
  },
)

Deno.bench(
  'shallowEqual (optimised) — same size, 100 keys',
  { group: 'shallowEqual-same-100', baseline: true },
  () => {
    shallowEqualOptimised(objA100, objB100)
  },
)

// ---------------------------------------------------------------------------
// Benchmarks — same size, 10 000 keys
// ---------------------------------------------------------------------------

Deno.bench(
  'shallowEqual (current)   — same size, 10 000 keys',
  { group: 'shallowEqual-same-10k' },
  () => {
    shallowEqualCurrent(objA10k, objB10k)
  },
)

Deno.bench(
  'shallowEqual (optimised) — same size, 10 000 keys',
  { group: 'shallowEqual-same-10k', baseline: true },
  () => {
    shallowEqualOptimised(objA10k, objB10k)
  },
)

// ---------------------------------------------------------------------------
// Benchmarks — different sizes (early exit): 100 vs 10 000 keys
// ---------------------------------------------------------------------------

Deno.bench(
  'shallowEqual (current)   — different sizes, early exit',
  { group: 'shallowEqual-diff' },
  () => {
    shallowEqualCurrent(objSmall, objLarge)
  },
)

Deno.bench(
  'shallowEqual (optimised) — different sizes, early exit',
  { group: 'shallowEqual-diff', baseline: true },
  () => {
    shallowEqualOptimised(objSmall, objLarge)
  },
)
