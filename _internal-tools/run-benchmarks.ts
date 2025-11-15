// deno-lint-ignore-file no-console
/**
 * Benchmark runner that executes all benchmark files and saves results to history
 */

import { join } from '@std/path'
import { ensureDir, exists } from '@std/fs'

interface BenchmarkResult {
  name: string
  measuredRunsAvgMs: number
  measuredRunsMs: number[]
  totalMs: number
  iterationsPerSec: number
  min: number
  max: number
  p75: number
  p99: number
  p995: number
}

interface BenchmarkHistory {
  timestamp: string
  denoVersion: string
  v8Version: string
  typescriptVersion: string
  os: string
  arch: string
  cpuModel: string
  cpuCores: number
  memoryTotal: number
  packages: Record<string, string>
  benchmarks: Record<string, BenchmarkResult[]>
}

const WORKSPACES = [
  'array',
  'date',
  'function',
  'math',
  'object',
  'text',
  'type',
]
const HISTORY_DIR = join(Deno.cwd(), '.benchmark-history')
const HISTORY_FILE = join(HISTORY_DIR, 'history.json')

/**
 * Get system information
 */
function getSystemInfo(): {
  denoVersion: string
  v8Version: string
  typescriptVersion: string
  os: string
  arch: string
  cpuModel: string
  cpuCores: number
  memoryTotal: number
} {
  const versionOutput = new Deno.Command('deno', {
    args: ['--version'],
  }).outputSync()

  const versionText = new TextDecoder().decode(versionOutput.stdout)
  const lines = versionText.split('\n')

  const denoVersion = lines[0]?.match(/deno (\S+)/)?.[1] || 'unknown'
  const v8Version = lines[1]?.match(/v8 (\S+)/)?.[1] || 'unknown'
  const tsVersion = lines[2]?.match(/typescript (\S+)/)?.[1] || 'unknown'

  return {
    denoVersion,
    v8Version,
    typescriptVersion: tsVersion,
    os: Deno.build.os,
    arch: Deno.build.arch,
    cpuModel: 'N/A', // Not easily accessible in Deno
    cpuCores: navigator.hardwareConcurrency || 0,
    memoryTotal: 0, // Not easily accessible in Deno
  }
}

/**
 * Get package versions from workspace deno.json files
 */
async function getPackageVersions(): Promise<Record<string, string>> {
  const versions: Record<string, string> = {}

  for (const workspace of WORKSPACES) {
    try {
      const denoJsonPath = join(Deno.cwd(), workspace, 'deno.json')
      const content = await Deno.readTextFile(denoJsonPath)
      const json = JSON.parse(content)
      versions[workspace] = json.version || 'unknown'
    } catch {
      versions[workspace] = 'unknown'
    }
  }

  return versions
}

/**
 * Run benchmarks for a specific workspace
 */
async function runWorkspaceBenchmarks(
  workspace: string,
): Promise<Record<string, BenchmarkResult[]>> {
  const workspacePath = join(Deno.cwd(), workspace)
  const results: Record<string, BenchmarkResult[]> = {}

  // Find all .bench.ts files
  const benchFiles: string[] = []
  for await (const entry of Deno.readDir(workspacePath)) {
    if (entry.isFile && entry.name.endsWith('.bench.ts')) {
      benchFiles.push(join(workspacePath, entry.name))
    }
  }

  if (benchFiles.length === 0) {
    return results
  }

  // Run benchmarks for each file
  for (const benchFile of benchFiles) {
    const functionName = benchFile.split('/').pop()?.replace('.bench.ts', '') ||
      'unknown'

    try {
      const cmd = new Deno.Command('deno', {
        args: ['bench', '--json', benchFile],
        stdout: 'piped',
        stderr: 'piped',
      })

      const output = await cmd.output()

      if (output.success) {
        const text = new TextDecoder().decode(output.stdout)

        const benchResults: BenchmarkResult[] = []

        try {
          const json = JSON.parse(text)
          if (json.benches && Array.isArray(json.benches)) {
            for (const bench of json.benches) {
              if (
                bench.results && Array.isArray(bench.results) &&
                bench.results.length > 0
              ) {
                const result = bench.results[0]
                if (result.ok) {
                  const okData = result.ok
                  // Convert nanoseconds to milliseconds
                  const avgMs = okData.avg / 1_000_000
                  benchResults.push({
                    name: bench.name || functionName,
                    measuredRunsAvgMs: avgMs,
                    measuredRunsMs: [],
                    totalMs: (okData.n * okData.avg) / 1_000_000,
                    iterationsPerSec: avgMs ? 1000 / avgMs : 0,
                    min: okData.min / 1_000_000,
                    max: okData.max / 1_000_000,
                    p75: okData.p75 / 1_000_000,
                    p99: okData.p99 / 1_000_000,
                    p995: okData.p995 / 1_000_000,
                  })
                }
              }
            }
          }
        } catch (error) {
          console.error(
            `Error parsing benchmark output for ${benchFile}:`,
            error,
          )
        }

        if (benchResults.length > 0) {
          results[`${workspace}/${functionName}`] = benchResults
        }
      }
    } catch (error) {
      console.error(`Error running benchmark ${benchFile}:`, error)
    }
  }

  return results
}

