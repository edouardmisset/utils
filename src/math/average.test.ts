import { assertEquals, assertThrows } from '@std/assert'
import { average } from './average.ts'

Deno.test('average function', async (t) => {
  await t.step('with multiple arguments', () => {
    assertEquals(average(1, 2, 3, 4, 5), 3)
    assertEquals(average(2, 4, 6, 8, 10), 6)
    assertEquals(average(0, 0, 0, 0, 0), 0)
  })

  await t.step('with single array argument', () => {
    assertEquals(average([1, 2, 3, 4, 5]), 3)
    assertEquals(average([2, 4, 6, 8, 10]), 6)
    assertEquals(average([0, 0, 0, 0, 0]), 0)
  })

  await t.step('with no arguments', () => {
    assertThrows(() => average())
  })
})
