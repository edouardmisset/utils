import { assertEquals } from 'https://deno.land/std@0.218.2/assert/assert_equals.ts'

import { stringIncludesCaseInsensitive } from './string-includes.ts'

Deno.test('stringIncludesCaseInsensitive', async (t) => {
  await t.step(
    'should return true when the substring exists in the string (case insensitive)',
    () => {
      assertEquals(stringIncludesCaseInsensitive('Hello World', 'hello'), true)
    },
  )

  await t.step(
    'should return false when the substring does not exist in the string',
    () => {
      assertEquals(
        stringIncludesCaseInsensitive('Hello World', 'goodbye'),
        false,
      )
    },
  )

  await t.step(
    'should return true when the substring exists in the string (case sensitive)',
    () => {
      assertEquals(
        stringIncludesCaseInsensitive('Hello World', 'Hello', {
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
        stringIncludesCaseInsensitive('Hello World', 'hello', {
          caseSensitive: true,
        }),
        false,
      )
    },
  )
})
