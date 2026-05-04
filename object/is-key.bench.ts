import { isKey } from './is-key.ts'
import { isKeyFixtureKey, isKeyFixtureObject } from './is-key.fixture.ts'

Deno.bench('isKey', () => {
  isKey(isKeyFixtureObject, isKeyFixtureKey)
})
