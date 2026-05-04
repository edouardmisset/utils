import { percent } from './percent.ts'
import { percentFixture } from './percent.fixture.ts'

Deno.bench('percent', () => {
  percent(percentFixture)
})
