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

  const distanceGrid: number[][] = []
  for (
    let currentIndex = 0;
    currentIndex <= target.length;
    currentIndex++
  ) {
    distanceGrid[currentIndex] = [currentIndex]
    for (
      let comparisonIndex = 1;
      comparisonIndex <= source.length;
      comparisonIndex++
    ) {
      distanceGrid[currentIndex][comparisonIndex] = currentIndex === 0
        ? comparisonIndex
        : Math.min(
          distanceGrid[currentIndex - 1][comparisonIndex] + 1,
          distanceGrid[currentIndex][comparisonIndex - 1] + 1,
          distanceGrid[currentIndex - 1][comparisonIndex - 1] +
            (source[comparisonIndex - 1] === target[currentIndex - 1] ? 0 : 1),
        )
    }
  }
  return distanceGrid[target.length][source.length]
}
