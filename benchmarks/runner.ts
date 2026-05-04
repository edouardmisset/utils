/**
 * Benchmark runner that executes benchmarks based on configuration.
 * Run with: deno run --allow-read --allow-write --allow-run benchmarks/runner.ts
 */

import { fixtures as arrayFixtures } from '../array/fixtures.ts'
import { fixtures as dateFixtures } from '../date/fixtures.ts'
import { fixtures as functionFixtures } from '../function/fixtures.ts'
import { fixtures as mathFixtures } from '../math/fixtures.ts'
import { fixtures as objectFixtures } from '../object/fixtures.ts'
import { fixtures as textFixtures } from '../text/fixtures.ts'
import { configs } from './config.ts'
import { BenchmarkStats } from './types.ts'
import {
  appendBenchmarkHistory,
  createBenchmarkRecord,
  readHistoryRecords,
  writeLatestJson,
} from './utils.ts'

/**
 * Skip rules for non-deterministic functions.
 */
const SKIP_RULES = [
  /^random/i,
  /random$/i,
  /sleep$/i,
  /wait$/i,
  /debounce$/i,
  /throttle$/i,
  /getEnv$/i,
  /environmentprefix$/i,
  /sortByDate/i, // Comparator function, not standalone
]

const encoder = new TextEncoder()

function writeStdout(message: string): void {
  Deno.stdout.writeSync(encoder.encode(`${message}\n`))
}

function writeStderr(message: string): void {
  Deno.stderr.writeSync(encoder.encode(`${message}\n`))
}

/**
 * Check if a function should be skipped from benchmarking.
 */
function shouldSkip(functionName: string): { skip: boolean; reason?: string } {
  for (const rule of SKIP_RULES) {
    if (rule.test(functionName)) {
      return {
        skip: true,
        reason: `non-deterministic: matches skip pattern`,
      }
    }
  }
  return { skip: false }
}

/**
 * Get fixture factory for a workspace.
 */
function getFixtureFactory(
  workspace: string,
):
  | typeof textFixtures
  | typeof arrayFixtures
  | typeof mathFixtures
  | typeof functionFixtures
  | typeof objectFixtures
  | typeof dateFixtures {
  switch (workspace) {
    case 'text':
      return textFixtures
    case 'array':
      return arrayFixtures
    case 'math':
      return mathFixtures
    case 'function':
      return functionFixtures
    case 'object':
      return objectFixtures
    case 'date':
      return dateFixtures
    default:
      throw new Error(`Unknown workspace: ${workspace}`)
  }
}

/**
 * Run a single benchmark function and record stats.
 */
async function runBenchmark(
  name: string,
  fn: () => void,
  canonicalName: string | undefined,
  fixtureSize: 'small' | 'medium' | 'large',
  workspace: string,
): Promise<ReturnType<typeof createBenchmarkRecord>> {
  const warmup = 1_000
  const time = 2_000

  // Warm up
  const warmupStart = performance.now()
  while (performance.now() - warmupStart < warmup) {
    fn()
  }

  // Actual benchmark
  const measurements: number[] = []
  const benchStart = performance.now()
  let iterations = 0

  while (performance.now() - benchStart < time) {
    const start = performance.now()
    fn()
    const duration = performance.now() - start
    measurements.push(duration)
    iterations++
  }

  // Calculate stats (in nanoseconds for compatibility)
  const ns = measurements.map((ms) => ms * 1_000_000)
  ns.sort((a, b) => a - b)

  let min = ns[0]
  let max = ns[0]
  for (const n of ns) {
    if (n < min) min = n
    if (n > max) max = n
  }

  const stats: BenchmarkStats = {
    n: iterations,
    min,
    max,
    average: ns.reduce((a, b) => a + b, 0) / ns.length,
    p75: ns[Math.floor(ns.length * 0.75)],
    p99: ns[Math.floor(ns.length * 0.99)],
  }

  // Create and append record
  const record = createBenchmarkRecord(
    workspace,
    name,
    canonicalName || null,
    fixtureSize,
    stats,
    false,
  )

  await appendBenchmarkHistory(record)

  writeStdout(
    `✓ ${workspace}/${name} - ${
      stats.average.toFixed(2)
    }ns avg (${iterations} iterations)`,
  )

  return record
}

