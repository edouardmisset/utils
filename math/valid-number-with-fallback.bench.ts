import { validNumberWithFallback } from './valid-number-with-fallback.ts'
import {
  validNumberWithFallbackFixture,
} from './valid-number-with-fallback.fixture.ts'

Deno.bench('validNumberWithFallback', () => {
  validNumberWithFallback(
    validNumberWithFallbackFixture.value,
    validNumberWithFallbackFixture.fallback,
  )
})
