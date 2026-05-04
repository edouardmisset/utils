import { stringToBoolean } from './string-to-boolean.ts'
import { stringToBooleanFixture } from './string-to-boolean.fixture.ts'

Deno.bench('stringToBoolean', () => {
  stringToBoolean(stringToBooleanFixture)
})
