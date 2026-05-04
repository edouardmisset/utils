import { sortBy } from './sort-by.ts'
import { sortByFixture } from './sort-by.fixture.ts'

Deno.bench('sortBy', () => {
  sortBy(sortByFixture, 'value')
})
