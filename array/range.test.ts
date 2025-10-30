import { assertEquals } from '@std/assert'
import { range } from './range.ts'

Deno.test('range', async (t) => {
  await t.step(
    'should create an array of numbers progressing from start to end',
    () => {
      const result = range(1, 5)
      assertEquals(result, [1, 2, 3, 4, 5])
    },
  )

  await t.step(
    'should create an array of numbers from 0 to 4',
    () => {
      const result = range(0, 4)
      assertEquals(result, [0, 1, 2, 3, 4])
    },
  )

  await t.step(
    'should create a range from 0 to 5 when end is not provided',
    () => {
      const result = range(5)
      assertEquals(result, [0, 1, 2, 3, 4, 5])
    },
  )

  await t.step(
    'should create a range from 0 to -4 (sorted ascending)',
    () => {
      const result = range(-4)
      assertEquals(result, [-4, -3, -2, -1, 0])
    },
  )

  await t.step(
    'should create a range from 0 to 10',
    () => {
      const result = range(0, 10)
      assertEquals(result, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    },
  )

  await t.step(
    'should handle negative range with both start and end provided',
    () => {
      const result = range(0, -4)
      assertEquals(result, [-4, -3, -2, -1, 0])
    },
  )

  await t.step(
    'should create an array of numbers progressing from a negative value to another negative with negative step',
    () => {
      const result = range(-4, -2, -2)
      assertEquals(result, [-4, -2])
    },
  )

  await t.step(
    'should create an array of numbers progressing from start to end with a specified step',
    () => {
      const result = range(0, 20, 5)
      assertEquals(result, [0, 5, 10, 15, 20])
    },
  )

  await t.step(
    'should return an empty array if the step is 0',
    () => {
      const result = range(0, 2, 0)
      assertEquals(result, [])
    },
  )
})
