import { countBy } from './count-by.ts'
import { countByFixture } from './count-by.fixture.ts'

Deno.bench('countBy', () => {
  countBy(countByFixture, (n: number) => n % 2 === 0)
})
