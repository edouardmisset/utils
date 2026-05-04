import { standardDeviation } from './standard-deviation.ts'
import { standardDeviationFixture } from './standard-deviation.fixture.ts'

Deno.bench('standardDeviation', () => {
  standardDeviation(standardDeviationFixture)
})
