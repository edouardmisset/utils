import { isDateInLast12Months } from './is-date-in-last-12-months.ts'
import {
  isDateInLast12MonthsFixture,
} from './is-date-in-last-12-months.fixture.ts'

Deno.bench('isDateInLast12Months', () => {
  isDateInLast12Months(isDateInLast12MonthsFixture)
})
