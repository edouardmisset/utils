import { isDateInRange } from './is-date-in-range.ts'
import {
  isDateInRangeFixtureDate,
  isDateInRangeFixtureEnd,
  isDateInRangeFixtureStart,
} from './is-date-in-range.fixture.ts'

Deno.bench('isDateInRange', () => {
  isDateInRange(isDateInRangeFixtureDate, {
    startDate: isDateInRangeFixtureStart,
    endDate: isDateInRangeFixtureEnd,
  })
})
