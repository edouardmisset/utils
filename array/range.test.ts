import { assertEquals } from '@std/assert'
import { range } from './range.ts'

Deno.test('range', async (t) => {
  await t.step(
    'should create an array of numbers progressing from start to end',
    () => {
      const { data, error } = range({ start: 1, end: 5 })
      assertEquals(error, undefined)
      assertEquals(data, [1, 2, 3, 4, 5])
    },
  )

  await t.step(
    'should create an array of numbers progressing from 0 to start if end is not provided',
    () => {
      const { data, error } = range({ end: 4 })
      assertEquals(error, undefined)
      assertEquals(data, [0, 1, 2, 3, 4])
    },
  )

  await t.step(
    'should create an array of numbers progressing from 0 to negative start if end is not provided',
    () => {
      const { data, error } = range({ end: -4 })
      assertEquals(error, undefined)
      assertEquals(data, [-4, -3, -2, -1, 0])
    },
  )

  await t.step(
    'should create an array of numbers progressing from a negative value to another negative with negative step',
    () => {
      const { data, error } = range({ start: -4, end: -2, step: -2 })
      assertEquals(error, undefined)
      assertEquals(data, [-4, -2])
    },
  )

  await t.step(
    'should create an array of numbers progressing from start to end with a specified step',
    () => {
      const { data, error } = range({ start: 0, end: 20, step: 5 })
      assertEquals(error, undefined)
      assertEquals(data, [0, 5, 10, 15, 20])
    },
  )

  await t.step(
    'should return an error if the step is 0',
    () => {
      const { data, error } = range({ start: 0, end: 2, step: 0 })
      assertEquals(data, undefined)
      assertEquals(error?.message, 'step cannot be 0')
    },
  )
})
