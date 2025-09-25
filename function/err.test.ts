import { assertEquals } from '@std/assert'
import { err } from './err.ts'

Deno.test('err', async (t) => {
  await t.step('should create failure result with error', () => {
    const error = new Error('test error')
    const result = err(error)

    assertEquals(result.data, undefined)
    assertEquals(result.error, error)
  })

  await t.step('should work with different error types', () => {
    // Error
    const errorResult = err(new Error('error message'))
    assertEquals(errorResult.data, undefined)
    assertEquals((errorResult.error as Error).message, 'error message')

    // String
    const stringResult = err('string error')
    assertEquals(stringResult.data, undefined)
    assertEquals(stringResult.error, 'string error')

    // Custom error
    class CustomError extends Error {
      constructor(message: string) {
        super(message)
        this.name = 'CustomError'
      }
    }
    const customResult = err(new CustomError('custom error'))
    assertEquals(customResult.data, undefined)
    assertEquals((customResult.error as CustomError).message, 'custom error')
  })
})
