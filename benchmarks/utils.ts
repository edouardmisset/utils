/**
 * Benchmark utilities for collecting metadata and managing history.
 */

import { BenchmarkRecord, BenchmarkStats } from './types.ts'

/**
 * Get current git commit hash.
 */
export function getGitCommit(): string {
  try {
    const cmd = new Deno.Command('git', {
      args: ['rev-parse', 'HEAD'],
      stdout: 'piped',
      stderr: 'piped',
    })
    const proc = cmd.outputSync()
    const output = new TextDecoder().decode(proc.stdout).trim()
    return output || 'unknown'
  } catch {
    return 'unknown'
  }
}

/**
 * Get Deno version.
 */
export function getDenoVersion(): string {
  return Deno.version.deno
}

/**
 * Get CPU model name from /proc/cpuinfo (Linux) or system_profiler (macOS).
 */
export function getCpuModel(): string | null {
  try {
    if (Deno.build.os === 'linux') {
      const content = Deno.readTextFileSync('/proc/cpuinfo')
      const match = content.match(/model name\s*:\s*(.+?)$/m)
      return match ? match[1] : null
    } else if (Deno.build.os === 'darwin') {
      const cmd = new Deno.Command('system_profiler', {
        args: ['SPHardwareDataType'],
        stdout: 'piped',
      })
      const proc = cmd.outputSync()
      const output = new TextDecoder().decode(proc.stdout)
      const match = output.match(/Processor Name:\s*(.+?)$/m)
      return match ? match[1] : null
    }
  } catch {
    // Ignore errors
  }
  return null
}

/**
 * Get package version from deno.json.
 */
export function getPackageVersion(): string {
  try {
    const denoJson = JSON.parse(Deno.readTextFileSync('./deno.json'))
    return denoJson.version || 'unknown'
  } catch {
    return 'unknown'
  }
}

/**
 * Create a benchmark record with metadata.
 */
export function createBenchmarkRecord(
  workspace: string,
  functionName: string,
  canonicalName: string | null,
  fixtureSize: 'small' | 'medium' | 'large',
  stats?: BenchmarkStats,
  skipped?: boolean,
  skipReason?: string,
): BenchmarkRecord {
  const record: BenchmarkRecord = {
    workspace,
    functionName,
    canonicalName,
    fixtureSize,
    timestamp: new Date().toISOString(),
    gitCommit: getGitCommit(),
    denoVersion: getDenoVersion(),
    benchmarkSchemaVersion: '1.0.0',
    packageVersion: getPackageVersion(),
    os: Deno.build.os,
    arch: Deno.build.arch,
    cpuModel: getCpuModel(),
    skipped: skipped ?? false,
  }

  if (skipReason !== undefined) record.skipReason = skipReason
  if (stats !== undefined) record.stats = stats

  return record
}

/**
 * Append a benchmark record to history.jsonl.
 */
export async function appendBenchmarkHistory(
  record: BenchmarkRecord,
): Promise<void> {
  const historyPath = './benchmarks/history.jsonl'
  const line = JSON.stringify(record) + '\n'

  try {
    await Deno.mkdir('./benchmarks', { recursive: true })
  } catch {
    // Directory may already exist
  }

  try {
    await Deno.open(historyPath, { read: true }).then((f) => f.close())
    // File exists, append to it
    await Deno.writeTextFile(historyPath, line, { append: true })
  } catch {
    // File doesn't exist, create it
    await Deno.writeTextFile(historyPath, line)
  }
}

/**
 * Write a latest.json summary file from the current run's records.
 */
export async function writeLatestJson(
  records: BenchmarkRecord[],
): Promise<void> {
  const latestPath = './benchmarks/latest.json'
  const summary = {
    timestamp: new Date().toISOString(),
    gitCommit: records[0]?.gitCommit ?? 'unknown',
    denoVersion: records[0]?.denoVersion ?? 'unknown',
    benchmarkSchemaVersion: records[0]?.benchmarkSchemaVersion ?? '1.0.0',
    results: records.map((r) => ({
      workspace: r.workspace,
      functionName: r.functionName,
      canonicalName: r.canonicalName,
      fixtureSize: r.fixtureSize,
      skipped: r.skipped,
      skipReason: r.skipReason,
      stats: r.stats,
    })),
  }
  await Deno.mkdir('./benchmarks', { recursive: true })
  await Deno.writeTextFile(latestPath, JSON.stringify(summary, null, 2) + '\n')
}

/**
 * Read all history records, optionally filtered by git commit.
 */
export function readHistoryRecords(gitCommit?: string): BenchmarkRecord[] {
  const historyPath = './benchmarks/history.jsonl'
  try {
    const content = Deno.readTextFileSync(historyPath)
    const records = content
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => JSON.parse(line) as BenchmarkRecord)
    if (gitCommit !== undefined) {
      return records.filter((r) => r.gitCommit === gitCommit)
    }
    return records
  } catch {
    return []
  }
}

/**
 * Extract Deno.bench stats from a benchmark result.
 * Deno returns stats after running each benchmark.
 */
export function extractStats(
  benchResult: {
    runs: number
    min: number
    max: number
    p75?: number
    p99?: number
    avg: number
  },
): BenchmarkStats {
  return {
    n: benchResult.runs,
    min: benchResult.min,
    max: benchResult.max,
    p75: benchResult.p75 ?? benchResult.avg,
    p99: benchResult.p99 ?? benchResult.avg,
    average: benchResult.avg,
  }
}
