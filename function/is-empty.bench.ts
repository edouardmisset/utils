import { isEmpty } from './is-empty.ts'
import { isEmptyFixture } from './is-empty.fixture.ts'

Deno.bench('isEmpty', () => {
  isEmpty(isEmptyFixture)
})
