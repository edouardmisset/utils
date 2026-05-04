import { isDateInYear } from './is-date-in-year.ts'
import {
  isDateInYearFixtureDate,
  isDateInYearFixtureYear,
} from './is-date-in-year.fixture.ts'

Deno.bench('isDateInYear', () => {
  isDateInYear(isDateInYearFixtureDate, isDateInYearFixtureYear)
})
