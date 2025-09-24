import { assertEquals } from '@std/assert'
import { validNumberWithFallback } from './valid-number-with-fallback.ts'

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
