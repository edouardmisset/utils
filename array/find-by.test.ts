import { assertEquals } from '@std/assert'
import { findBy } from './find-by.ts'

Deno.test('findBy', async (t) => {
  const array = [
    { id: 1, name: 'First' },
    { id: 2, name: 'Second' },
    { id: 3, name: 'Third' },
  ]

  await t.step('find by key/value (existing)', () => {
    const result = findBy({ array, keyOrFunction: 'id', value: 1 })
    assertEquals(result, { id: 1, name: 'First' })
  })

  await t.step('find by another key/value (existing)', () => {
    const result = findBy({
      array,
      keyOrFunction: 'name',
      value: 'Second',
    })
    assertEquals(result, { id: 2, name: 'Second' })
  })

  await t.step('returns undefined when key exists but value not found', () => {
    const result = findBy({
      array,
      keyOrFunction: 'id',
      value: 99,
    })
    assertEquals(result, undefined)
  })

  await t.step('find using a predicate function (name)', () => {
    const result = findBy({
      array,
      keyOrFunction: (o) => o.name,
      value: 'Second',
    })
    assertEquals(result, { id: 2, name: 'Second' })

    const objects = [
      { id: 1, name: 'First' },
      { id: 2, name: 'Second' },
      { id: 3, name: 'Third' },
    ]

    const result2 = findBy({ array: objects, keyOrFunction: 'id', value: 1 })

    assertEquals(result2, { id: 1, name: 'First' })
  })

  await t.step('predicate function returns undefined when no match', () => {
    const result = findBy({
      array,
      keyOrFunction: (o) => o.name,
      value: 'Z',
    })
    assertEquals(result, undefined)
  })
})
