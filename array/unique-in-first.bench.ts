import { uniqueInFirst } from './unique-in-first.ts'
import {
  uniqueInFirstFixtureA,
  uniqueInFirstFixtureB,
} from './unique-in-first.fixture.ts'

Deno.bench('uniqueInFirst', () => {
  uniqueInFirst(uniqueInFirstFixtureA, uniqueInFirstFixtureB)
})
