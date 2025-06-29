import { assertEquals } from '@std/assert'
import { removeAccents } from './remove-accents.ts'

Deno.test('removeAccents', async (t) => {
  await t.step('should remove accents from string', () => {
    assertEquals(removeAccents('Héllo Wórld'), 'Hello World')
  })

  await t.step('should return the same string if there are no accents', () => {
    assertEquals(removeAccents('Hello World'), 'Hello World')
  })

  await t.step('should handle empty strings', () => {
    assertEquals(removeAccents(''), '')
  })

  // Unicode and international character tests
  await t.step('should handle various European accents', () => {
    // Note: æ and ø don't have combining diacritics, so they remain unchanged
    assertEquals(
      removeAccents('àáâãäåæçèéêëìíîïñòóôõöøùúûüý'),
      'aaaaaaæceeeeiiiinoooooøuuuuy',
    )
    assertEquals(
      removeAccents('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝ'),
      'AAAAAAÆCEEEEIIIINOOOOOØUUUUY',
    )
  })

  await t.step('should handle Eastern European characters', () => {
    // Note: đ (Croatian d with stroke) doesn't have a combining diacritic
    assertEquals(removeAccents('čšžđćňľťř'), 'cszđcnltr')
    assertEquals(removeAccents('ČŠŽĐĆŇĽŤŘ'), 'CSZĐCNLTR')
  })

  await t.step('should handle Scandinavian characters', () => {
    // Note: ø and æ are separate Unicode characters, not base + combining diacritic
    assertEquals(removeAccents('øåæö'), 'øaæo')
    assertEquals(removeAccents('ØÅÆÖ'), 'ØAÆO')
  })

  await t.step('should handle German umlauts', () => {
    assertEquals(removeAccents('äöüß'), 'aouß') // Note: ß doesn't have a combining diacritic
    assertEquals(removeAccents('ÄÖÜ'), 'AOU')
  })

  await t.step('should handle mixed text with accents', () => {
    assertEquals(removeAccents('Café résumé naïve'), 'Cafe resume naive')
    assertEquals(removeAccents('Björk & Åse'), 'Bjork & Ase')
  })

  await t.step('should preserve emojis and symbols', () => {
    assertEquals(removeAccents('Héllo 👋 Wörld! 🌍'), 'Hello 👋 World! 🌍')
    assertEquals(removeAccents('Café ☕ résumé 📄'), 'Cafe ☕ resume 📄')
  })

  await t.step('should handle numbers and special characters', () => {
    assertEquals(removeAccents('Téxt123!@#$%^&*()'), 'Text123!@#$%^&*()')
  })

  await t.step('should handle very long strings with accents', () => {
    const longString = 'café '.repeat(1000) + 'résumé'
    const expected = 'cafe '.repeat(1000) + 'resume'
    assertEquals(removeAccents(longString), expected)
  })

  await t.step('should handle strings with only whitespace and accents', () => {
    assertEquals(removeAccents('   é   '), '   e   ')
    assertEquals(removeAccents('\tá\n'), '\ta\n')
  })
})
