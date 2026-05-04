import { maxBy } from './max-by.ts'
import { maxByFixture } from './max-by.fixture.ts'

Deno.bench('maxBy', () => {
  maxBy(maxByFixture, 'value')
})
