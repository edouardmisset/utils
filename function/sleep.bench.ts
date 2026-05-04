import { sleep } from './sleep.ts'
import { sleepFixtureDuration } from './sleep.fixture.ts'

Deno.bench('sleep', async () => {
  await sleep(sleepFixtureDuration)
})
