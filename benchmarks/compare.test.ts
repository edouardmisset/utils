import { assertEquals, assertThrows } from '@std/assert'
import { compareMeasurements, median } from './compare.ts'

Deno.test('median handles odd and even samples', () => {
  assertEquals(median([3, 1, 2]), 2)
  assertEquals(median([4, 1, 3, 2]), 2.5)
})

Deno.test('comparison accepts improvements and regressions within threshold', () => {
  const comparisons = compareMeasurements(
    new Map([['faster', [100, 110, 90]], ['within threshold', [
      100,
      100,
      100,
    ]]]),
    new Map([['faster', [80, 90, 85]], ['within threshold', [110, 110, 110]]]),
    0.1,
  )

  assertEquals(comparisons.map(({ passed }) => passed), [true, true])
})

Deno.test('comparison rejects regressions above threshold', () => {
  const [comparison] = compareMeasurements(
    new Map([['regression', [100, 100, 100]]]),
    new Map([['regression', [111, 112, 113]]]),
    0.1,
  )

  assertEquals(comparison.passed, false)
})

Deno.test('comparison requires matching benchmark names', () => {
  assertThrows(
    () =>
      compareMeasurements(
        new Map([['baseline only', [100]]]),
        new Map([['candidate only', [100]]]),
        0.1,
      ),
    Error,
    'do not match',
  )
})
