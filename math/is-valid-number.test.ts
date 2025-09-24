import { assert } from '@std/assert'
import { isValidNumber } from './is-valid.ts'

Deno.test('isValidNumber function', async (t) => {
  await t.step('valid numbers', () => {
    assert(isValidNumber(1))
    assert(isValidNumber(0))
    assert(isValidNumber(-1))
  })

  await t.step('invalid numbers', () => {
    assert(!isValidNumber('1'))
    assert(!isValidNumber(null))
    assert(!isValidNumber(undefined))
    assert(!isValidNumber({}))
    assert(!isValidNumber(NaN))
    assert(!isValidNumber(Infinity))
  })
})
