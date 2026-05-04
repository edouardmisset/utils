import { debounce } from './debounce.ts'
import { debounceFixtureDelay } from './debounce.fixture.ts'

Deno.bench('debounce', () => {
  debounce({ callback: () => {}, delay: debounceFixtureDelay })
})
