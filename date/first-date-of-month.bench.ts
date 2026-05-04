import { firstDateOfMonth } from './first-date-of-month.ts'
import { firstDateOfMonthFixture } from './first-date-of-month.fixture.ts'

Deno.bench('firstDateOfMonth', () => {
  firstDateOfMonth(firstDateOfMonthFixture)
})
