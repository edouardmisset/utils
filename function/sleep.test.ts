import { assert, assertEquals } from '@std/assert'
import { sleep } from './sleep.ts'

Deno.test('sleep', async (t) => {
  const start = Date.now()

  const sleepDurationInMs = 300
  await t.step('should pause execution for a specified time', async () => {
    const result = await sleep(sleepDurationInMs)
    const end = Date.now()

    assertEquals(result.error, undefined)
    assert(end - start >= sleepDurationInMs)
  })

  await t.step(
    'should return an error if the time is a negative number',
    async () => {
      const negativeSleepDurationInMs = -sleepDurationInMs
      const result = await sleep(negativeSleepDurationInMs)

      assertEquals(result.data, undefined)
      assertEquals(result.error instanceof RangeError, true)
      assertEquals(
        result.error?.message,
        `Invalid time value (${negativeSleepDurationInMs} ms). Time must be a positive number.`,
      )
    },
  )
})
