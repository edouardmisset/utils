import { selectBy } from './select-by.ts'
import { selectByFixture } from './select-by.fixture.ts'

Deno.bench('selectBy', () => {
  selectBy(selectByFixture, 'name')
})
