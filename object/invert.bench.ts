import { invert } from './invert.ts'
import { invertFixture } from './invert.fixture.ts'

Deno.bench('invert', () => {
  invert(invertFixture)
})
