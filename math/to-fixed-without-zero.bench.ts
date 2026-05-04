import { toFixedWithoutZeros } from './to-fixed-without-zero.ts'
import { toFixedWithoutZerosFixture } from './to-fixed-without-zero.fixture.ts'

Deno.bench('toFixedWithoutZeros', () => {
  toFixedWithoutZeros(
    toFixedWithoutZerosFixture.value,
    toFixedWithoutZerosFixture.precision,
  )
})
