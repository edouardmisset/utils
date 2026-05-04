import { memoize } from './memoization.ts'
import { memoizationFixture } from './memoization.fixture.ts'

Deno.bench('memoize', () => {
  memoize(memoizationFixture)
})
