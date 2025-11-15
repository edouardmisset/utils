/**
 * Benchmark for slugify function
 */

import { slugify } from './slugify.ts'

// Test data
const simple = 'Hello World'
const withAccents = 'Héllo Wörld Café'
const withSpecialChars = 'Hello! World? How are you?'
const longText =
  'This is a much longer text with many words and special characters! It should test performance.'
const multipleSpaces = 'Hello    World    With    Multiple    Spaces'
const mixedCase = 'HeLLo WoRLd MiXeD CaSe'

Deno.bench('slugify - simple text', () => {
  slugify(simple)
})

Deno.bench('slugify - with accents', () => {
  slugify(withAccents)
})

Deno.bench('slugify - with special characters', () => {
  slugify(withSpecialChars)
})

Deno.bench('slugify - long text', () => {
  slugify(longText)
})

Deno.bench('slugify - multiple spaces', () => {
  slugify(multipleSpaces)
})

Deno.bench('slugify - mixed case', () => {
  slugify(mixedCase)
})