/**
 * #29 — Validate that every workspace listed in configs has a fixtures.ts file.
 * Throws on startup if any workspace is missing it.
 */
function validateFixtures(): void {
  const missing: string[] = []
  for (const config of configs) {
    try {
      Deno.statSync(`./${config.workspace}/fixtures.ts`)
    } catch {
      missing.push(config.workspace)
    }
  }
  if (missing.length > 0) {
    const paths = missing.map((w) => `./${w}/fixtures.ts`).join('\n  ')
    throw new Error(
      `Missing fixture factories — benchmark run aborted.\n  Expected files:\n  ${paths}`,
    )
  }
}

/**
 * #27 — Compare current run results against baseline records for the same
 * (workspace, functionName, fixtureSize) key. Returns a list of regressions
 * with percent change when the current average exceeds the baseline average
 * by more than `thresholdPct` (default 15%).
 */
function detectRegressions(
  currentRecords: Array<
    {
      workspace: string
      functionName: string
      fixtureSize: string
      stats?: BenchmarkStats
    }
  >,
  baselineRecords: Array<
    {
      workspace: string
      functionName: string
      fixtureSize: string
      stats?: BenchmarkStats
    }
  >,
  thresholdPct: number,
): Array<
  { key: string; baselineAvg: number; currentAvg: number; changePct: number }
> {
  // Build lookup of most-recent baseline entry per key
  const baselineMap = new Map<string, number>()
  for (const rec of baselineRecords) {
    if (rec.stats === undefined) continue
    const key = `${rec.workspace}/${rec.functionName}/${rec.fixtureSize}`
    // Later records override earlier ones → last wins = most recent
    baselineMap.set(key, rec.stats.average)
  }

  const regressions: Array<
    { key: string; baselineAvg: number; currentAvg: number; changePct: number }
  > = []
  for (const rec of currentRecords) {
    if (rec.stats === undefined) continue
    const key = `${rec.workspace}/${rec.functionName}/${rec.fixtureSize}`
    const baselineAvg = baselineMap.get(key)
    if (baselineAvg === undefined) continue
    const changePct = ((rec.stats.average - baselineAvg) / baselineAvg) * 100
    if (changePct > thresholdPct) {
      regressions.push({
        key,
        baselineAvg,
        currentAvg: rec.stats.average,
        changePct,
      })
    }
  }
  return regressions
}

/**
 * Resolve a git ref to a commit hash.
 */
function resolveGitRef(ref: string): string {
  try {
    const cmd = new Deno.Command('git', {
      args: ['rev-parse', ref],
      stdout: 'piped',
      stderr: 'piped',
    })
    const proc = cmd.outputSync()
    return new TextDecoder().decode(proc.stdout).trim() || ref
  } catch {
    return ref
  }
}

/**
 * Main benchmark runner - process all configs and benchmark each function.
 */
