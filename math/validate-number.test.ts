import { assertEquals } from "@std/assert"
import { validateNumber } from "./validate-number.ts"

Deno.test('validateNumber', async (t) => {

  await t.step("validateNumber returns true for finite numbers", () => {
    assertEquals(validateNumber(123), true)
    assertEquals(validateNumber(1n), false)
    assertEquals(validateNumber(123.5), true)
    assertEquals(validateNumber(-123), true)
    assertEquals(validateNumber(-1n), false)
    assertEquals(validateNumber(-123.5), true)
    assertEquals(validateNumber(0), true)
  })

  await t.step("validateNumber returns false for non-finite numbers", () => {
    assertEquals(validateNumber(Infinity), false)
    assertEquals(validateNumber(-Infinity), false)
    assertEquals(validateNumber(NaN), false)
    assertEquals(validateNumber(undefined), false)
    assertEquals(validateNumber(null), false)
    assertEquals(validateNumber({}), false)
  })

  await t.step("validateNumber returns true for numeric strings representing finite numbers", () => {
    assertEquals(validateNumber("123"), true)
    assertEquals(validateNumber("1   "), true)
    assertEquals(validateNumber("123.5"), true)
    assertEquals(validateNumber("-123"), true)
    assertEquals(validateNumber("-123.5"), true)
    assertEquals(validateNumber("0"), true)
  })

  await t.step("validateNumber returns false for non-numeric strings and numeric strings representing non-finite numbers", () => {
    assertEquals(validateNumber("123abc"), false)
    assertEquals(validateNumber(""), false)
    assertEquals(validateNumber(" "), false)

    assertEquals(validateNumber("Infinity"), false)
    assertEquals(validateNumber("-Infinity"), false)
    assertEquals(validateNumber("NaN"), false)
  })
})