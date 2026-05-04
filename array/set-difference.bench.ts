import { setDifference } from './set-difference.ts'
import {
  setDifferenceFixtureA,
  setDifferenceFixtureB,
} from './set-difference.fixture.ts'

Deno.bench('setDifference', () => {
  setDifference(setDifferenceFixtureA, setDifferenceFixtureB)
})
