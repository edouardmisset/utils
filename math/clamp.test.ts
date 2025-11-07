import { assertEquals } from '@std/assert'
import { clampValueInRange } from './clamp.ts'

const maximum = 10
const minimum = 0
const range = { maximum, minimum } as const
const valueInsideRange = { ...range, value: 5 } as const
const valueAboveRange = { ...range, value: 15 } as const
const valueBelowRange = { ...range, value: -5 } as const

Deno.test('clampValueInRange', async (t) => {
  await t.step('value above -> clamp to maximum', () => {
    assertEquals(clampValueInRange(valueAboveRange), maximum)
  })
  await t.step('value below -> clamp to minimum', () => {
    assertEquals(clampValueInRange(valueBelowRange), minimum)
  })
  await t.step('value inside -> unchanged', () => {
    assertEquals(clampValueInRange(valueInsideRange), 5)
  })
})
