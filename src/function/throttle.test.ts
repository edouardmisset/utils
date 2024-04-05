import { assertEquals } from '@std/assert'
import { sleep } from './sleep.ts'
import { throttle } from './throttle.ts'

Deno.test('throttle', async (t) => {
  await t.step(
    'should call the callback immediately on the first call',
    () => {
      let count = 0
      const increment = throttle({ callback: () => count++, delay: 100 })

      increment()

      assertEquals(count, 1)
    },
  )

  await t.step(
    'should not call the callback if called again within the delay',
    () => {
      let count = 0
      const increment = throttle({ callback: () => count++, delay: 100 })

      increment()
      increment()

      assertEquals(count, 1)
    },
  )

  await t.step(
    'should call the callback again after the delay',
    async () => {
      let count = 0
      const increment = throttle({ callback: () => count++, delay: 100 })

      increment()

      await sleep(150)

      increment()

      assertEquals(count, 2)
    },
  )
})