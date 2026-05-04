import { commonElements } from './common-elements.ts'
import {
  commonElementsFixtureA,
  commonElementsFixtureB,
} from './common-elements.fixture.ts'

Deno.bench('commonElements', () => {
  commonElements(commonElementsFixtureA, commonElementsFixtureB)
})
