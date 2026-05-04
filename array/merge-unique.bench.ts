import { mergeUnique } from './merge-unique.ts'
import {
  mergeUniqueFixtureA,
  mergeUniqueFixtureB,
} from './merge-unique.fixture.ts'

Deno.bench('mergeUnique', () => {
  mergeUnique(mergeUniqueFixtureA, mergeUniqueFixtureB)
})
