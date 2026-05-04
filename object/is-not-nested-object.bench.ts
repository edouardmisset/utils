import { isNotNestedObject } from './is-not-nested-object.ts'
import {
  isNotNestedObjectFixture,
} from './is-not-nested-object.fixture.ts'

Deno.bench('isNotNestedObject', () => {
  isNotNestedObject(isNotNestedObjectFixture)
})
