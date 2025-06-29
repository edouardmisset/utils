import { assertEquals } from '@std/assert'
import { capitalize } from './capitalize.ts'

Deno.test('capitalize', async (t) => {
  await t.step(
    'should capitalize the first letter and make the rest lowercase',
    () => {
      assertEquals(capitalize('hello'), 'Hello')
      assertEquals(capitalize('WORLD'), 'World')
    },
  )

  await t.step('should handle single character strings', () => {
    assertEquals(capitalize('h'), 'H')
    assertEquals(capitalize('W'), 'W')
  })

  await t.step('should handle empty strings', () => {
    assertEquals(capitalize(''), '')
  })

  // Unicode and international character tests
  await t.step('should handle accented characters correctly', () => {
    assertEquals(capitalize('éléphant'), 'Éléphant')
    assertEquals(capitalize('àVOIR'), 'Àvoir')
    assertEquals(capitalize('çà'), 'Çà')
  })

  await t.step('should handle non-Latin scripts', () => {
    assertEquals(capitalize('αβγ'), 'Αβγ') // Greek
    assertEquals(capitalize('привет'), 'Привет') // Cyrillic
  })

  await t.step('should handle strings starting with numbers', () => {
    assertEquals(capitalize('123hello'), '123hello')
    assertEquals(capitalize('9world'), '9world')
  })

  await t.step('should handle strings starting with special characters', () => {
    assertEquals(capitalize('!hello'), '!hello')
    assertEquals(capitalize('@world'), '@world')
    assertEquals(capitalize('#test'), '#test')
  })

  await t.step('should handle strings with emojis', () => {
    assertEquals(capitalize('🌍hello'), '🌍hello')
    assertEquals(capitalize('hello 🌍 world'), 'Hello 🌍 world')
  })

  await t.step('should handle whitespace-only strings', () => {
    assertEquals(capitalize(' '), ' ')
    assertEquals(capitalize('\t'), '\t')
    assertEquals(capitalize('\n'), '\n')
  })

  await t.step('should handle mixed case with multiple words', () => {
    assertEquals(capitalize('hello WORLD test'), 'Hello world test')
    assertEquals(capitalize('MiXeD CaSe'), 'Mixed case')
  })

  await t.step('should handle very long strings efficiently', () => {
    const longString = `a${'b'.repeat(10000)}`
    const result = capitalize(longString)
    assertEquals(result[0], 'A')
    assertEquals(result.slice(1), 'b'.repeat(10000))
  })

  await t.step('should handle Turkish locale edge cases', () => {
    // Note: capitalize uses toLocaleUpperCase which might not handle Turkish i->İ conversion without specific locale
    assertEquals(capitalize('istanbul'), 'Istanbul')
    assertEquals(capitalize('İSTANBUL'), 'İstanbul')
  })

  await t.step('should handle German ß character', () => {
    assertEquals(capitalize('straße'), 'Straße')
    // Note: ß converts to SS when uppercased in German
    assertEquals(capitalize('ßeta'), 'SSeta')
  })
})
