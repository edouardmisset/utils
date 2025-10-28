import { assert, assertEquals } from '@std/assert'
import { random, randomInt } from './random.ts'

const numberOfNumbersGenerated = 1000

Deno.test('random', async (t) => {
  await t.step('random float within bounds (many samples)', () => {
    for (let i = 0; i < numberOfNumbersGenerated; i++) {
      const result = random(1, 5)
      assert(result >= 1 && result <= 5)
    }
  })

  await t.step('random returns exact value when min === max', () => {
    assertEquals(random(2, 2), 2)
  })

  await t.step('random supports negative ranges', () => {
    for (let i = 0; i < numberOfNumbersGenerated; i++) {
      const result = random(-5, -1)
      assert(-5 <= result && result <= -1)
    }
  })
})

Deno.test('randomInt', async (t) => {
  await t.step('random integer within bounds (many samples)', () => {
    for (let i = 0; i < numberOfNumbersGenerated; i++) {
      const result = randomInt(1, 5)
      assert(Number.isInteger(result))
      assert(1 <= result && result <= 5)
    }
  })

  await t.step('randomInt returns exact value when min === max', () => {
    assertEquals(randomInt(3, 3), 3)
  })

  await t.step('randomInt can produce both endpoints', () => {
    const seen = new Set<number>()
    const min = 1
    const max = 5
    // sample enough times to reasonably expect endpoints to appear
    for (let i = 0; i < numberOfNumbersGenerated; i++) {
      seen.add(randomInt(min, max))
      if (seen.size === (max - min + 1)) break
    }
    // Ensure we saw at least the min and max
    assert(seen.has(min))
    assert(seen.has(max))
  })
})
