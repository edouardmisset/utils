import { lastDateOfMonth } from './last-date-of-month.ts'
import { lastDateOfMonthFixture } from './last-date-of-month.fixture.ts'

Deno.bench('lastDateOfMonth', () => {
  lastDateOfMonth(lastDateOfMonthFixture)
})
