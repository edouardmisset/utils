import { assertEquals } from 'asserts'
import { roundToPrecision } from './round-to-precision.ts'

Deno.test('roundToPrecision', async (t) => {
  await t.step('rounds number to specified precision', () => {
    const result = roundToPrecision(1.2365, 2)
    assertEquals(result, 1.24)
  })

  await t.step('rounds number to zero decimal places by default', () => {
    const result = roundToPrecision(1.2345)
    assertEquals(result, 1)
  })

  await t.step(
    'rounds number to specified precision with negative number',
    () => {
      const result = roundToPrecision(-1.2365, 2)
      assertEquals(result, -1.24)
    },
  )
})
