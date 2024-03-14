import { assertEquals } from '@std/assert'
import { take, takeEnd, takeStart } from './get-n-first-or-last.ts'

Deno.test('takeEnd', async (t) => {
  await t.step('should return the last n elements from the array', () => {
    const result = takeEnd([1, 2, 3, 4, 5], 2)
    assertEquals(result, [4, 5])
  })

  await t.step('should return the last element if n is not provided', () => {
    const result = takeEnd([1, 2, 3, 4, 5])
    assertEquals(result, [5])
  })

  await t.step(
    'should return the last n elements even if n is negative',
    () => {
      const result = takeEnd([1, 2, 3, 4, 5], -2)
      assertEquals(result, [4, 5])
    },
  )
})

Deno.test('takeStart', async (t) => {
  await t.step('should return the first n elements from the array', () => {
    const result = takeStart([1, 2, 3, 4, 5], 2)
    assertEquals(result, [1, 2])
  })

  await t.step('should return the first element if n is not provided', () => {
    const result = takeStart([1, 2, 3, 4, 5])
    assertEquals(result, [1])
  })

  await t.step(
    'should return the first n elements even if n is negative',
    () => {
      const result = takeStart([1, 2, 3, 4, 5], -2)
      assertEquals(result, [1, 2])
    },
  )
})

Deno.test('take', async (t) => {
  await t.step('should return the first n elements if n is positive', () => {
    const result = take([1, 2, 3, 4, 5], 2)
    assertEquals(result, [1, 2])
  })

  await t.step('should return the last n elements if n is negative', () => {
    const result = take([1, 2, 3, 4, 5], -2)
    assertEquals(result, [4, 5])
  })

  await t.step('should return the first element if n is not provided', () => {
    const result = take([1, 2, 3, 4, 5])
    assertEquals(result, [1])
  })
})
