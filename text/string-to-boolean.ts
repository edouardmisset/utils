/**
 * Converts a string to a boolean based on whether it's included in a list of "truthy" string values.
 *
 * This function is case-insensitive and ignores leading and trailing whitespace in the input string. By default, the only "truthy" string value is 'true'.
 *
 * @param {string} string_ - The string to convert to a boolean.
 * @param {string[]} [truthyValues=['true']] - An optional array of strings that should be considered "truthy". If this parameter is not provided, the function will only consider 'true' to be "truthy".
 * @returns {boolean} - Returns `true` if the trimmed, lowercased `value` is included in `truthyValues`, else `false`.
 *
 * @example
 * ```typescript
 * stringToBoolean('true') // returns true
 * stringToBoolean('True') // returns true
 * stringToBoolean(' TRUE ') // returns true
 * stringToBoolean('false') // returns false
 * stringToBoolean('yes', ['yes', 'y', 'true']) // returns true
 * stringToBoolean('no', ['yes', 'y', 'true']) // returns false
 * ```
 */
export function stringToBoolean(
  string_: string,
  truthyValues: string[] = ['true'],
): boolean {
  return truthyValues.includes(string_.toLowerCase().trim())
}
