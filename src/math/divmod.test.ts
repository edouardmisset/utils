import { assertEquals, assertThrows } from 'asserts'
import { divmod } from './divmod.ts'

Deno.test('divmod function', async (t) => {
  await t.step('divmod with positive numbers', () => {
    assertEquals(divmod(10, 3), [3, 1])
    assertEquals(divmod(12, 3), [4, 0])
    assertEquals(divmod(15, 5), [3, 0])
  })

  await t.step('divmod with negative numbers', () => {
    assertEquals(divmod(-10, 3), [-3, -1])
    assertEquals(divmod(10, -3), [-3, -1])
    assertEquals(divmod(-10, -3), [3, 1])
    assertEquals(divmod(-10, 5), [-2, 0])
    assertEquals(divmod(1, -10), [0, -1])
  })

  await t.step('divmod with zero dividend', () => {
    assertEquals(divmod(0, 3), [0, 0])
  })

  await t.step('divmod with zero divisor', () => {
    assertThrows(
      () => divmod(2, 0),
      Error,
      'Cannot divide by zero (divisor: 0)',
    )
  })
})
