import { assert } from 'asserts'
import { random, randomInt } from './random.ts'

Deno.test('random functions', async (t) => {
  await t.step('random', () => {
    const result = random(1, 5)
    assert(result >= 1 && result <= 5)
  })

  await t.step('randomInt', () => {
    const result = randomInt(1, 5)
    assert(result >= 1 && result <= 5 && Number.isInteger(result))
  })
})
