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
})
