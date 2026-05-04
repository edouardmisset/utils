import { random, randomInt } from './random.ts'
import { randomFixtureMax, randomFixtureMin } from './random.fixture.ts'

Deno.bench('random', () => {
  random(randomFixtureMin, randomFixtureMax)
})

Deno.bench('randomInt', () => {
  randomInt(randomFixtureMin, randomFixtureMax)
})
