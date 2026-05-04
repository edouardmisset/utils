import { timeIt } from './time-it.ts'
import { timeItFixtureValue } from './time-it.fixture.ts'

Deno.bench('timeIt', async () => {
  await timeIt(() => timeItFixtureValue)
})
