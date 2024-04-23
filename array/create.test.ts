import { assertEquals, assertThrows } from '@std/assert'
import { createArray, range } from './create.ts'

Deno.test('createArray', async (t) => {
  await t.step(
    'should create an array of a specified length and populate it with the results of calling a provided function on every index',
    () => {
      const transform = (_: unknown, index: number) => index * 2
      assertEquals(createArray(5, transform), [0, 2, 4, 6, 8])
    },
  )

  await t.step(
    'should create an array of a specified length and populate it with strings',
    () => {
      const transform = (_: unknown, index: number) => `Item ${index}`
      assertEquals(createArray(5, transform), [
        'Item 0',
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ])
    },
  )

  await t.step(
    'should create an array of numbers using the default transform function',
    () => {
      assertEquals(createArray(5), [0, 1, 2, 3, 4])
    },
  )
})

Deno.test('range', async (t) => {
  await t.step(
    'should create an array of numbers progressing from start to end',
    () => {
      assertEquals(range(1, 5), [1, 2, 3, 4, 5])
    },
  )

  await t.step(
    'should create an array of numbers progressing from 0 to start if end is not provided',
    () => {
      assertEquals(range(4), [0, 1, 2, 3, 4])
    },
  )

  await t.step(
    'should create an array of numbers progressing from 0 to negative start if end is not provided',
    () => {
      assertEquals(range(-4), [-4, -3, -2, -1, 0])
    },
  )

  await t.step(
    'should create an array of numbers progressing from a negative value to another negative with negative step',
    () => {
      assertEquals(range(-4, -2, -2), [-4, -2])
    },
  )

  await t.step(
    'should create an array of numbers progressing from start to end with a specified step',
    () => {
      assertEquals(range(0, 20, 5), [0, 5, 10, 15, 20])
    },
  )

  await t.step(
    'should throw an error if the step is 0',
    () => {
      assertThrows(() => range(0, 2, 0), Error, 'step cannot be 0')
    },
  )
})
