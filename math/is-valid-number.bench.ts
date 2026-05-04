import { isValidNumber } from './is-valid-number.ts'
import { isValidNumberFixture } from './is-valid-number.fixture.ts'

Deno.bench('isValidNumber', () => {
  isValidNumber(isValidNumberFixture)
})
