import { sortByDate } from './sort-by-date.ts'
import {
  sortByDateFixtureA,
  sortByDateFixtureB,
} from './sort-by-date.fixture.ts'

Deno.bench('sortByDate', () => {
  sortByDate(sortByDateFixtureA, sortByDateFixtureB)
})
