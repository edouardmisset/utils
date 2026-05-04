import { stringifyDate } from './stringify-date.ts'
import { stringifyDateFixture } from './stringify-date.fixture.ts'

Deno.bench('stringifyDate', () => {
  stringifyDate(stringifyDateFixture)
})
