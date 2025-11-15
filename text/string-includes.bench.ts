/**
 * Benchmark for stringIncludes function
 */

import { stringIncludes } from './string-includes.ts'

// Test data
const text = 'Hello World, this is a test string'
const longText =
  'This is a much longer string with many words to search through for performance testing'

Deno.bench('stringIncludes - found at start', () => {
  stringIncludes(text, 'hello')
})

Deno.bench('stringIncludes - found in middle', () => {
  stringIncludes(text, 'world')
})

Deno.bench('stringIncludes - found at end', () => {
  stringIncludes(text, 'string')
})

Deno.bench('stringIncludes - not found', () => {
  stringIncludes(text, 'notfound')
})

Deno.bench('stringIncludes - long text search', () => {
  stringIncludes(longText, 'performance')
})

Deno.bench('stringIncludes - exact case match', () => {
  stringIncludes(text, 'Hello')
})

Deno.bench('stringIncludes - empty search', () => {
  stringIncludes(text, '')
})
