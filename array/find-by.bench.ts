import { findBy } from './find-by.ts'
import { findByFixture } from './find-by.fixture.ts'

Deno.bench('findBy', () => {
  findBy({ array: findByFixture, keyOrFunction: 'id', value: 1 })
})
