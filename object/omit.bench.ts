/**
 * Benchmark for omit function
 */

import { omit } from './omit.ts'

// Test data
const smallObject = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  active: true,
  password: 'secret',
}

const mediumObject = Object.fromEntries(
  Array.from({ length: 50 }, (_, i) => [`key${i}`, `value${i}`]),
)

const largeObject = Object.fromEntries(
  Array.from({ length: 200 }, (_, i) => [`key${i}`, `value${i}`]),
)

Deno.bench('omit - small object, 1 key', () => {
  omit(smallObject, ['password'])
})

Deno.bench('omit - small object, 2 keys', () => {
  omit(smallObject, ['password', 'email'])
})

Deno.bench('omit - medium object (50 keys), omit 5', () => {
  omit(mediumObject, ['key1', 'key10', 'key20', 'key30', 'key40'])
})

Deno.bench('omit - large object (200 keys), omit 10', () => {
  omit(largeObject, [
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

Deno.bench('omit - empty keys array', () => {
  omit(smallObject, [])
})
