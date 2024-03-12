import { assert } from '@std/assert'
import { stringEquals, stringEqualsCaseInsensitive } from './string-equals.ts'

Deno.test('stringEqualsCaseInsensitive', async (t) => {
  await t.step(
    'should return true for equal strings regardless of case',
    () => {
      assert(
        stringEqualsCaseInsensitive('Hello World', 'hello world'),
      )
    },
  )

  await t.step('should return false for unequal strings', () => {
    assert(
      !stringEqualsCaseInsensitive('Hello World', 'Goodbye World'),
    )
  })

  await t.step(
    'should return true for equal strings with different case',
    () => {
      assert(
        stringEqualsCaseInsensitive('Hello World', 'HELLO WORLD'),
      )
    },
  )

  await t.step(
    'should return false for unequal strings with different case',
    () => {
      assert(
        !stringEqualsCaseInsensitive('Hello World', 'GOODBYE WORLD'),
      )
    },
  )
})

Deno.test('stringEquals tests', async (t) => {
  await t.step('Happy path - case insensitive', () => {
    assert(stringEquals('Hello', 'hello'))
  })

  await t.step('Happy path - case sensitive', () => {
    assert(stringEquals('Hello', 'Hello', { caseSensitive: true }))
  })

  await t.step('Unhappy path - case sensitive', () => {
    assert(!stringEquals('Hello', 'hello', { caseSensitive: true }))
  })

  await t.step('Edge case - empty strings', () => {
    assert(stringEquals('', ''))
  })
})
