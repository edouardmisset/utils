import { assertEquals } from '@std/assert'

import { stringIncludes } from './string-includes.ts'

Deno.test('stringIncludes', async (t) => {
  await t.step(
    'should return true when the substring exists in the string (case insensitive)',
    () => {
      assertEquals(stringIncludes('Hello World', 'hello'), true)
    },
  )

  await t.step(
    'should return false when the substring does not exist in the string',
    () => {
      assertEquals(
        stringIncludes('Hello World', 'goodbye'),
        false,
      )
    },
  )

  await t.step(
    'should return true when the substring exists in the string (case sensitive)',
    () => {
      assertEquals(
        stringIncludes('Hello World', 'Hello', {
          caseSensitive: true,
        }),
        true,
      )
    },
  )

  await t.step(
    'should return false when the substring exists in the string but with different case (case sensitive)',
    () => {
      assertEquals(
        stringIncludes('Hello World', 'hello', {
          caseSensitive: true,
        }),
        false,
      )
    },
  )
})
