import { wrapInParentheses } from './wrap-in-parentheses.ts'
import { wrapInParenthesesFixture } from './wrap-in-parentheses.fixture.ts'

Deno.bench('wrapInParentheses', () => {
  wrapInParentheses(wrapInParenthesesFixture)
})
