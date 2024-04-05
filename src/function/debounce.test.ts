import { assertEquals } from '@std/assert'
import { debounce } from './debounce.ts'
import { sleep } from './sleep.ts'

Deno.test('debounce', async (t) => {
  await t.step(
    'should call the callback only once if the debounced function is called multiple times quickly',
    async () => {
      let count = 0
      const increment = debounce({ callback: () => count++, delay: 100 })

      increment()
      increment()
      increment()

      await sleep(150)

      assertEquals(count, 1)
    },
  )

  await t.step(
    'should call the callback multiple times if the debounced function is called with enough delay between calls',
    async () => {
      let count = 0
      const increment = debounce({ callback: () => count++, delay: 100 })

      increment()

      await sleep(150)

      increment()

      await sleep(150)

      assertEquals(count, 2)
    },
  )
})
