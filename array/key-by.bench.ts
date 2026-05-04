import { keyBy } from './key-by.ts'
import { keyByFixture } from './key-by.fixture.ts'

Deno.bench('keyBy', () => {
  keyBy(keyByFixture, 'id')
})