async function main(): Promise<void> {
  // Parse command-line arguments
  const args = Deno.args
  let targetWorkspace: string | undefined
  let baselineRef: string | undefined
  let regressionThresholdPct = 15

  for (const arg of args) {
    if (arg.startsWith('--workspace=')) {
      targetWorkspace = arg.split('=')[1]
    } else if (arg.startsWith('--baseline=')) {
      baselineRef = arg.split('=')[1]
    } else if (arg.startsWith('--threshold=')) {
      regressionThresholdPct = Number(arg.split('=')[1])
    }
  }

  // Also check BENCH_THRESHOLD env var
  const envThreshold = Deno.env.get('BENCH_THRESHOLD')
  if (envThreshold) regressionThresholdPct = Number(envThreshold)

  // #29 — Fail startup if any workspace is missing its fixture factory
  validateFixtures()

  writeStdout('Starting benchmark run...\n')

  const runRecords: ReturnType<typeof createBenchmarkRecord>[] = []

  for (const config of configs) {
    // Skip if workspace filter is specified and doesn't match
    if (targetWorkspace && config.workspace !== targetWorkspace) {
      continue
    }

    writeStdout(`Running ${config.workspace} workspace...`)

    const fixtureFactory = getFixtureFactory(config.workspace)
    let caseCount = 0

    for (const benchCase of config.cases) {
      const fixtureData = fixtureFactory[benchCase.fixtureSize]()

      // Determine if function should be skipped
      const skipCheck = shouldSkip(benchCase.name)
      if (skipCheck.skip) {
        const record = createBenchmarkRecord(
          config.workspace,
          benchCase.name,
          benchCase.canonicalName || null,
          benchCase.fixtureSize,
          undefined,
          true,
          skipCheck.reason,
        )
        await appendBenchmarkHistory(record)
        runRecords.push(record)
        writeStdout(
          `  ⊘ ${benchCase.name} - skipped (${skipCheck.reason})`,
        )
        caseCount++
        continue
      }

      // Try to import and run the function
      try {
        const module = await import(
          `../${config.workspace}/${benchCase.importPath}`
        )
        const fn = module[benchCase.name]

        if (typeof fn !== 'function') {
          // Function not exported or is a type
          const record = createBenchmarkRecord(
            config.workspace,
            benchCase.name,
            benchCase.canonicalName || null,
            benchCase.fixtureSize,
            undefined,
            true,
            'not a runtime function',
          )
          await appendBenchmarkHistory(record)
          runRecords.push(record)
          writeStdout(`  ⊘ ${benchCase.name} - not a runtime function`)
          caseCount++
          continue
        }

        // Create benchmark function — use explicit args() if provided, else pass fixture
        let benchFn: () => void

        if (benchCase.args) {
          const argList = benchCase.args()
          benchFn = () => fn(...argList)
        } else {
          benchFn = () => fn(fixtureData)
        }

        const record = await runBenchmark(
          benchCase.name,
          benchFn,
          benchCase.canonicalName,
          benchCase.fixtureSize,
          config.workspace,
        )
        runRecords.push(record)
        caseCount++
      } catch (error: unknown) {
        // Failed to import
        const message = error instanceof Error ? error.message : String(error)
        writeStdout(`  ✗ ${benchCase.name} - import error: ${message}`)
        caseCount++
      }
    }

    writeStdout(`  Completed ${caseCount} cases\n`)
  }

  // #28 — Write latest.json summary
  await writeLatestJson(runRecords)
  writeStdout('✓ Benchmarks complete.')
  writeStdout('  history → benchmarks/history.jsonl')
  writeStdout('  summary → benchmarks/latest.json')

  // #27 — Regression detection when --baseline is supplied
  if (baselineRef === undefined) {
    return
  }
  const resolvedRef = resolveGitRef(baselineRef)
  const baselineRecords = readHistoryRecords(resolvedRef)

  if (baselineRecords.length === 0) {
    writeStderr(
      `\n⚠  No history records found for baseline ref "${resolvedRef}".`,
    )
    writeStderr(
      '   Run benchmarks on that commit first, then commit benchmarks/history.jsonl.',
    )
  } else {
    const regressions = detectRegressions(
      runRecords,
      baselineRecords,
      regressionThresholdPct,
    )

    if (regressions.length === 0) {
      writeStdout(
        `\n✓ No regressions vs ${baselineRef} (threshold: +${regressionThresholdPct}%)`,
      )
    } else {
      writeStderr(
        `\n✗ ${regressions.length} regression(s) vs ${baselineRef} (threshold: +${regressionThresholdPct}%):\n`,
      )
      for (const r of regressions) {
        writeStderr(
          `  ${r.key}: ${r.baselineAvg.toFixed(2)}ns → ${
            r.currentAvg.toFixed(2)
          }ns  (+${r.changePct.toFixed(1)}%)`,
        )
      }
      Deno.exit(1)
    }
  }
}

if (import.meta.main) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error)
    writeStderr(message)
    Deno.exit(1)
  })
}
