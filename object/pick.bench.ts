/**
 * Benchmark for pick function
 */

import { pick } from './pick.ts'

// Test data
const smallObject = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  active: true,
}

const mediumObject = Object.fromEntries(
  Array.from({ length: 50 }, (_, i) => [`key${i}`, `value${i}`]),
)

const largeObject = Object.fromEntries(
  Array.from({ length: 200 }, (_, i) => [`key${i}`, `value${i}`]),
)

Deno.bench('pick - small object, 2 keys', () => {
  pick(smallObject, ['id', 'name'])
})

Deno.bench('pick - small object, most keys', () => {
  pick(smallObject, ['id', 'name', 'email', 'age'])
})

Deno.bench('pick - medium object (50 keys), pick 5', () => {
  pick(mediumObject, ['key1', 'key10', 'key20', 'key30', 'key40'])
})

Deno.bench('pick - large object (200 keys), pick 10', () => {
  pick(largeObject, [
    'key1',
    'key20',
    'key40',
    'key60',
    'key80',
    'key100',
    'key120',
    'key140',
    'key160',
    'key180',
  ])
})

Deno.bench('pick - empty keys array', () => {
  pick(smallObject, [])
})
