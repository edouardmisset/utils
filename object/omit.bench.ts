import { omit } from './omit.ts'
import { omitFixtureKeys, omitFixtureObject } from './omit.fixture.ts'

Deno.bench('omit', () => {
  omit(omitFixtureObject, omitFixtureKeys)
})
