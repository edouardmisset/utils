import { pick } from './pick.ts'
import { pickFixtureKeys, pickFixtureObject } from './pick.fixture.ts'

Deno.bench('pick', () => {
  pick(pickFixtureObject, pickFixtureKeys)
})
