import { assert, assertEquals } from '@std/assert'
import { FakeTime } from '@std/testing/time'
import { timeIt, type TimeResult } from './time-it.ts'

Deno.test('timeIt', async (t) => {
  await t.step('synchronous success', async () => {
    const time = new FakeTime()
    try {
      const result = await timeIt(() => {
        // Simulate 50ms of work
        time.tick(50)
        return 123
      })

      assertEquals(result.error, undefined)
      assertEquals(result.data, 123)
      assertEquals(result.duration, 50)
    } finally {
      time.restore()
    }
  })

  await t.step('synchronous error', async () => {
    const time = new FakeTime()
    try {
      const result = await timeIt(() => {
        // Simulate 20ms before throwing
        time.tick(20)
        throw new Error('boom')
      }) as TimeResult<unknown>

      assertEquals(result.data, undefined)
      assertEquals(result.error instanceof Error, true)
      assertEquals((result.error as Error).message, 'boom')
      assertEquals(result.duration, 20)
    } finally {
      time.restore()
    }
  })

  await t.step('async function success (await)', async () => {
    const time = new FakeTime()
    try {
      const p = timeIt(async () => {
        await new Promise<void>((resolve) => setTimeout(resolve, 100))
        return 'ok'
      })

      // Advance the fake clock so the timeout fires
      time.tick(100)
      const result = await p

      assertEquals(result.error, undefined)
      assertEquals(result.data, 'ok')
      assertEquals(result.duration, 100)
    } finally {
      time.restore()
    }
  })

  await t.step('promise-returning function success', async () => {
    const time = new FakeTime()
    try {
      const p = timeIt(() =>
        new Promise<number>((resolve) => {
          setTimeout(() => resolve(7), 30)
        })
      )

      time.tick(30)
      const result = await p

      assertEquals(result.error, undefined)
      assertEquals(result.data, 7)
      assertEquals(result.duration, 30)
    } finally {
      time.restore()
    }
  })

  await t.step('async error (rejection)', async () => {
    const time = new FakeTime()
    try {
      const p = timeIt(async () => {
        await new Promise((_, reject) =>
          setTimeout(() => reject(new Error('fail')), 40)
        )
        return 'never'
      })

      time.tick(40)
      const result = await p

      assertEquals(result.data, undefined)
      assert(result.error instanceof Error)
      assertEquals((result.error as Error).message, 'fail')
      assertEquals(result.duration, 40)
    } finally {
      time.restore()
    }
  })
})
