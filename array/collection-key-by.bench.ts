import { collectionKeyBy } from './collection-key-by.ts'
import { collectionKeyByFixture } from './collection-key-by.fixture.ts'

Deno.bench('collectionKeyBy', () => {
  collectionKeyBy(collectionKeyByFixture, 'id')
})
