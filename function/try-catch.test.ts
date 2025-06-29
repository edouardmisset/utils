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

  await t.step('should handle different data types', async () => {
    // Number
    const numberResult = await tryCatch(Promise.resolve(42))
    assertEquals(numberResult.data, 42)
    assertEquals(numberResult.error, undefined)

    // Object
    const obj = { name: 'test', value: 123 }
    const objectResult = await tryCatch(Promise.resolve(obj))
    assertEquals(objectResult.data, obj)
    assertEquals(objectResult.error, undefined)

    // Array
    const arr = [1, 2, 3]
    const arrayResult = await tryCatch(Promise.resolve(arr))
    assertEquals(arrayResult.data, arr)
    assertEquals(arrayResult.error, undefined)
  })

  await t.step('should handle different error types', async () => {
    // TypeError
    const typeErrorResult = await tryCatch(
      Promise.reject(new TypeError('Type error')),
    )
    assertEquals(typeErrorResult.data, undefined)
    assertEquals(typeErrorResult.error instanceof TypeError, true)
    assertEquals((typeErrorResult.error as TypeError).message, 'Type error')

    // String error
    const stringErrorResult = await tryCatch<never, string>(
      Promise.reject('String error'),
    )
    assertEquals(stringErrorResult.data, undefined)
    assertEquals(stringErrorResult.error, 'String error')

    // Custom error
    class CustomError extends Error {
      constructor(message: string) {
        super(message)
        this.name = 'CustomError'
      }
    }
    const customErrorResult = await tryCatch(
      Promise.reject(new CustomError('Custom error')),
    )
    assertEquals(customErrorResult.data, undefined)
    assertEquals(customErrorResult.error instanceof CustomError, true)
    assertEquals(
      (customErrorResult.error as CustomError).message,
      'Custom error',
    )
  })

  await t.step('should work with async functions', async () => {
    const asyncSuccess = async (): Promise<string> => {
      await new Promise((resolve) => setTimeout(resolve, 10))
      return 'async success'
    }

    const asyncError = async (): Promise<string> => {
      await new Promise((resolve) => setTimeout(resolve, 10))
      throw new Error('async error')
    }

    const successResult = await tryCatch(asyncSuccess())
    assertEquals(successResult.data, 'async success')
    assertEquals(successResult.error, undefined)

    const errorResult = await tryCatch(asyncError())
    assertEquals(errorResult.data, undefined)
    assertEquals((errorResult.error as Error).message, 'async error')
  })

  await t.step('should work with fetch-like operations', async () => {
    // Simulate a successful fetch
    const mockSuccessfulFetch = (): Promise<{ status: number; data: string }> =>
      Promise.resolve({ status: 200, data: 'response data' })

    const successResult = await tryCatch(mockSuccessfulFetch())
    assertEquals(successResult.data?.status, 200)
    assertEquals(successResult.data?.data, 'response data')
    assertEquals(successResult.error, undefined)

    // Simulate a failed fetch
    const mockFailedFetch = (): Promise<{ status: number; data: string }> =>
      Promise.reject(new Error('Network error'))

    const errorResult = await tryCatch(mockFailedFetch())
    assertEquals(errorResult.data, undefined)
    assertEquals((errorResult.error as Error).message, 'Network error')
  })

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

  await t.step('should work with mathematical operations synchronously', () => {
    // Division by zero (doesn't throw in JavaScript, returns Infinity)
    const divisionResult = tryCatch(() => 10 / 0)
    assertEquals(divisionResult.data, Infinity)
    assertEquals(divisionResult.error, undefined)

    // Throwing an error manually
    const mathErrorResult = tryCatch(() => {
      const x = 5
      if (x > 0) throw new Error('Number is positive')
      return x * 2
    })
    assertEquals(mathErrorResult.data, undefined)
    assertEquals((mathErrorResult.error as Error).message, 'Number is positive')
  })

  await t.step(
    'should handle different return types with sync functions',
    () => {
      // Number
      const numberResult = tryCatch(() => 42)
      assertEquals(numberResult.data, 42)
      assertEquals(numberResult.error, undefined)

      // Object
      const objectResult = tryCatch(() => ({ x: 1, y: 2 }))
      assertEquals(objectResult.data?.x, 1)
      assertEquals(objectResult.data?.y, 2)
      assertEquals(objectResult.error, undefined)

      // Array
      const arrayResult = tryCatch(() => [1, 2, 3])
      assertEquals(arrayResult.data?.[0], 1)
      assertEquals(arrayResult.data?.length, 3)
      assertEquals(arrayResult.error, undefined)

      // Boolean
      const boolResult = tryCatch(() => true)
      assertEquals(boolResult.data, true)
      assertEquals(boolResult.error, undefined)
    },
  )
})
