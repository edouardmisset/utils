import { assertEquals } from '@std/assert'
import { toFixedWithoutZeros } from './to-fixed-without-zero.ts'

Deno.test('toFixedWithoutZeros', async (t) => {
  await t.step('formats number with trailing zeros', () => {
    const result = toFixedWithoutZeros(1.23000, 5)
    assertEquals(result, '1.23')
  })

  await t.step(
    'formats number with trailing zeros and whole number without decimal',
    () => {
      const result = toFixedWithoutZeros(1.00000, 5)
      assertEquals(result, '1')
    },
  )
})
