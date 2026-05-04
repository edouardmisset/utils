import { assertEquals } from '@std/assert'
import { clampValueInRange } from './clamp.ts'
import {
  clampFixture,
  clampFixtureMaximum,
  clampFixtureMinimum,
  clampFixtureValueAbove,
  clampFixtureValueBelow,
} from './clamp.fixture.ts'

Deno.test('clampValueInRange', async (t) => {
  await t.step('value above -> clamp to maximum', () => {
    assertEquals(clampValueInRange(clampFixtureValueAbove), clampFixtureMaximum)
  })
  await t.step('value below -> clamp to minimum', () => {
    assertEquals(clampValueInRange(clampFixtureValueBelow), clampFixtureMinimum)
  })
  await t.step('value inside -> unchanged', () => {
    assertEquals(clampValueInRange(clampFixture), 5)
  })
})
