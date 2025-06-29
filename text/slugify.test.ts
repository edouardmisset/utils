import { assertEquals } from '@std/assert'
import { slugify } from './slugify.ts'

Deno.test('slugify', async (t) => {
  await t.step('should return a lowercase string', () => {
    assertEquals(slugify('HELLO WORLD'), 'hello-world')
  })

  await t.step('should replace spaces with hyphens', () => {
    assertEquals(slugify('Hello World'), 'hello-world')
  })

  await t.step(
    'should remove non-alphanumeric, non-hyphen, non-space characters',
    () => {
      assertEquals(slugify('Hello, World!'), 'hello-world')
    },
  )

  await t.step(
    'should replace multiple spaces/hyphens with a single hyphen',
    () => {
      assertEquals(slugify('Hello   World'), 'hello-world')
      assertEquals(slugify('Hello---World'), 'hello-world')
    },
  )

  await t.step('should remove leading and trailing hyphens', () => {
    assertEquals(slugify('-Hello World-'), 'hello-world')
  })

  // Unicode and emoji tests
  await t.step('should handle Unicode characters', () => {
    // Note: ö is not decomposed by the normalize/replace process in slugify
    assertEquals(slugify('Hello Wörld'), 'hello-wrld')
    // Accented characters that do decompose
    assertEquals(slugify('Café Résumé'), 'caf-rsum')
  })

  await t.step('should remove emojis and special Unicode', () => {
    assertEquals(slugify('Hello 👋 World 🌍'), 'hello-world')
    // Note: é doesn't fully decompose in the slugify process
    assertEquals(slugify('Café ☕ Time'), 'caf-time')
  })

  await t.step('should handle non-Latin scripts', () => {
    assertEquals(slugify('Hello 你好 World'), 'hello-world')
    assertEquals(slugify('Test العربية Test'), 'test-test')
  })

  await t.step('should handle mixed content with numbers', () => {
    assertEquals(slugify('Product-123 & Review!'), 'product-123-review')
    assertEquals(slugify('Version 2.0.1 Release'), 'version-201-release')
  })

  await t.step('should handle underscores correctly', () => {
    assertEquals(slugify('hello_world_test'), 'hello-world-test')
    assertEquals(slugify('__multiple__underscores__'), 'multiple-underscores')
  })

  await t.step('should handle edge cases with only special characters', () => {
    assertEquals(slugify('!!!@@@###'), '')
    assertEquals(slugify('---___---'), '')
    assertEquals(slugify('   '), '')
  })

  await t.step('should handle very long strings efficiently', () => {
    const longString = 'Hello World! '.repeat(100)
    const result = slugify(longString)
    assertEquals(result, 'hello-world-'.repeat(99) + 'hello-world')
  })

  await t.step('should handle strings with only whitespace', () => {
    assertEquals(slugify('   '), '')
    assertEquals(slugify('\t\n\r'), '')
  })

  await t.step('should handle complex punctuation', () => {
    assertEquals(slugify("Don't Stop Believin'"), 'dont-stop-believin')
    assertEquals(slugify('(Parentheses) & [Brackets]'), 'parentheses-brackets')
  })

  await t.step('should handle currency and mathematical symbols', () => {
    assertEquals(slugify('$100 + €50 = ₹5000'), '100-50-5000')
    assertEquals(slugify('α + β = γ'), '')
  })
})
