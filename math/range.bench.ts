import {
  isInRange,
  isInRangeInclusive,
  isStrictlyInRange,
  isStrictlyOutsideRange,
} from './range.ts'
import { rangeFixtureValueInside } from './range.fixture.ts'

Deno.bench('isInRange', () => {
  isInRange(rangeFixtureValueInside)
})

Deno.bench('isInRangeInclusive', () => {
  isInRangeInclusive(rangeFixtureValueInside)
})

Deno.bench('isStrictlyInRange', () => {
  isStrictlyInRange(rangeFixtureValueInside)
})

Deno.bench('isStrictlyOutsideRange', () => {
  isStrictlyOutsideRange(rangeFixtureValueInside)
})
