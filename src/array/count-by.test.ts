import { assertEquals } from 'asserts'
import { countBy, frequency } from './count-by.ts'

Deno.test("countBy", async t => {
  const isEven = (num: number) => num % 2 === 0

  await t.step('should count the number of elements that satisfy a condition', () => {
    const arr = [1, 2, 3, 4, 5]
    assertEquals(countBy(arr, isEven), 2)
  })

  await t.step('should return 0 for an empty array', () => {
    const arr: number[] = []
    assertEquals(countBy(arr, isEven), 0)
  })
})

Deno.test("frequency", async t => {
  await t.step('should calculate the frequency of each unique element in an array', () => {
    const arr = ['apple', 'banana', 'apple', 'cherry']
    assertEquals(frequency(arr), { 'apple': 2, 'banana': 1, 'cherry': 1 })
  })

  await t.step('should return an empty object for an empty array', () => {
    const arr: string[] = []
    assertEquals(frequency(arr), {})
  })
})