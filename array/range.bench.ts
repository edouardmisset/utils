import { range } from './range.ts'
import { rangeFixtureEnd, rangeFixtureStart } from './range.fixture.ts'

Deno.bench('range', () => {
  range(rangeFixtureStart, rangeFixtureEnd)
})
