import { scale } from './scale.ts'
import { scaleFixture } from './scale.fixture.ts'

Deno.bench('scale', () => {
  scale(scaleFixture)
})
