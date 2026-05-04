import { size } from './size.ts'
import { sizeFixtureObject } from './size.fixture.ts'

Deno.bench('size', () => {
  size(sizeFixtureObject)
})
