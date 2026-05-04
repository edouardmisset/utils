import { randomSort } from './random-sort.ts'
import { randomSortFixture } from './random-sort.fixture.ts'

Deno.bench('randomSort', () => {
  randomSort(randomSortFixture)
})
