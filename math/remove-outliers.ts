import { mean } from './average.ts'
import { standardDeviation as getStandardDeviation } from './standard-deviation.ts'

/**
 * Options for removing outliers from a dataset.
 *
 * @property {boolean} isSkewedDistribution - Indicates whether the dataset has
 * a skewed distribution or a Normal Distribution (Gaussian Distribution).
 * @property {number} [percentage=25] - The percentage of data to consider as
 * outliers if the distribution is skewed. This property is only applicable when
 * `isSkewedDistribution` is true. The value must be between 0 and 50.
 */
type RemoveOutliersOptions =
  | { isSkewedDistribution: true; percentage?: number }
  | { isSkewedDistribution: false }

/**
 * Removes outliers from a dataset using the 3 standard deviations method.
 *
 * This function calculates the mean and standard deviation of the input numbers,
 * then filters out any numbers that fall outside the range of 3 standard deviations
 * from the mean.
 *
 * @param {number[]} numbers - The dataset from which to remove outliers.
 * @returns {number[]} A new array with the outliers removed.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 * // Example 1: Basic usage
 * const data = [1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9, 1_000_000_000_000]
 * assertEquals(removeOutliers3StandardDeviation(data), [1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9])
 *
 * // Example 2: No outliers
 * const data = [1, 2, 3, 4, 5]
 * assertEquals(removeOutliers3StandardDeviation(data), data)
 *
 * // Example 3: Small dataset
 * const data = [1]
 * assertEquals(removeOutliers3StandardDeviation(data), data)
 * ```
 */
export function removeOutliers3StandardDeviation(numbers: number[]): number[] {
  if (numbers.length < 2) return numbers

  const average = mean(numbers)
  const standardDeviation = getStandardDeviation(numbers)

  const lowerBound = average - 3 * standardDeviation
  const upperBound = average + 3 * standardDeviation

  return numbers.filter((number) =>
    lowerBound <= number && number <= upperBound
  )
}

/**
 * Removes outliers from a dataset using the Interquartile Range (IQR) method.
 *
 * This function calculates the lower and upper quartiles of the input numbers,
 * then filters out any numbers that fall outside the specified percentage range
 * from the quartiles.
 *
 * @param {number[]} numbers - The dataset from which to remove outliers.
 * @param {number} [percentage=25] - The percentage of data to consider as outliers.
 * The value must be between 0 and 50. The default value is 25.
 * @returns {number[]} A new array with the outliers removed.
 *
 * @throws {Error} If the percentage is not between 0 and 50.
 *
 * @example
 * ```typescript
 * // Example 1: Basic usage
 * const data = [1, 2, 3, 4, 5, 100]
 * removeOutliersIQR(data, 25)
 * // returns [2, 3, 4, 5, 100]
 *
 * // Example 2: No outliers
 * const data = [1, 2, 3, 4, 5]
 * removeOutliersIQR(data, 25)
 * // returns [1, 2, 3, 4, 5]
 *
 * // Example 3: Small dataset
 * const data = [1]
 * removeOutliersIQR(data, 25)
 * // returns [1]
 * ```
 */
export function removeOutliersIQR(
  numbers: number[],
  percentage = 25,
): number[] {
  const size = numbers.length

  if (0 > percentage || percentage > 50) {
    throw new Error(
      'The percentage of data to consider as outliers must be between 0 and 50.',
    )
  }

  const minimumNumberPoints = 100 / percentage

  if (size < minimumNumberPoints) return numbers

  const sortedNumbers = numbers.toSorted((left, right) => left - right)
  const lowerQuartileIndex = Math.floor((percentage / 100) * size)
  const upperQuartileIndex = Math.ceil((1 - (percentage / 100)) * size)

  const lowerBound = sortedNumbers[lowerQuartileIndex]
  const upperBound = sortedNumbers[upperQuartileIndex]

  return numbers.filter((number) =>
    lowerBound <= number && number <= upperBound
  )
}

/**
 * Removes outliers from a dataset based on the specified distribution type.
 *
 * This function can remove outliers using either the 3 standard deviations method
 * or the Interquartile Range (IQR) method, depending on whether the dataset is
 * considered to have a skewed distribution.
 *
 * @param {number[]} numbers - The dataset from which to remove outliers.
 * @param {RemoveOutliersOptions} [options={ isSkewedDistribution: false }] -
 * Options for removing outliers.
 * @returns {number[]} A new array with the outliers removed.
 *
 * @example
 * ```typescript
 * // Example 1: Using 3 standard deviations method
 * const data = [1, 2, 3, 4, 5, 100]
 * const filteredData = removeOutliersFromDistribution(data, { isSkewedDistribution: false })
 * console.log(filteredData) // Output: [1, 2, 3, 4, 5]
 *
 * // Example 2: Using IQR method with default percentage
 * const data = [1, 2, 3, 4, 5, 100]
 * const filteredData = removeOutliersFromDistribution(data, { isSkewedDistribution: true })
 * console.log(filteredData) // Output: [2, 3, 4, 5]
 *
 * // Example 3: Using IQR method with custom percentage
 * const data = [1, 2, 3, 4, 5, 100]
 * const filteredData = removeOutliersFromDistribution(data, { isSkewedDistribution: true, percentage: 10 })
 * console.log(filteredData) // Output: [3, 4]
 * ```
 */
export function removeOutliersFromDistribution(
  numbers: number[],
  options: RemoveOutliersOptions = { isSkewedDistribution: false },
): number[] {
  return options.isSkewedDistribution
    ? removeOutliersIQR(numbers, options?.percentage)
    : removeOutliers3StandardDeviation(numbers)
}
