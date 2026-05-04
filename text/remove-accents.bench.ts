import { removeAccents } from './remove-accents.ts'
import { removeAccentsFixture } from './remove-accents.fixture.ts'

Deno.bench('removeAccents', () => {
  removeAccents(removeAccentsFixture)
})
