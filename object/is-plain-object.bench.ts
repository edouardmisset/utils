import { isPlainObject } from './is-plain-object.ts'
import { isPlainObjectFixture } from './is-plain-object.fixture.ts'

Deno.bench('isPlainObject', () => {
  isPlainObject(isPlainObjectFixture)
})
