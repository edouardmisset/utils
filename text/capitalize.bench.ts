import { capitalize } from './capitalize.ts'
import { capitalizeFixture } from './capitalize.fixture.ts'

Deno.bench('capitalize', () => {
  capitalize(capitalizeFixture)
})
