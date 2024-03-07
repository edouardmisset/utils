import { assert, assertEquals } from 'asserts'
import { isValidNumber, validNumberWithFallback } from './is-valid.ts'

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

Deno.test('validNumberWithFallback function', async (t) => {
  const fallbackNumber = 5
  await t.step('valid numbers', () => {
    assertEquals(validNumberWithFallback(1, fallbackNumber), 1)
    assertEquals(validNumberWithFallback(0, fallbackNumber), 0)
    assertEquals(validNumberWithFallback(-1, fallbackNumber), -1)
  })

  await t.step('invalid numbers', () => {
    assertEquals(validNumberWithFallback('1', fallbackNumber), 1)
    assertEquals(validNumberWithFallback(NaN, fallbackNumber), fallbackNumber)
    assertEquals(
      validNumberWithFallback(Infinity, fallbackNumber),
      fallbackNumber,
    )
  })
})
