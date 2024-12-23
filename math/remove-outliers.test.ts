import { assertEquals, assertThrows } from '@std/assert'
import {
  removeOutliers3StandardDeviation,
  removeOutliersFromDistribution,
  removeOutliersIQR,
} from './remove-outliers.ts'

Deno.test('removeOutliers3StandardDeviation', async (t) => {
  await t.step('removes outliers using 3 standard deviations method', () => {
    const data = [
      1,
      2,
      3,
      3,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      6,
      6,
      6,
      7,
      7,
      8,
      9,
      1_000_000_000_000,
    ]
    const result = removeOutliers3StandardDeviation(data)
    assertEquals(result, [1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9])
  })

  await t.step('returns the same array if no outliers', () => {
    const data = [1, 2, 3, 4, 5]
    const result = removeOutliers3StandardDeviation(data)
    assertEquals(result, data)
  })

  await t.step('returns the same array if dataset is too small', () => {
    const data = [1]
    const result = removeOutliers3StandardDeviation(data)
    assertEquals(result, data)
  })
})

Deno.test('removeOutliersIQR', async (t) => {
  await t.step(
    'removes outliers using IQR method with default percentage',
    () => {
      const data = [
        1,
        2,
        3,
        3,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        6,
        6,
        6,
        7,
        7,
        8,
        9,
        1_000_000_000_000,
      ]
      const result = removeOutliersIQR(data)
      assertEquals(result, [4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7])
    },
  )

  await t.step(
    'removes outliers using IQR method with custom percentage',
    () => {
      const data = [
        1,
        2,
        3,
        3,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        6,
        6,
        6,
        7,
        7,
        8,
        9,
        1_000_000_000_000,
      ]
      const result = removeOutliersIQR(data, 10)
      assertEquals(result, [3, 4])
    },
  )

  await t.step('returns the same array if no outliers', () => {
    const data = [1, 2, 3, 4, 5]
    const result = removeOutliersIQR(data)
    assertEquals(result, data)
  })

  await t.step('returns the same array if dataset is too small', () => {
    const data = [1]
    const result = removeOutliersIQR(data)
    assertEquals(result, data)
  })

  await t.step('throws an error if percentage is out of range', () => {
    const data = [1, 2, 3, 4, 5]
    assertThrows(() => removeOutliersIQR(data, 60))
  })
})

Deno.test('removeOutliersFromDistribution', async (t) => {
  await t.step('removes outliers using 3 standard deviations method', () => {
    const data = [1, 2, 3, 4, 5, 100]
    const result = removeOutliersFromDistribution(data, {
      isSkewedDistribution: false,
    })
    assertEquals(result, [1, 2, 3, 4, 5])
  })

  await t.step(
    'removes outliers using IQR method with default percentage',
    () => {
      const data = [1, 2, 3, 4, 5, 100]
      const result = removeOutliersFromDistribution(data, {
        isSkewedDistribution: true,
      })
      assertEquals(result, [2, 3, 4, 5])
    },
  )

  await t.step(
    'removes outliers using IQR method with custom percentage',
    () => {
      const data = [1, 2, 3, 4, 5, 100]
      const result = removeOutliersFromDistribution(data, {
        isSkewedDistribution: true,
        percentage: 10,
      })
      assertEquals(result, [3, 4])
    },
  )

  await t.step('returns the same array if no outliers', () => {
    const data = [1, 2, 3, 4, 5]
    const result = removeOutliersFromDistribution(data, {
      isSkewedDistribution: false,
    })
    assertEquals(result, data)
  })

  await t.step('returns the same array if dataset is too small', () => {
    const data = [1]
    const result = removeOutliersFromDistribution(data, {
      isSkewedDistribution: false,
    })
    assertEquals(result, data)
  })
})
