import { minBy } from './min-by.ts'
import { minByFixture } from './min-by.fixture.ts'

Deno.bench('minBy', () => {
  minBy(minByFixture, 'value')
})
