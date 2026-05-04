import { levenshteinDistance } from './levenshtein-distance.ts'
import {
  levenshteinDistanceFixtureA,
  levenshteinDistanceFixtureB,
} from './levenshtein-distance.fixture.ts'

Deno.bench('levenshteinDistance', () => {
  levenshteinDistance(levenshteinDistanceFixtureA, levenshteinDistanceFixtureB)
})
