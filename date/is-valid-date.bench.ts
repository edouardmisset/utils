import { isValidDate } from './is-valid-date.ts'
import { isValidDateFixture } from './is-valid-date.fixture.ts'

Deno.bench('isValidDate', () => {
  isValidDate(isValidDateFixture)
})
