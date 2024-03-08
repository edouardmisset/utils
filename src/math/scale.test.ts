import { assertEquals, assertThrows } from 'asserts'
import { percent, rescale, scale } from './scale.ts'

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

Deno.test('rescale', async (t) => {
  await t.step('should scale a value from one range to another', () => {
    const result = rescale({ value: 5, minimum: 0, maximum: 10 })
    assertEquals(result, 0.5)
  })

  await t.step('should handle a value at the lower bound of the range', () => {
    const result = rescale({ value: 0, minimum: 0, maximum: 10 })
    assertEquals(result, 0)
  })

  await t.step('should handle a value at the upper bound of the range', () => {
    const result = rescale({ value: 10, minimum: 0, maximum: 10 })
    assertEquals(result, 1)
  })

  await t.step('should handle a negative value', () => {
    const result = rescale({ value: -5, minimum: -10, maximum: 10 })
    assertEquals(result, 0.25)
  })

  await t.step('should handle a negative range', () => {
    const result = rescale({ value: -5, minimum: -10, maximum: 0 })
    assertEquals(result, 0.5)
  })

  await t.step('should handle a value outside the range', () => {
    const result = rescale({ value: 15, minimum: 0, maximum: 10 })
    assertEquals(result, 1.5)
  })
})

Deno.test('percent', async (t) => {
  await t.step('should scale a value from one range to another', () => {
    const result = percent({ value: 5, minimum: 0, maximum: 10 })
    assertEquals(result, 50)
  })

  await t.step('should handle a value at the lower bound of the range', () => {
    const result = percent({ value: 0, minimum: 0, maximum: 10 })
    assertEquals(result, 0)
  })

  await t.step('should handle a value at the upper bound of the range', () => {
    const result = percent({ value: 10, minimum: 0, maximum: 10 })
    assertEquals(result, 100)
  })

  await t.step('should handle a negative value', () => {
    const result = percent({ value: -5, minimum: -10, maximum: 10 })
    assertEquals(result, 25)
  })

  await t.step('should handle a negative range', () => {
    const result = percent({ value: -5, minimum: -10, maximum: 0 })
    assertEquals(result, 50)
  })

  await t.step('should handle a value outside the range', () => {
    const result = percent({ value: 15, minimum: 0, maximum: 10 })
    assertEquals(result, 150)
  })
})
