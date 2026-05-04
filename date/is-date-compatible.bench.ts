import { isDateCompatible } from './is-date-compatible.ts'
import { isDateCompatibleFixture } from './is-date-compatible.fixture.ts'

Deno.bench('isDateCompatible', () => {
  isDateCompatible(isDateCompatibleFixture)
})
