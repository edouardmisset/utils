import { deepEqual } from './equals.ts'
import { equalsFixtureA, equalsFixtureB } from './equals.fixture.ts'

Deno.bench('deepEqual', () => {
  deepEqual(equalsFixtureA, equalsFixtureB)
})
