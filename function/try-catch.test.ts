import { assertEquals } from '@std/assert'
import { tryCatch } from './try-catch.ts'

Deno.test('tryCatch', async (t) => {
  await t.step(
    'should return success result when promise resolves',
    async () => {
      const promise = Promise.resolve('hello world')
      const result = await tryCatch(promise)

      assertEquals(result.data, 'hello world')
      assertEquals(result.error, undefined)
    },
  )

  await t.step(
    'should return failure result when promise rejects',
    async () => {
      const errorMessage = 'Something went wrong'
      const promise = Promise.reject(new Error(errorMessage))
      const result = await tryCatch(promise)

      assertEquals(result.data, undefined)
      assertEquals(result.error instanceof Error, true)
      assertEquals((result.error as Error).message, errorMessage)
    },
  )

  await t.step('should work with synchronous functions', () => {
    // Success case
    const syncSuccess = () => 'sync success'
    const successResult = tryCatch(syncSuccess)

    assertEquals(successResult.data, 'sync success')
    assertEquals(successResult.error, undefined)

    // Error case
    const syncError = () => {
      throw new Error('sync error')
    }
    const errorResult = tryCatch(syncError)

    assertEquals(errorResult.data, undefined)
    assertEquals((errorResult.error as Error).message, 'sync error')
  })

  await t.step('should work with JSON parsing synchronously', () => {
    // Valid JSON
    const validJsonResult = tryCatch(() =>
      JSON.parse('{"name": "test", "value": 123}')
    )
    assertEquals(validJsonResult.data?.name, 'test')
    assertEquals(validJsonResult.data?.value, 123)
    assertEquals(validJsonResult.error, undefined)

    // Invalid JSON
    const invalidJsonResult = tryCatch(() => JSON.parse('invalid json'))
    assertEquals(invalidJsonResult.data, undefined)
    assertEquals(invalidJsonResult.error instanceof SyntaxError, true)
  })
})
