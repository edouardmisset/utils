import { divmod } from './divmod.ts'
import {
  divmodFixtureDividend,
  divmodFixtureDivisor,
} from './divmod.fixture.ts'

Deno.bench('divmod', () => {
  divmod(divmodFixtureDividend, divmodFixtureDivisor)
})
