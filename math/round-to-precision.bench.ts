import { roundToPrecision } from './round-to-precision.ts'
import { roundToPrecisionFixture } from './round-to-precision.fixture.ts'

Deno.bench('roundToPrecision', () => {
  roundToPrecision(
    roundToPrecisionFixture.value,
    roundToPrecisionFixture.precision,
  )
})