/**
 * Load existing history
 */
async function loadHistory(): Promise<BenchmarkHistory[]> {
  try {
    if (await exists(HISTORY_FILE)) {
      const content = await Deno.readTextFile(HISTORY_FILE)
      return JSON.parse(content)
    }
  } catch (error) {
    console.warn('Could not load history:', error)
  }
  return []
}

/**
 * Save history
 */
async function saveHistory(history: BenchmarkHistory[]): Promise<void> {
  await ensureDir(HISTORY_DIR)
  await Deno.writeTextFile(
    HISTORY_FILE,
    JSON.stringify(history, null, 2),
  )
}

/**
 * Main function
 */
async function main(): Promise<void> {
  console.log('🏃 Running benchmarks...\n')

  const systemInfo = getSystemInfo()
  const packages = await getPackageVersions()

  console.log('System Information:')
  console.log(`  Deno: ${systemInfo.denoVersion}`)
  console.log(`  V8: ${systemInfo.v8Version}`)
  console.log(`  TypeScript: ${systemInfo.typescriptVersion}`)
  console.log(`  OS: ${systemInfo.os}`)
  console.log(`  Arch: ${systemInfo.arch}`)
  console.log(`  CPU Cores: ${systemInfo.cpuCores}\n`)

  // Run benchmarks for all workspaces
  const allBenchmarks: Record<string, BenchmarkResult[]> = {}

  for (const workspace of WORKSPACES) {
    console.log(`Running benchmarks for ${workspace}...`)
    const results = await runWorkspaceBenchmarks(workspace)
    Object.assign(allBenchmarks, results)
  }

  const totalBenchmarks = Object.keys(allBenchmarks).length
  console.log(`\n✅ Completed ${totalBenchmarks} benchmark(s)\n`)

  // Create history entry
  const historyEntry: BenchmarkHistory = {
    timestamp: new Date().toISOString(),
    denoVersion: systemInfo.denoVersion,
    v8Version: systemInfo.v8Version,
    typescriptVersion: systemInfo.typescriptVersion,
    os: systemInfo.os,
    arch: systemInfo.arch,
    cpuModel: systemInfo.cpuModel,
    cpuCores: systemInfo.cpuCores,
    memoryTotal: systemInfo.memoryTotal,
    packages,
    benchmarks: allBenchmarks,
  }

  // Load and update history
  const history = await loadHistory()
  history.push(historyEntry)

  // Keep only last 100 entries
  if (history.length > 100) {
    history.splice(0, history.length - 100)
  }

  await saveHistory(history)

  console.log(`📊 Results saved to ${HISTORY_FILE}`)

  // Display summary
  if (totalBenchmarks > 0) {
    console.log('\nBenchmark Summary:')
    for (const [name, results] of Object.entries(allBenchmarks)) {
      if (results.length > 0) {
        const avgTime = results[0].measuredRunsAvgMs.toFixed(4)
        const opsPerSec = results[0].iterationsPerSec.toFixed(0)
        console.log(`  ${name}: ${avgTime}ms avg (${opsPerSec} ops/sec)`)
      }
    }
  }
}

if (import.meta.main) {
  await main()
}
