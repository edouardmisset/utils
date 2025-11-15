/**
 * Benchmark for stringToBoolean function
 */

import { stringToBoolean } from './string-to-boolean.ts'

Deno.bench('stringToBoolean - "true"', () => {
  stringToBoolean('true')
})

Deno.bench('stringToBoolean - "false"', () => {
  stringToBoolean('false')
})

Deno.bench('stringToBoolean - "TRUE"', () => {
  stringToBoolean('TRUE')
})

Deno.bench('stringToBoolean - "FALSE"', () => {
  stringToBoolean('FALSE')
})

Deno.bench('stringToBoolean - "1"', () => {
  stringToBoolean('1')
})

Deno.bench('stringToBoolean - "0"', () => {
  stringToBoolean('0')
})

Deno.bench('stringToBoolean - "yes"', () => {
  stringToBoolean('yes')
})

Deno.bench('stringToBoolean - "no"', () => {
  stringToBoolean('no')
})

Deno.bench('stringToBoolean - invalid string', () => {
  stringToBoolean('invalid')
})

Deno.bench('stringToBoolean - empty string', () => {
  stringToBoolean('')
})
