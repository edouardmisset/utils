import { average } from './average.ts'
import { averageFixture } from './average.fixture.ts'

Deno.bench('average', () => {
  average(averageFixture)
})
