import { assertEquals } from '@std/assert'
import { levenshteinDistance } from './levenshtein-distance.ts'

Deno.test('levenshteinDistance', async (t) => {
  await t.step('should handle empty strings', () => {
    assertEquals(levenshteinDistance('', ''), 0)
  })

  await t.step('should remove return 0 if the words are the same', () => {
    assertEquals(levenshteinDistance('Hello', 'Hello'), 0)
  })

  await t.step(
    'should remove return 1 if the there is a difference in (1) accent',
    () => {
      assertEquals(levenshteinDistance('cote', 'côte'), 1)
    },
  )

  await t.step(
    'should return the correct distance between two different words',
    () => {
      assertEquals(levenshteinDistance('hi', 'hey'), 2)
    },
  )

  await t.step(
    'should return the one if one of the word is capitalized and not the other',
    () => {
      assertEquals(levenshteinDistance('Hello', 'hello'), 1)
    },
  )

  await t.step(
    'should return the the length of the source if the target is empty',
    () => {
      assertEquals(levenshteinDistance('Hello', ''), 5)
    },
  )

  // Unicode and emoji tests
  await t.step('should handle emoji strings correctly', () => {
    assertEquals(levenshteinDistance('👋', '👋'), 0)
    // Note: Some emojis might be multi-code-unit sequences
    assertEquals(levenshteinDistance('👋🌍', '👋'), 2) // 🌍 2 units
    assertEquals(levenshteinDistance('🚀🌟', '⭐🌟'), 2)
  })

  await t.step('should handle accented characters', () => {
    assertEquals(levenshteinDistance('café', 'cafe'), 1)
    assertEquals(levenshteinDistance('résumé', 'resume'), 2)
    assertEquals(levenshteinDistance('naïve', 'naive'), 1)
  })

  await t.step('should handle non-Latin scripts', () => {
    assertEquals(levenshteinDistance('你好', '你好'), 0)
    assertEquals(levenshteinDistance('你好', '你'), 1)
    assertEquals(levenshteinDistance('привет', 'привет'), 0)
    assertEquals(levenshteinDistance('α', 'β'), 1)
  })

  await t.step('should handle mixed Unicode content', () => {
    // Note: Some emojis are multi-code-unit, affecting distance calculations
    assertEquals(levenshteinDistance('Hello 👋', 'Hello 🌍'), 2)
    assertEquals(levenshteinDistance('café ☕', 'cafe ☕'), 1)
  })

  await t.step('should handle very long strings efficiently', () => {
    const longString1 = 'a'.repeat(1000)
    const longString2 = 'b'.repeat(1000)
    const result = levenshteinDistance(longString1, longString2)
    assertEquals(result, 1000)
  })

  await t.step('should handle strings with only whitespace differences', () => {
    assertEquals(levenshteinDistance('hello world', 'hello  world'), 1)
    assertEquals(levenshteinDistance('hello\tworld', 'hello world'), 1)
    assertEquals(levenshteinDistance('hello\nworld', 'hello world'), 1)
  })

  await t.step('should handle complex substitutions', () => {
    assertEquals(levenshteinDistance('kitten', 'sitting'), 3)
    assertEquals(levenshteinDistance('saturday', 'sunday'), 3)
  })

  await t.step('should handle one string being a substring of another', () => {
    assertEquals(levenshteinDistance('test', 'testing'), 3)
    assertEquals(levenshteinDistance('testing', 'test'), 3)
  })

  await t.step('should handle special characters and punctuation', () => {
    assertEquals(levenshteinDistance('hello!', 'hello?'), 1)
    assertEquals(levenshteinDistance('test@example.com', 'test@example.org'), 3)
  })

  await t.step('should handle numeric strings', () => {
    assertEquals(levenshteinDistance('12345', '12346'), 1)
    assertEquals(levenshteinDistance('version1.2.3', 'version1.2.4'), 1)
  })
})
