import { symmetricDifference } from './symmetric-difference.ts'
import {
  symmetricDifferenceFixtureA,
  symmetricDifferenceFixtureB,
} from './symmetric-difference.fixture.ts'

Deno.bench('symmetricDifference', () => {
  symmetricDifference(symmetricDifferenceFixtureA, symmetricDifferenceFixtureB)
})
