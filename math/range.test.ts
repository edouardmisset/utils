import { assertEquals } from '@std/assert'
import {
  isInRange,
  isInRangeInclusive,
  isStrictlyInRange,
  isStrictlyOutsideRange,
} from './range.ts'

const maximum = 10
const minimum = 0
const range = { maximum, minimum }
const valueInsideRange = { ...range, value: 5 }
const valueAboveRange = { ...range, value: 15 }
const valueBelowRange = { ...range, value: -5 }
const valueEqualsHigherBound = { ...range, value: maximum }
const valueEqualsLowerBound = { ...range, value: minimum }

Deno.test('isOutsideRange', async (t) => {
  await t.step('value above is outside', () => {
    assertEquals(isStrictlyOutsideRange(valueAboveRange), true)
  })
  await t.step('value below is outside', () => {
    assertEquals(isStrictlyOutsideRange(valueBelowRange), true)
  })
  await t.step('value inside is not outside', () => {
    assertEquals(isStrictlyOutsideRange(valueInsideRange), false)
  })
})

Deno.test('isInRangeInclusive', async (t) => {
  await t.step('value equal to upper bound is inclusive', () => {
    assertEquals(isInRangeInclusive(valueEqualsHigherBound), true)
  })
  await t.step('value equal to lower bound is inclusive', () => {
    assertEquals(isInRangeInclusive(valueEqualsLowerBound), true)
  })
  await t.step('value inside is inclusive', () => {
    assertEquals(isInRangeInclusive(valueInsideRange), true)
  })
})

Deno.test('isStrictlyInRange', async (t) => {
  await t.step('value equal to upper bound is not strictly inside', () => {
    assertEquals(isStrictlyInRange(valueEqualsHigherBound), false)
  })
  await t.step('value equal to lower bound is not strictly inside', () => {
    assertEquals(isStrictlyInRange(valueEqualsLowerBound), false)
  })
  await t.step('value inside is strictly inside', () => {
    assertEquals(isStrictlyInRange(valueInsideRange), true)
  })
})

Deno.test('isInRange (parametrized inclusive flag)', async (t) => {
  await t.step('value equal to upper bound default inclusive', () => {
    assertEquals(isInRange(valueEqualsHigherBound), true)
  })
  await t.step('value equal to lower bound default inclusive', () => {
    assertEquals(isInRange(valueEqualsLowerBound), true)
  })
  await t.step('value inside default inclusive', () => {
    assertEquals(isInRange(valueInsideRange), true)
  })
  await t.step(
    'value equal to upper bound with inclusive=false is outside',
    () => {
      assertEquals(
        isInRange({ ...valueEqualsHigherBound, inclusive: false }),
        false,
      )
    },
  )
  await t.step(
    'value equal to lower bound with inclusive=false is outside',
    () => {
      assertEquals(
        isInRange({ ...valueEqualsLowerBound, inclusive: false }),
        false,
      )
    },
  )
  await t.step('value inside with inclusive=false is inside', () => {
    assertEquals(
      isInRange({ ...valueInsideRange, inclusive: false }),
      true,
    )
  })
})
