import { stringEquals, stringEqualsCaseInsensitive } from './string-equals.ts'
import {
  stringEqualsFixtureA,
  stringEqualsFixtureB,
} from './string-equals.fixture.ts'

Deno.bench('stringEquals', () => {
  stringEquals(stringEqualsFixtureA, stringEqualsFixtureB)
})

Deno.bench('stringEqualsCaseInsensitive', () => {
  stringEqualsCaseInsensitive(stringEqualsFixtureA, stringEqualsFixtureB)
})
