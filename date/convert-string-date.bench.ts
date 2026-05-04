import { convertStringDate } from './convert-string-date.ts'
import {
  convertStringDateFixture,
} from './convert-string-date.fixture.ts'

Deno.bench('convertStringDate', () => {
  convertStringDate(convertStringDateFixture)
})
