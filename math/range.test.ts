import { assertEquals } from '@std/assert'
import {
  isInRange,
  isInRangeInclusive,
  isStrictlyInRange,
  isStrictlyOutsideRange,
} from './range.ts'
import {
  rangeFixtureValueAbove,
  rangeFixtureValueBelow,
  rangeFixtureValueEqualsHigherBound,
  rangeFixtureValueEqualsLowerBound,
  rangeFixtureValueInside,
} from './range.fixture.ts'

Deno.test('isOutsideRange', async (t) => {
  await t.step('value above is outside', () => {
    assertEquals(isStrictlyOutsideRange(rangeFixtureValueAbove), true)
  })
  await t.step('value below is outside', () => {
    assertEquals(isStrictlyOutsideRange(rangeFixtureValueBelow), true)
  })
  await t.step('value inside is not outside', () => {
    assertEquals(isStrictlyOutsideRange(rangeFixtureValueInside), false)
  })
})

Deno.test('isInRangeInclusive', async (t) => {
  await t.step('value equal to upper bound is inclusive', () => {
    assertEquals(isInRangeInclusive(rangeFixtureValueEqualsHigherBound), true)
  })
  await t.step('value equal to lower bound is inclusive', () => {
    assertEquals(isInRangeInclusive(rangeFixtureValueEqualsLowerBound), true)
  })
  await t.step('value inside is inclusive', () => {
    assertEquals(isInRangeInclusive(rangeFixtureValueInside), true)
  })
})

Deno.test('isStrictlyInRange', async (t) => {
  await t.step('value equal to upper bound is not strictly inside', () => {
    assertEquals(isStrictlyInRange(rangeFixtureValueEqualsHigherBound), false)
  })
  await t.step('value equal to lower bound is not strictly inside', () => {
    assertEquals(isStrictlyInRange(rangeFixtureValueEqualsLowerBound), false)
  })
  await t.step('value inside is strictly inside', () => {
    assertEquals(isStrictlyInRange(rangeFixtureValueInside), true)
  })
})

Deno.test('isInRange (parametrized inclusive flag)', async (t) => {
  await t.step('value equal to upper bound default inclusive', () => {
    assertEquals(isInRange(rangeFixtureValueEqualsHigherBound), true)
  })
  await t.step('value equal to lower bound default inclusive', () => {
    assertEquals(isInRange(rangeFixtureValueEqualsLowerBound), true)
  })
  await t.step('value inside default inclusive', () => {
    assertEquals(isInRange(rangeFixtureValueInside), true)
  })
  await t.step(
    'value equal to upper bound with inclusive=false is outside',
    () => {
      assertEquals(
        isInRange({ ...rangeFixtureValueEqualsHigherBound, inclusive: false }),
        false,
      )
    },
  )
  await t.step(
    'value equal to lower bound with inclusive=false is outside',
    () => {
      assertEquals(
        isInRange({ ...rangeFixtureValueEqualsLowerBound, inclusive: false }),
        false,
      )
    },
  )
  await t.step('value inside with inclusive=false is inside', () => {
    assertEquals(
      isInRange({ ...rangeFixtureValueInside, inclusive: false }),
      true,
    )
  })
})
