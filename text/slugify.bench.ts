import { slugify } from './slugify.ts'
import { slugifyFixture } from './slugify.fixture.ts'

Deno.bench('slugify', () => {
  slugify(slugifyFixture)
})
