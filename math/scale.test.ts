import { assertEquals } from '@std/assert'
import { scale } from './scale.ts'

Deno.test('scale', async (t) => {
  await t.step('scales value from one range to another', () => {
    const result = scale({
      inMaximum: 10,
      inMinimum: 0,
      outMaximum: 100,
      outMinimum: 0,
      value: 5,
    })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 50)
  })

  await t.step(
    'scales value from one range to another with default out range',
    () => {
      const result = scale({ value: 50, inMaximum: 100, inMinimum: 0 })
      assertEquals(result.error, undefined)
      assertEquals(result.data, 0.5)
    },
  )

  await t.step('returns error when inMinimum equals inMaximum', () => {
    const result = scale({ value: 5, inMaximum: 10, inMinimum: 10 })
    assertEquals(result.data, undefined)
    assertEquals(
      result.error?.message,
      'inMinimum (10) cannot equal inMaximum (10) as this leads to a division by 0.',
    )
  })
})
