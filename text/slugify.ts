/**
 * Converts a string into a URL-friendly slug.
 *
 * The function performs the following steps:
 * 1. Trims whitespace from the start and end of the string.
 * 2. Converts the string to lower case.
 * 3. Removes all non-word characters, spaces, and hyphens using the regex /[^\w\s-]/g.
 * 4. Replaces one or more spaces, underscores, or hyphens with a single hyphen using the regex /[\s_-]+/g.
 * 5. Removes hyphens from the start and end of the string using the regex /^-+|-+$/g.
 *
 * @param {string} string_ - The string to convert into a slug.
 * @returns {string} The slugified string.
 *
 * @example
 * ```typescript
 * slugify('Hello World!')
 * // returns 'hello-world'
 * ```
 */
export function slugify(string_: string): string {
  return string_
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
