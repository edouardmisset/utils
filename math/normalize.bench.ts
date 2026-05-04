import { normalize } from './normalize.ts'
import { normalizeFixture } from './normalize.fixture.ts'

Deno.bench('normalize', () => {
  normalize(normalizeFixture)
})
