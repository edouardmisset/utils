import { assertEquals } from '@std/assert'
import { compose, pipe } from './pipe.ts'

const addOne = (x: number): number => x + 1
const double = (x: number): number => x * 2
const triple = (x: number): number => x * 3

Deno.test('compose', async (t) => {
  const addOneThenDouble = compose(double, addOne)
  const addOneThenDoubleThenTriple = compose(triple, double, addOne)

  await t.step('should apply two functions in right-to-left order', () => {
    const result = addOneThenDouble(5)
    assertEquals(result, 12)
  })

  await t.step('should apply three functions in right-to-left order', () => {
    const result = addOneThenDoubleThenTriple(5)
    assertEquals(result, 36)
  })
})

Deno.test('pipe', async (t) => {
  const addOneThenDouble = pipe(addOne, double)
  const addOneThenDoubleThenTriple = pipe(addOne, double, triple)

  await t.step('should apply two functions in left-to-right order', () => {
    const result = addOneThenDouble(5)
    assertEquals(result, 12)
  })

  await t.step('should apply three functions in left-to-right order', () => {
    const result = addOneThenDoubleThenTriple(5)
    assertEquals(result, 36)
  })
})
