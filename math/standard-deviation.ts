/**
 * Calculates the standard deviation of a set of numbers.
 * The standard deviation is a measure of the amount of variation or dispersion
 * of a set of values.
 * A low standard deviation means that the values tend to be close to the mean
 * (also called the expected value) of the set,
 * while a high standard deviation means that the values are spread out over a
 * wider range.
 *
 * It can calculate the standard deviation for a population or a sample.
 * - **Population**: When the data set includes all of the data you are
 *   interested in.
 * - **Sample**: When the data set only includes part of the data you are
 *   interested in.
 *
 * @param {number[]} numbers - The array of numbers.
 * @param {boolean} [usePopulation=false] - Whether to calculate the standard
 * deviation for a population or a sample.
 * @returns {number} The standard deviation of the numbers.
 *
 * @example
 * ```typescript
 * standardDeviation([1, 2, 3, 4])
 * // returns approximately 1.291
 * ```
 *
 * @example
 * ```typescript
 * standardDeviation([1, 2, 3, 4], {usePopulation: true})
 * // returns approximately 1.118
 * ```
 *
 * Mathematical formula:
 * ```text
 * Mean (μ): Σx/n
 * Variance (σ²): Σ(x - μ)²/n
 * Standard Deviation (σ): √σ²
 * ````
 */
export function standardDeviation(
  numbers: number[],
  options?: { usePopulation?: boolean },
): number {
  const { usePopulation = false } = options ?? {}
  if (numbers.length === 1) return 0

  const size = numbers.length
  const mean = numbers.reduce((total, value) => total + value, 0) / size
  const variance = numbers.reduce(
    (accumulatedVariance, value) => accumulatedVariance + (value - mean) ** 2,
    0,
  ) /
    (size - (usePopulation ? 0 : 1))

  return Math.sqrt(variance)
}

/**
 * Alias for the {@link standardDeviation} function.
 */
export const variance: typeof standardDeviation = standardDeviation
