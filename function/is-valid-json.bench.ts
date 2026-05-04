import { isValidJSON } from './is-valid-json.ts'
import { isValidJsonFixture } from './is-valid-json.fixture.ts'

Deno.bench('isValidJSON', () => {
  isValidJSON(isValidJsonFixture)
})
