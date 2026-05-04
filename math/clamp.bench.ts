import { clampValueInRange } from './clamp.ts'
import { clampFixture } from './clamp.fixture.ts'

Deno.bench('clampValueInRange', () => {
  clampValueInRange(clampFixture)
})
