/**
 * Benchmark for removeAccents function
 */

import { removeAccents } from './remove-accents.ts'

// Test data
const simple = 'hello world'
const withAccents = 'héllo wörld çafé'
const manyAccents = 'àéêíóúñçåäöü'
const longText =
  'Thé qüíck bröwn fóx júmps övér thé läzy dög. Héllo Wörld! Çafé, naïve, résumé.'
const mixed = 'Some normal text with àccénts and símböls!'

Deno.bench('removeAccents - simple text (no accents)', () => {
  removeAccents(simple)
})

Deno.bench('removeAccents - text with few accents', () => {
  removeAccents(withAccents)
})

Deno.bench('removeAccents - text with many accents', () => {
  removeAccents(manyAccents)
})

Deno.bench('removeAccents - long text with accents', () => {
  removeAccents(longText)
})

Deno.bench('removeAccents - mixed content', () => {
  removeAccents(mixed)
})

Deno.bench('removeAccents - empty string', () => {
  removeAccents('')
})
