import { pipe } from './pipe.ts'
import { pipeFixtureValue } from './pipe.fixture.ts'

const addOne = (x: number): number => x + 1
const double = (x: number): number => x * 2

Deno.bench('pipe', () => {
  pipe(addOne, double)(pipeFixtureValue)
})
