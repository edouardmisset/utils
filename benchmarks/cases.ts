import * as utils from '../mod.ts'

/** A benchmark and the public exports whose implementation it covers. */
export type PerformanceCase = {
  name: string
  exports: string[]
  run: () => void | Promise<void>
}

const numbers = Array.from({ length: 10_000 }, (_, index) => index + 1)
const frequencyNumbers = numbers.map((value) => value % 100)
const objects = numbers.map((id) => ({
  id,
  group: id % 10,
  name: `name-${id}`,
}))
const keyedObject = Object.fromEntries(
  numbers.map((id) => [`key-${id}`, `value-${id}`]),
)
const left = numbers.slice(0, 7_500)
const right = numbers.slice(2_500)
const third = numbers.slice(5_000).map((value) => value + 5_000)
const dates = numbers.map((index) => ({
  date: new Date(2020 + index % 5, index % 12, 1),
}))
const dateValues = dates.map(({ date }) => date)
const dateStrings = numbers.map((index) => ({
  date: `${2020 + index % 5}-${String(index % 12 + 1).padStart(2, '0')}-01`,
}))
const equalObject = { ...keyedObject }
const date = new Date('2024-06-01')
const startDate = new Date('2024-01-01')
const endDate = new Date('2024-12-31')
const currentDate = new Date()
const benchmarkError = new Error('benchmark')
const rangeOptions = { minimum: 0, maximum: 100, value: 50 }
const benchmarkResult: { value: unknown } = { value: undefined }

function consume(value: unknown): void {
  benchmarkResult.value = value
}

const addOne = (value: number): number => value + 1
const double = (value: number): number => value * 2
const memoized = utils.memoize((value: number) => value * 2)
memoized(42)

const debounceTimer: { id: ReturnType<typeof setTimeout> | -1 } = { id: -1 }
const debounced = utils.debounce({
  callback: () => {},
  delay: 60_000,
  timerId: debounceTimer,
})

let throttleCallCount = 0
const throttled = utils.throttle({
  callback: () => {
    throttleCallCount++
  },
  delay: 0,
})

