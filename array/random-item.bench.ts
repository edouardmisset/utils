import { randomItem } from './random-item.ts'
import { randomItemFixture } from './random-item.fixture.ts'

Deno.bench('randomItem', () => {
  randomItem(randomItemFixture)
})
