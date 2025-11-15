/**
 * Benchmark for clamp function
 */

import { clamp } from './clamp.ts'

Deno.bench('clamp - value within range', () => {
  clamp(5, 0, 10)
})

Deno.bench('clamp - value below minimum', () => {
  clamp(-5, 0, 10)
})

Deno.bench('clamp - value above maximum', () => {
  clamp(15, 0, 10)
})

Deno.bench('clamp - value at minimum', () => {
  clamp(0, 0, 10)
})

Deno.bench('clamp - value at maximum', () => {
  clamp(10, 0, 10)
})

Deno.bench('clamp - negative range', () => {
  clamp(-5, -10, -1)
})

Deno.bench('clamp - decimal values', () => {
  clamp(5.5, 0.5, 10.5)
})
