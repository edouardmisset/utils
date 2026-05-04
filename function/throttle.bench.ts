import { throttle } from './throttle.ts'
import { throttleFixtureDelay } from './throttle.fixture.ts'

Deno.bench('throttle', () => {
  throttle({ callback: () => {}, delay: throttleFixtureDelay })
})
