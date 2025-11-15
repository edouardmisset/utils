/**
 * Benchmark for roundToPrecision function
 */

import { roundToPrecision } from './round-to-precision.ts'

// Test data
const decimals = [1.2345, 2.6789, 3.1415, 4.5678, 5.9876]

Deno.bench('roundToPrecision - precision 0', () => {
  decimals.forEach((n) => roundToPrecision(n, 0))
})

Deno.bench('roundToPrecision - precision 1', () => {
  decimals.forEach((n) => roundToPrecision(n, 1))
})

Deno.bench('roundToPrecision - precision 2', () => {
  decimals.forEach((n) => roundToPrecision(n, 2))
})

Deno.bench('roundToPrecision - precision 3', () => {
  decimals.forEach((n) => roundToPrecision(n, 3))
})

Deno.bench('roundToPrecision - negative precision', () => {
  roundToPrecision(12345, -2)
})
