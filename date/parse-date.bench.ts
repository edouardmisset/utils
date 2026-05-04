import { parseDate } from './parse-date.ts'
import { parseDateFixture } from './parse-date.fixture.ts'

Deno.bench('parseDate', () => {
  parseDate(parseDateFixture)
})
