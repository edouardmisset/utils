import { take } from './take.ts'
import { takeFixture } from './take.fixture.ts'

Deno.bench('take', () => {
  take(takeFixture, 2)
})
