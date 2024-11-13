import { assertEquals } from '@std/assert/equals'
import { memoize } from './memoization.ts'

import { assertSpyCall, assertSpyCalls, spy } from '@std/testing/mock'

Deno.test('memoize', async (t) => {
  await t.step('should memoize the results of a function', () => {
    const spyFunction = spy((x: number) => x * 2)
    const memoizedFunction = memoize(spyFunction)

    // Call the memoized function with the same arguments
    assertEquals(memoizedFunction(2), 4)

    assertSpyCall(spyFunction, 0, {
      args: [2],
      returned: 4,
    })

    assertEquals(memoizedFunction(2), 4)

    // The original function should have been called only once
    assertSpyCalls(spyFunction, 1)
  })

  await t.step('should handle functions with no arguments', () => {
    const spyFunction = spy(() => 42)
    const memoizedFunction = memoize(spyFunction)

    // Call the memoized function with no arguments
    assertEquals(memoizedFunction(), 42)
    assertEquals(memoizedFunction(), 42)

    // The original function should have been called only once
    assertSpyCalls(spyFunction, 1)
  })

  await t.step('should clear the cache', () => {
    const spyFunction = spy((x: number) => x * 2)
    const memoizedFunction = memoize(spyFunction)

    // Call the memoized function and then clear the cache
    assertEquals(memoizedFunction(2), 4)
    memoizedFunction.clearCache()
    assertEquals(memoizedFunction(2), 4)

    // The original function should have been called twice
    assertSpyCalls(spyFunction, 2)
  })
})
