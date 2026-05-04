import { stringIncludes } from './string-includes.ts'
import {
  stringIncludesFixtureHaystack,
  stringIncludesFixtureNeedle,
} from './string-includes.fixture.ts'

Deno.bench('stringIncludes', () => {
  stringIncludes(stringIncludesFixtureHaystack, stringIncludesFixtureNeedle)
})
