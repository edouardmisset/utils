import { assertEquals } from '@std/assert'
import { countBy } from './count-by.ts'
import { countByFixture } from './count-by.fixture.ts'

Deno.test('countBy', async (t) => {
  const isEven = (number_: number): boolean => number_ % 2 === 0

  await t.step(
    'should count the number of elements that satisfy a condition',
    () => {
      assertEquals(countBy(countByFixture, isEven), 2)
    },
  )

  await t.step('should return 0 for an empty array', () => {
    const array: number[] = []
    assertEquals(countBy(array, isEven), 0)
  })
})
