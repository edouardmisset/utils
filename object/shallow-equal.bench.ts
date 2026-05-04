import { shallowEqual } from './shallow-equal.ts'
import {
  shallowEqualFixtureA,
  shallowEqualFixtureB,
} from './shallow-equal.fixture.ts'

Deno.bench('shallowEqual', () => {
  shallowEqual(shallowEqualFixtureA, shallowEqualFixtureB)
})
