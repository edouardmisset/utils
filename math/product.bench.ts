/**
 * Benchmark for product function
 */

import { product } from './product.ts'

// Test data
const smallArray = [1, 2, 3, 4, 5]
const mediumArray = Array.from({ length: 10 }, (_, i) => i + 1)
const largeArray = Array.from({ length: 20 }, (_, i) => i + 1)
const decimals = [1.5, 2.5, 3.5]

Deno.bench('product - small array (5 elements)', () => {
  product(smallArray)
})

Deno.bench('product - medium array (10 elements)', () => {
  product(mediumArray)
})

Deno.bench('product - large array (20 elements)', () => {
  product(largeArray)
})

Deno.bench('product - decimal numbers', () => {
  product(decimals)
})

Deno.bench('product - single element', () => {
  product([42])
})

Deno.bench('product - with zero', () => {
  product([1, 2, 0, 4, 5])
})
