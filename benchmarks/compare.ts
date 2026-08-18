type BenchResult = {
  group: string | null
  name: string
  results: { ok?: { avg: number } }[]
}

type BenchOutput = {
  version: number
  benches: BenchResult[]
}

/** One base-to-candidate benchmark comparison. */
export type Comparison = {
  name: string
  baseline: number
  candidate: number
  change: number
  passed: boolean
}

/** Returns the median of a non-empty list of numbers. */
export function median(values: number[]): number {
  if (values.length === 0) throw new Error('Cannot calculate an empty median')
  const sorted = values.toSorted((left, right) => left - right)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle]
}

/** Compares median benchmark times and applies the allowed regression threshold. */
export function compareMeasurements(
  baseline: Map<string, number[]>,
  candidate: Map<string, number[]>,
  threshold: number,
): Comparison[] {
  if (threshold < 0) throw new Error('Threshold cannot be negative')

  const baselineNames = [...baseline.keys()].toSorted()
  const candidateNames = [...candidate.keys()].toSorted()
  if (baselineNames.join('\n') !== candidateNames.join('\n')) {
    throw new Error('Baseline and candidate benchmark names do not match')
  }

  return baselineNames.map((name) => {
    const baselineMedian = median(baseline.get(name) ?? [])
    const candidateMedian = median(candidate.get(name) ?? [])
    const change = candidateMedian / baselineMedian - 1
    return {
      name,
      baseline: baselineMedian,
      candidate: candidateMedian,
      change,
      passed: candidateMedian <= baselineMedian * (1 + threshold),
    }
  })
}

async function readMeasurements(
  directory: string,
): Promise<Map<string, number[]>> {
  const measurements = new Map<string, number[]>()
  const entries = []
  for await (const entry of Deno.readDir(directory)) {
    if (entry.isFile && entry.name.endsWith('.json')) entries.push(entry.name)
  }
  entries.sort()
  if (entries.length === 0) {
    throw new Error(`No JSON results found in ${directory}`)
  }

  for (const entry of entries) {
    const output = JSON.parse(
      await Deno.readTextFile(`${directory}/${entry}`),
    ) as BenchOutput
    for (const bench of output.benches) {
      const result = bench.results.find((item) => item.ok)?.ok
      if (!result) throw new Error(`Benchmark failed: ${bench.name}`)
      const name = bench.group ? `${bench.group}: ${bench.name}` : bench.name
      const values = measurements.get(name) ?? []
      values.push(result.avg)
      measurements.set(name, values)
    }
  }

  return measurements
}

function formatDuration(nanoseconds: number): string {
  if (nanoseconds >= 1_000_000) {
    return `${(nanoseconds / 1_000_000).toFixed(2)} ms`
  }
  if (nanoseconds >= 1_000) return `${(nanoseconds / 1_000).toFixed(2)} µs`
  return `${nanoseconds.toFixed(2)} ns`
}

function report(comparisons: Comparison[], threshold: number): string {
  const lines = [
    '## Performance regression gate',
    '',
    `Candidate median must be no more than ${
      (threshold * 100).toFixed(0)
    }% slower than the base branch median.`,
    '',
    '| Benchmark | Base | Candidate | Change | Result |',
    '| --- | ---: | ---: | ---: | :---: |',
  ]

  for (const comparison of comparisons) {
    lines.push(
      `| ${comparison.name} | ${formatDuration(comparison.baseline)} | ${
        formatDuration(comparison.candidate)
      } | ${(comparison.change * 100).toFixed(1)}% | ${
        comparison.passed ? '✅' : '❌'
      } |`,
    )
  }
  return `${lines.join('\n')}\n`
}

function argument(name: string): string | undefined {
  const prefix = `--${name}=`
  return Deno.args.find((value) => value.startsWith(prefix))?.slice(
    prefix.length,
  )
}

async function main(): Promise<void> {
  const baselineDirectory = argument('baseline')
  const candidateDirectory = argument('candidate')
  const outputPath = argument('output')
  const summaryPath = outputPath ?? Deno.env.get('GITHUB_STEP_SUMMARY')
  const threshold = Number(argument('threshold') ?? '0.10')
  const runs = Number(argument('runs') ?? '3')
  if (
    !baselineDirectory || !candidateDirectory || Number.isNaN(threshold) ||
    !Number.isInteger(runs) || runs < 1
  ) {
    throw new Error(
      'Usage: compare.ts --baseline=<directory> --candidate=<directory> [--threshold=0.10] [--runs=3] [--output=<file>]',
    )
  }

  const baseline = await readMeasurements(baselineDirectory)
  const candidate = await readMeasurements(candidateDirectory)
  for (const [name, values] of [...baseline, ...candidate]) {
    if (values.length !== runs) {
      throw new Error(
        `Expected ${runs} results for ${name}, received ${values.length}`,
      )
    }
  }

  const comparisons = compareMeasurements(
    baseline,
    candidate,
    threshold,
  )
  const markdown = report(comparisons, threshold)
  globalThis.console.log(markdown)
  if (summaryPath) {
    await Deno.writeTextFile(summaryPath, markdown, { append: !outputPath })
  }
  if (comparisons.some(({ passed }) => !passed)) Deno.exit(1)
}

if (import.meta.main) await main()
