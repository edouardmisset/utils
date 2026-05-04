import { averageTime } from './average-time.ts'
import { averageTimeFixture } from './average-time.fixture.ts'

Deno.bench('averageTime', () => {
  averageTime(averageTimeFixture)
})
