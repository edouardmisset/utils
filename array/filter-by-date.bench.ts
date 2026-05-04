import { filterByDate } from './filter-by-date.ts'
import { filterByDateFixture } from './filter-by-date.fixture.ts'

Deno.bench('filterByDate', () => {
  filterByDate({
    array: filterByDateFixture,
    keyOrFunction: 'date',
    options: { year: 2021 },
  })
})
