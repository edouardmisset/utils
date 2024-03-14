import { assertEquals } from '@std/assert'
import {
  clampValueInRange,
  isExclusiveInRange,
  isInclusiveInRange,
  isInRange,
  isOutsideRange,
} from './range.ts'

Deno.test('range functions', async (t) => {
  const maximum = 10
  const minimum = 0
  const range = { maximum, minimum }
  const valueInsideRange = { ...range, value: 5 }
  const valueAboveRange = { ...range, value: 15 }
  const valueBelowRange = { ...range, value: -5 }
  const valueEqualsHigherBound = { ...range, value: maximum }
  const valueEqualsLowerBound = { ...range, value: minimum }

  await t.step('clampValueInRange', () => {
    assertEquals(clampValueInRange(valueAboveRange), maximum)
    assertEquals(clampValueInRange(valueBelowRange), minimum)
    assertEquals(clampValueInRange(valueInsideRange), 5)
  })

  await t.step('isOutsideRange', () => {
    assertEquals(isOutsideRange(valueAboveRange), true)
    assertEquals(isOutsideRange(valueBelowRange), true)
    assertEquals(isOutsideRange(valueInsideRange), false)
  })

  await t.step('isInclusiveInRange', () => {
    assertEquals(
      isInclusiveInRange(valueEqualsHigherBound),
      true,
    )
    assertEquals(
      isInclusiveInRange(valueEqualsLowerBound),
      true,
    )
    assertEquals(
      isInclusiveInRange(valueInsideRange),
      true,
    )
  })

  await t.step('isExclusiveInRange', () => {
    assertEquals(
      isExclusiveInRange(valueEqualsHigherBound),
      false,
    )
    assertEquals(
      isExclusiveInRange(valueEqualsLowerBound),
      false,
    )
    assertEquals(
      isExclusiveInRange(valueInsideRange),
      true,
    )
  })

  await t.step('isInRange', () => {
    assertEquals(isInRange(valueEqualsHigherBound), true)
    assertEquals(isInRange(valueEqualsLowerBound), true)
    assertEquals(isInRange(valueInsideRange), true)
    assertEquals(
      isInRange({ ...valueEqualsHigherBound, inclusive: false }),
      false,
    )
    assertEquals(
      isInRange({ ...valueEqualsLowerBound, inclusive: false }),
      false,
    )
    assertEquals(
      isInRange({ ...valueInsideRange, inclusive: false }),
      true,
    )
  })
})
