import { datification } from './datification.ts'
import { datificationFixture } from './datification.fixture.ts'

Deno.bench('datification', () => {
  datification(datificationFixture)
})
