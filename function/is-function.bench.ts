import { isFunction } from './is-function.ts'
import { isFunctionFixture } from './is-function.fixture.ts'

Deno.bench('isFunction', () => {
  isFunction(isFunctionFixture)
})
