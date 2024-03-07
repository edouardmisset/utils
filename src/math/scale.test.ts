import { assertEquals, assertThrows } from 'asserts'
import { scale } from './scale.ts'

Deno.test('scale', async (t) => {
  await t.step('scales value from one range to another', () => {
    const result = scale({
      inMinimum: 0,
      inMaximum: 10,
      outMinimum: 0,
      outMaximum: 100,
      value: 5,
    })
    assertEquals(result, 50)
  })

  await t.step(
    'scales value from one range to another with default out range',
    () => {
      const result = scale({ inMinimum: 0, inMaximum: 100, value: 50 })
      assertEquals(result, 0.5)
    },
  )

  await t.step('throws error when inMinimum equals inMaximum', () => {
    assertThrows(
      () => scale({ inMinimum: 10, inMaximum: 10, value: 5 }),
      Error,
      'inMinimum (10) cannot equal inMaximum (10) as this leads to a division by 0.',
    )
  })
})
