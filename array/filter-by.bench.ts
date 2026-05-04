import { filterBy } from './filter-by.ts'
import { filterByFixture } from './filter-by.fixture.ts'

Deno.bench('filterBy', () => {
  filterBy({ array: filterByFixture, keyOrFunction: 'category', value: 'a' })
})