/** Benchmarks every distinct public runtime implementation. */
export const performanceCases: PerformanceCase[] = [
  {
    name: 'array/collectionKeyBy — 10k items',
    exports: ['collectionKeyBy', 'normalizeBy'],
    run: () => consume(utils.collectionKeyBy(objects, 'id')),
  },
  {
    name: 'array/commonElements — 10k items',
    exports: ['commonElements', 'intersection'],
    run: () => consume(utils.commonElements(left, right)),
  },
  {
    name: 'array/countBy — 10k items',
    exports: ['countBy', 'countIf'],
    run: () => consume(utils.countBy(numbers, (value) => value % 2 === 0)),
  },
  {
    name: 'array/filterBy — 10k items',
    exports: ['filterBy'],
    run: () =>
      consume(
        utils.filterBy({ array: objects, keyOrFunction: 'group', value: 5 }),
      ),
  },
  {
    name: 'array/filterByDate — 10k dates',
    exports: ['filterByDate'],
    run: () =>
      consume(utils.filterByDate({
        array: dates,
        options: { year: 2022 },
        keyOrFunction: 'date',
      })),
  },
  {
    name: 'array/findAndUpdate — 10k items',
    exports: ['findAndUpdate'],
    run: () =>
      consume(utils.findAndUpdate({
        array: objects,
        key: 'id',
        value: 5_000,
        updates: { name: 'updated' },
      })),
  },
  {
    name: 'array/findBy — 10k items',
    exports: ['findBy'],
    run: () =>
      consume(
        utils.findBy({ array: objects, keyOrFunction: 'id', value: 9_999 }),
      ),
  },
  {
    name: 'array/frequency — 10k items',
    exports: ['frequency'],
    run: () => consume(utils.frequency(frequencyNumbers)),
  },
  {
    name: 'array/groupBy — 10k items',
    exports: ['groupBy'],
    run: () => consume(utils.groupBy(objects, 'group')),
  },
  {
    name: 'array/keyBy — 10k items',
    exports: ['keyBy'],
    run: () => consume(utils.keyBy(objects, 'id')),
  },
  {
    name: 'array/maxBy — 10k items',
    exports: ['maxBy'],
    run: () => consume(utils.maxBy(objects, 'id')),
  },
  {
    name: 'array/mergeUnique — 10k items',
    exports: ['mergeUnique', 'union'],
    run: () => consume(utils.mergeUnique(left, right)),
  },
  {
    name: 'array/minBy — 10k items',
    exports: ['minBy'],
    run: () => consume(utils.minBy(objects, 'id')),
  },
  {
    name: 'array/randomItem — 10k items',
    exports: ['randomItem'],
    run: () => consume(utils.randomItem(numbers)),
  },
  {
    name: 'array/randomSort — 10k items',
    exports: ['randomSort', 'shuffleArray'],
    run: () => consume(utils.randomSort(numbers)),
  },
  {
    name: 'array/range — 10k values',
    exports: ['range', 'sequence'],
    run: () => consume(utils.range(0, 10_000)),
  },
  {
    name: 'array/selectBy — 10k items',
    exports: ['selectBy'],
    run: () => consume(utils.selectBy(objects, 'name')),
  },
  {
    name: 'array/setDifference — 10k items',
    exports: ['setDifference'],
    run: () => consume(utils.setDifference(left, right)),
  },
  {
    name: 'array/sortBy — 10k items',
    exports: ['sortBy', 'orderBy'],
    run: () => consume(utils.sortBy(objects, 'name')),
  },
  {
    name: 'array/symmetricDifference — 3x10k items',
    exports: ['symmetricDifference'],
    run: () => consume(utils.symmetricDifference(left, right, third)),
  },
  {
    name: 'array/take — 10k items',
    exports: ['take'],
    run: () => consume(utils.take(numbers, 5_000)),
  },
  {
    name: 'array/uniqueInFirst — 10k items',
    exports: ['uniqueInFirst'],
    run: () => consume(utils.uniqueInFirst(left, right, third)),
  },
  {
    name: 'date/convertStringDate',
    exports: ['convertStringDate'],
    run: () => consume(utils.convertStringDate('31/01/2022 12:00')),
  },
  {
    name: 'date/datification',
    exports: ['datification'],
    run: () => consume(utils.datification('2024-06-01')),
  },
  {
    name: 'date/firstDateOfMonth',
    exports: ['firstDateOfMonth'],
    run: () => consume(utils.firstDateOfMonth(date)),
  },
  {
    name: 'date/isDateCompatible',
    exports: ['isDateCompatible'],
    run: () => consume(utils.isDateCompatible(date)),
  },
  {
    name: 'date/isDateInDuration',
    exports: ['isDateInDuration'],
    run: () =>
      consume(utils.isDateInDuration(date, {
        referenceDate: startDate,
        durationInMS: 365 * 24 * 60 * 60 * 1_000,
      })),
  },
  {
    name: 'date/isDateInLast12Months',
    exports: ['isDateInLast12Months'],
    run: () => consume(utils.isDateInLast12Months(currentDate)),
  },
  {
    name: 'date/isDateInRange',
    exports: ['isDateInRange'],
    run: () => consume(utils.isDateInRange(date, { startDate, endDate })),
  },
  {
    name: 'date/isDateInRangeOption',
    exports: ['isDateInRangeOption'],
    run: () => consume(utils.isDateInRangeOption({ startDate, endDate })),
  },
  {
    name: 'date/isDateInYear',
    exports: ['isDateInYear'],
    run: () => consume(utils.isDateInYear(date, 2024)),
  },
  {
    name: 'date/isValidDate',
    exports: ['isValidDate'],
    run: () => consume(utils.isValidDate(date, startDate, endDate)),
  },
  {
    name: 'date/isYearOption',
    exports: ['isYearOption'],
    run: () => consume(utils.isYearOption({ year: 2024 })),
  },
  {
    name: 'date/lastDateOfMonth',
    exports: ['lastDateOfMonth'],
    run: () => consume(utils.lastDateOfMonth(date)),
  },
  {
    name: 'date/parseDate',
    exports: ['parseDate'],
    run: () => consume(utils.parseDate('2024-06-01')),
  },
  {
    name: 'date/sortByDate — 10k items',
    exports: ['sortByDate'],
    run: () => consume(dateStrings.toSorted(utils.sortByDate)),
  },
  {
    name: 'date/stringifyDate',
    exports: ['stringifyDate'],
    run: () => consume(utils.stringifyDate(date)),
  },
  {
    name: 'function/compose',
    exports: ['compose', 'combine'],
    run: () => consume(utils.compose(addOne, double)(42)),
  },
  {
    name: 'function/debounce',
    exports: ['debounce'],
    run: () => {
      debounced()
      if (debounceTimer.id !== -1) clearTimeout(debounceTimer.id)
      debounceTimer.id = -1
    },
  },
  {
    name: 'function/deepEqual',
    exports: ['deepEqual', 'isEqual'],
    run: () => consume(utils.deepEqual(keyedObject, equalObject)),
  },
  {
    name: 'function/err',
    exports: ['err'],
    run: () => consume(utils.err(benchmarkError)),
  },
  {
    name: 'function/getEnv',
    exports: ['getEnv'],
    run: async () => consume(await utils.getEnv('PATH')),
  },
  {
    name: 'function/isEmpty',
    exports: ['isEmpty'],
    run: () => consume(utils.isEmpty(numbers)),
  },
  {
    name: 'function/isFunction',
    exports: ['isFunction'],
    run: () => consume(utils.isFunction(addOne)),
  },
  {
    name: 'function/isValidJSON',
    exports: ['isValidJSON', 'isJSON'],
    run: () => consume(utils.isValidJSON('{"valid":true}')),
  },
  {
    name: 'function/memoize — cached call',
    exports: ['memoize', 'memo'],
    run: () => consume(memoized(42)),
  },
  {
    name: 'function/ok',
    exports: ['ok'],
    run: () => consume(utils.ok(42)),
  },
  {
    name: 'function/pipe',
    exports: ['pipe', 'chain'],
    run: () => consume(utils.pipe(addOne, double)(42)),
  },
  {
    name: 'function/sleep — zero delay',
    exports: ['sleep', 'wait'],
    run: async () => consume(await utils.sleep(0)),
  },
  {
    name: 'function/throttle',
    exports: ['throttle'],
    run: () => {
      throttled()
      consume(throttleCallCount)
    },
  },
  {
    name: 'function/timeIt',
    exports: ['timeIt'],
    run: async () => consume(await utils.timeIt(addOne, 42)),
  },
  {
    name: 'function/tryCatch',
    exports: ['tryCatch'],
    run: () => consume(utils.tryCatch(() => 42)),
  },
  {
    name: 'math/average — 10k values',
    exports: ['average', 'mean'],
    run: () => consume(utils.average(numbers)),
  },
  {
    name: 'math/averageTime — 10k dates',
    exports: ['averageTime'],
    run: () => consume(utils.averageTime(dateValues)),
  },
  {
    name: 'math/clamp',
    exports: ['clampValueInRange', 'clamp'],
    run: () => consume(utils.clampValueInRange(rangeOptions)),
  },
  {
    name: 'math/divmod',
    exports: ['divmod'],
    run: () => consume(utils.divmod(10_000, 37)),
  },
  {
    name: 'math/isInRange',
    exports: ['isInRange'],
    run: () => consume(utils.isInRange(rangeOptions)),
  },
  {
    name: 'math/isInRangeInclusive',
    exports: ['isInRangeInclusive'],
    run: () => consume(utils.isInRangeInclusive(rangeOptions)),
  },
  {
    name: 'math/isOutsideRangeInclusive',
    exports: ['isOutsideRangeInclusive'],
    run: () => consume(utils.isOutsideRangeInclusive(rangeOptions)),
  },
  {
    name: 'math/isStrictlyInRange',
    exports: ['isStrictlyInRange'],
    run: () => consume(utils.isStrictlyInRange(rangeOptions)),
  },
  {
    name: 'math/isStrictlyOutsideRange',
    exports: ['isStrictlyOutsideRange'],
    run: () => consume(utils.isStrictlyOutsideRange(rangeOptions)),
  },
  {
    name: 'math/isValidNumber',
    exports: ['isValidNumber'],
    run: () => consume(utils.isValidNumber(42)),
  },
  {
    name: 'math/normalize',
    exports: ['normalize'],
    run: () => consume(utils.normalize(rangeOptions)),
  },
  {
    name: 'math/percent',
    exports: ['percent'],
    run: () => consume(utils.percent(rangeOptions)),
  },
  {
    name: 'math/product — 10k values',
    exports: ['product'],
    run: () => consume(utils.product(numbers)),
  },
  {
    name: 'math/random',
    exports: ['random'],
    run: () => consume(utils.random(0, 100)),
  },
  {
    name: 'math/randomInt',
    exports: ['randomInt'],
    run: () => consume(utils.randomInt(0, 100)),
  },
  {
    name: 'math/roundToPrecision',
    exports: ['roundToPrecision'],
    run: () => consume(utils.roundToPrecision(Math.PI, 4)),
  },
  {
    name: 'math/scale',
    exports: ['scale'],
    run: () =>
      consume(utils.scale({
        inMinimum: 0,
        inMaximum: 100,
        outMinimum: 0,
        outMaximum: 1_000,
        value: 50,
      })),
  },
  {
    name: 'math/standardDeviation — 10k values',
    exports: ['standardDeviation', 'variance'],
    run: () => consume(utils.standardDeviation(numbers)),
  },
  {
    name: 'math/sum — 10k values',
    exports: ['sum'],
    run: () => consume(utils.sum(numbers)),
  },
  {
    name: 'math/toFixedWithoutZeros',
    exports: ['toFixedWithoutZeros', 'toFixed'],
    run: () => consume(utils.toFixedWithoutZeros(Math.PI, 4)),
  },
  {
    name: 'math/validNumberWithFallback',
    exports: ['validNumberWithFallback'],
    run: () => consume(utils.validNumberWithFallback('42', 0)),
  },
  {
    name: 'object/invert — 10k entries',
    exports: ['invert'],
    run: () => consume(utils.invert(keyedObject)),
  },
  {
    name: 'object/isKey',
    exports: ['isKey'],
    run: () => consume(utils.isKey(keyedObject, 'key-5000')),
  },
  {
    name: 'object/isNotNestedObject',
    exports: ['isNotNestedObject'],
    run: () => consume(utils.isNotNestedObject(keyedObject)),
  },
  {
    name: 'object/isObject',
    exports: ['isObject'],
    run: () => consume(utils.isObject(keyedObject)),
  },
  {
    name: 'object/isPlainObject',
    exports: ['isPlainObject'],
    run: () => consume(utils.isPlainObject(keyedObject)),
  },
  {
    name: 'object/mapObject — 10k entries',
    exports: ['mapObject'],
    run: () => consume(utils.mapObject(keyedObject, String)),
  },
  {
    name: 'object/objectKeys — 10k entries',
    exports: ['objectKeys'],
    run: () => consume(utils.objectKeys(keyedObject)),
  },
  {
    name: 'object/omit — 10k entries',
    exports: ['omit'],
    run: () => consume(utils.omit(keyedObject, ['key-1', 'key-2'])),
  },
  {
    name: 'object/pick',
    exports: ['pick'],
    run: () => consume(utils.pick(keyedObject, ['key-1', 'key-2'])),
  },
  {
    name: 'object/removeNullishObjectValues — 10k entries',
    exports: ['removeNullishObjectValues'],
    run: () => consume(utils.removeNullishObjectValues(keyedObject)),
  },
  {
    name: 'object/shallowEqual — equal 10k-key objects',
    exports: ['shallowEqual'],
    run: () => consume(utils.shallowEqual(keyedObject, equalObject)),
  },
  {
    name: 'object/size — 10k entries',
    exports: ['size', 'length'],
    run: () => consume(utils.size(keyedObject)),
  },
  {
    name: 'text/capitalize',
    exports: ['capitalize'],
    run: () => consume(utils.capitalize('hELLO wORLD')),
  },
  {
    name: 'text/levenshteinDistance',
    exports: ['levenshteinDistance'],
    run: () => consume(utils.levenshteinDistance('performance', 'regression')),
  },
  {
    name: 'text/removeAccents',
    exports: ['removeAccents'],
    run: () => consume(utils.removeAccents('Héllö wörld')),
  },
  {
    name: 'text/slugify',
    exports: ['slugify'],
    run: () => consume(utils.slugify('Héllö performance world')),
  },
  {
    name: 'text/stringEquals',
    exports: ['stringEquals'],
    run: () => consume(utils.stringEquals('Héllo', 'héllo')),
  },
  {
    name: 'text/stringEqualsCaseInsensitive',
    exports: ['stringEqualsCaseInsensitive'],
    run: () => consume(utils.stringEqualsCaseInsensitive('Héllo', 'héllo')),
  },
  {
    name: 'text/stringIncludes',
    exports: ['stringIncludes'],
    run: () =>
      consume(utils.stringIncludes('Hello performance world', 'PERFORMANCE')),
  },
  {
    name: 'text/stringToBoolean',
    exports: ['stringToBoolean'],
    run: () => consume(utils.stringToBoolean('yes', ['yes', 'true'])),
  },
  {
    name: 'text/wrapInParentheses',
    exports: ['wrapInParentheses'],
    run: () => consume(utils.wrapInParentheses('performance')),
  },
]
