/**
 * TS utility functions for working with types.
 *
 * ```typescript
 * import { LooseAutocomplete } from 'jsr:@edouard/type'
 *
 * type RedOrOther = LooseAutoComplete<"red">
 *
 * let string1: RedOrOther = "red" // is valid and autocompleted by the editor
 * let string2: RedOrOther = "orange" // is valid but not autocompleted by the editor
 * ```
 *
 * @module
 */

export * from './type-helpers.ts'
