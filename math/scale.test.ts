import { assertEquals } from '@std/assert'
import { scale } from './scale.ts'
import { rescale } from './rescale.ts'
import { percent } from './percent.ts'

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

Deno.test('rescale', async (t) => {
  await t.step('should scale a value from one range to another', () => {
    const result = rescale({ maximum: 10, minimum: 0, value: 5 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 0.5)
  })

  await t.step('should handle a value at the lower bound of the range', () => {
    const result = rescale({ maximum: 10, minimum: 0, value: 0 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 0)
  })

  await t.step('should handle a value at the upper bound of the range', () => {
    const result = rescale({ maximum: 10, minimum: 0, value: 10 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 1)
  })

  await t.step('should handle a negative value', () => {
    const result = rescale({ maximum: 10, minimum: -10, value: -5 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 0.25)
  })

  await t.step('should handle a negative range', () => {
    const result = rescale({ maximum: 0, minimum: -10, value: -5 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 0.5)
  })

  await t.step('should handle a value outside the range', () => {
    const result = rescale({ maximum: 10, minimum: 0, value: 15 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 1.5)
  })
})

Deno.test('percent', async (t) => {
  await t.step('should scale a value from one range to another', () => {
    const result = percent({ maximum: 10, minimum: 0, value: 5 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 50)
  })

  await t.step('should handle a value at the lower bound of the range', () => {
    const result = percent({ maximum: 10, minimum: 0, value: 0 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 0)
  })

  await t.step('should handle a value at the upper bound of the range', () => {
    const result = percent({ maximum: 10, minimum: 0, value: 10 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 100)
  })

  await t.step('should handle a negative value', () => {
    const result = percent({ maximum: 10, minimum: -10, value: -5 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 25)
  })

  await t.step('should handle a negative range', () => {
    const result = percent({ maximum: 0, minimum: -10, value: -5 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 50)
  })

  await t.step('should handle a value outside the range', () => {
    const result = percent({ maximum: 10, minimum: 0, value: 15 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 150)
  })
})
