import { objectKeys } from './object-keys.ts'
import { objectKeysFixture } from './object-keys.fixture.ts'

Deno.bench('objectKeys', () => {
  objectKeys(objectKeysFixture)
})
