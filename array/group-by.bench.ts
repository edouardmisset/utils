import { groupBy } from './group-by.ts'
import { groupByFixture } from './group-by.fixture.ts'

Deno.bench('groupBy', () => {
  groupBy(groupByFixture, 'id')
})
