import { stringToBoolean } from './string-to-boolean.ts'
import { assertEquals } from 'asserts'

Deno.test('stringToBoolean', async (t) => {
  await t.step(
    'should return true for "true" regardless of case and whitespace',
    () => {
      assertEquals(stringToBoolean('true'), true)
      assertEquals(stringToBoolean('True'), true)
      assertEquals(stringToBoolean(' TRUE '), true)
    },
  )

  await t.step(
    "should return false for 'false' regardless of case and whitespace",
    () => {
      assertEquals(stringToBoolean('false'), false)
      assertEquals(stringToBoolean('False'), false)
      assertEquals(stringToBoolean(' FALSE '), false)
    },
  )

  await t.step(
    "should return true for 'yes' when 'yes' is in truthyValues",
    () => {
      assertEquals(stringToBoolean('yes', ['yes', 'y', 'true']), true)
    },
  )

  await t.step(
    "should return false for 'no' when 'yes' is in truthyValues",
    () => {
      assertEquals(stringToBoolean('no', ['yes', 'y', 'true']), false)
    },
  )
})
