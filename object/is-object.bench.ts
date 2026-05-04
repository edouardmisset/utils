import { isObject } from './is-object.ts'
import { isObjectFixture } from './is-object.fixture.ts'

Deno.bench('isObject', () => {
  isObject(isObjectFixture)
})
