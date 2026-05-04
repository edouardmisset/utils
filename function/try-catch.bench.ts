import { tryCatch } from './try-catch.ts'
import { tryCatchFixtureInput } from './try-catch.fixture.ts'

Deno.bench('tryCatch', () => {
  tryCatch(() => tryCatchFixtureInput)
})
