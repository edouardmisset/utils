/**
 * Calculates the distance between two strings.
 *
 * @param {string} source - the first string to compare against
 * @param {string} target - the second string
 * @returns {number} - The number of character difference
 *
 * @example
 * levenshteinDistance('hi', 'hi')
 * // returns 0
 *
 * levenshteinDistance('hello', 'hi')
 * // returns 4
 */
export const levenshteinDistance = (source: string, target: string): number => {
  if (!source.length) return target.length
  if (!target.length) return source.length

  const arr: number[][] = []
  for (let i = 0; i <= target.length; i++) {
    arr[i] = [i]
    for (let j = 1; j <= source.length; j++) {
      arr[i][j] = i === 0 ? j : Math.min(
        arr[i - 1][j] + 1,
        arr[i][j - 1] + 1,
        arr[i - 1][j - 1] + (source[j - 1] === target[i - 1] ? 0 : 1),
      )
    }
  }
  return arr[target.length][source.length]
}
