import { removeNullishObjectValues } from './remove-nullish-values.ts'
import {
  removeNullishValuesFixture,
} from './remove-nullish-values.fixture.ts'

Deno.bench('removeNullishObjectValues', () => {
  removeNullishObjectValues(removeNullishValuesFixture)
})
