import { assertEquals, assertStrictEquals } from '@std/assert'
import * as publicApi from '../mod.ts'
import { performanceCases } from './cases.ts'

Deno.test('benchmark cases cover every public runtime function', () => {
  const runtimeExports = Object.entries(publicApi)
    .filter(([, value]) => typeof value === 'function')
    .map(([name]) => name)
    .toSorted()
  const coveredExports = performanceCases.flatMap((benchmark) =>
    benchmark.exports
  )
    .toSorted()

  assertEquals(coveredExports, runtimeExports)
})

Deno.test('exports grouped in one benchmark are aliases', () => {
  for (const benchmark of performanceCases) {
    const [canonical, ...aliases] = benchmark.exports
    for (const alias of aliases) {
      assertStrictEquals(
        publicApi[alias as keyof typeof publicApi],
        publicApi[canonical as keyof typeof publicApi],
      )
    }
  }
})
