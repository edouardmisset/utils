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
})
