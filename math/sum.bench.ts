import { sum } from './sum.ts'
import { sumFixture } from './sum.fixture.ts'

Deno.bench('sum', () => {
  sum(sumFixture)
})
