import { filterByDate } from '../array/filter-by-date.ts'
import { keyBy } from '../array/key-by.ts'
import { mergeUnique } from '../array/merge-unique.ts'
import { range } from '../array/range.ts'
import { selectBy } from '../array/select-by.ts'
import { symmetricDifference } from '../array/symmetric-difference.ts'
import { convertStringDate } from '../date/convert-string-date.ts'
import { isDateInLast12Months } from '../date/is-date-in-last-12-months.ts'
import { isDateInRange } from '../date/is-date-in-range.ts'
import { isValidDate } from '../date/is-valid-date.ts'
import { throttle } from '../function/throttle.ts'
import { average } from '../math/average.ts'
import { product } from '../math/product.ts'
import { sum } from '../math/sum.ts'
import { invert } from '../object/invert.ts'
import { shallowEqual } from '../object/shallow-equal.ts'

const numbers = Array.from({ length: 10_000 }, (_, index) => index + 1)
const objects = numbers.map((id) => ({ id, name: `name-${id}` }))
const keyedObject = Object.fromEntries(
  numbers.map((id) => [`key-${id}`, `value-${id}`]),
)
const left = numbers.slice(0, 7_500)
const right = numbers.slice(2_500)
const third = numbers.slice(5_000).map((value) => value + 5_000)
const dates = numbers.map((index) => ({
  date: new Date(2020 + index % 5, index % 12, 1),
}))
const equalObject = { ...keyedObject }
const smallerObject = Object.fromEntries(Object.entries(keyedObject).slice(1))
const startDate = new Date('2024-01-01')
const endDate = new Date('2024-12-31')
const benchmarkResult: { value: unknown } = { value: undefined }

Deno.bench('filterByDate — 10k dates', () => {
  benchmarkResult.value = filterByDate({
    array: dates,
    options: { year: 2022 },
    keyOrFunction: 'date',
  })
})

Deno.bench('keyBy — 10k items', () => {
  benchmarkResult.value = keyBy(objects, 'id')
})

Deno.bench('mergeUnique — 10k items', () => {
  benchmarkResult.value = mergeUnique(left, right)
})

Deno.bench('range — 10k values', () => {
  benchmarkResult.value = range(0, 10_000)
})

Deno.bench('selectBy — 10k items', () => {
  benchmarkResult.value = selectBy(objects, 'name')
})

Deno.bench('symmetricDifference — 3x10k items', () => {
  benchmarkResult.value = symmetricDifference(left, right, third)
})

Deno.bench('convertStringDate — 10k calls', () => {
  let result
  for (let index = 0; index < 10_000; index++) {
    result = convertStringDate('31/01/2022 12:00')
  }
  benchmarkResult.value = result
})

Deno.bench('isDateInLast12Months — 1k calls', () => {
  let matches = 0
  for (let index = 0; index < 1_000; index++) {
    if (isDateInLast12Months(dates[index].date).data) matches++
  }
  benchmarkResult.value = matches
})

Deno.bench('isDateInRange — 10k calls', () => {
  let matches = 0
  for (let index = 0; index < 10_000; index++) {
    if (isDateInRange(dates[index].date, { startDate, endDate })) matches++
  }
  benchmarkResult.value = matches
})

Deno.bench('isValidDate — 10k calls', () => {
  let valid = 0
  for (let index = 0; index < 10_000; index++) {
    if (isValidDate(dates[index].date, startDate, endDate)) valid++
  }
  benchmarkResult.value = valid
})

let throttleCallCount = 0
const throttled = throttle({
  callback: () => {
    throttleCallCount++
  },
  delay: 0,
})

Deno.bench('throttle — 10k calls', () => {
  for (let index = 0; index < 10_000; index++) throttled()
  benchmarkResult.value = throttleCallCount
})

Deno.bench('average — 10k values', () => {
  benchmarkResult.value = average(numbers)
})

Deno.bench('product — 10k values', () => {
  benchmarkResult.value = product(numbers)
})

Deno.bench('sum — 10k values', () => {
  benchmarkResult.value = sum(numbers)
})

Deno.bench('invert — 10k entries', () => {
  benchmarkResult.value = invert(keyedObject)
})

Deno.bench('shallowEqual — equal 10k-key objects', () => {
  benchmarkResult.value = shallowEqual(keyedObject, equalObject)
})

Deno.bench('shallowEqual — different-sized objects', () => {
  benchmarkResult.value = shallowEqual(keyedObject, smallerObject)
})
