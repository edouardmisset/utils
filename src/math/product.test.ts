import { assertEquals } from 'asserts'
import { product } from './product.ts'

Deno.test('product function', async (t) => {
  await t.step('product with multiple arguments', () => {
    assertEquals(product(1, 2, 3, 4), 24)
    assertEquals(product(5, 5, 5, 5), 625)
    assertEquals(product(0, 2, 3, 4), 0)
  })

  await t.step('product with single array argument', () => {
    assertEquals(product([1, 2, 3, 4]), 24)
    assertEquals(product([5, 5, 5, 5]), 625)
    assertEquals(product([0, 2, 3, 4]), 0)
  })

  await t.step('product with mixed array and number arguments', () => {
    assertEquals(product([1, 2], 3, 4), 24)
    assertEquals(product(5, [5, 5, 5]), 625)
    assertEquals(product([0, 2], 3, 4), 0)
  })
})
