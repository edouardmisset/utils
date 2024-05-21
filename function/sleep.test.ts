import { assert, assertThrows } from '@std/assert'
import { sleep } from './sleep.ts'

Deno.test('sleep', async (t) => {
  const start = Date.now()

  const sleepDurationInMs = 300
  await t.step('should pause execution for a specified time', async () => {
    await sleep(sleepDurationInMs)
    const end = Date.now()
    assert(end - start >= sleepDurationInMs)
  })

  await t.step('should throw an error if the time is a negative number', () => {
    const negativeSleepDurationInMs = -sleepDurationInMs
    assertThrows(
      () => {
        void sleep(negativeSleepDurationInMs)
      },
      Error,
      `Invalid time value (${negativeSleepDurationInMs} ms). Time must be a positive number.`,
    )
  })
})
