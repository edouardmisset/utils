import { frequency } from './frequency.ts'
import { frequencyFixture } from './frequency.fixture.ts'

Deno.bench('frequency', () => {
  frequency(frequencyFixture)
})
