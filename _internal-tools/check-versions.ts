import { blue, bold, green, red } from '@std/fmt/colors'
import { greaterThan, parse } from '@std/semver'
import { getAllWorkspaceConfigs } from './deno-config.ts'

/**
 * Fetch the latest version of a package from JSR
 */
async function getJSRLatestVersion(
  packageName: string,
): Promise<string | undefined> {
  if (packageName === '') return
  try {
    const url = `https://jsr.io/${packageName}/meta.json`
    const response = await fetch(url)
    if (!response.ok) return
    const data = await response.json()
    return data?.latest
  } catch {
    return
  }
}

async function main(): Promise<void> {
  const workspaceConfigs = await getAllWorkspaceConfigs()

  // Fetch all JSR versions in parallel
  const results = await Promise.all(
    workspaceConfigs.map(async ({ config }) => ({
      name: config?.name ?? '',
      local: config?.version ?? undefined,
      jsr: await getJSRLatestVersion(config?.name ?? ''),
    })),
  )

  // Process results
  const processedResults = results.map((result) => {
    if (!result.jsr) {
      return { ...result, status: '❓ Not found', hasIssue: false }
    }
    if (!result.local) {
      return { ...result, status: '❓ Not found', hasIssue: false }
    }

    try {
      const localSemver = parse(result.local)
      const jsrSemver = parse(result.jsr)

      if (greaterThan(localSemver, jsrSemver)) {
        return { ...result, status: '✅ Ahead', hasIssue: false }
      }
      if (greaterThan(jsrSemver, localSemver)) {
        return { ...result, status: '⚠️  Behind', hasIssue: true }
      }
      return { ...result, status: '✅ Up to date', hasIssue: false }
    } catch {
      return { ...result, status: '❌ Error', hasIssue: true }
    }
  })

  // Display table
  globalThis.console.log('\n📊 Version Comparison:\n')
  globalThis.console.log(
    blue(
      bold(
        `${'Package'.padEnd(40) + 'JSR'.padEnd(12) + 'Local'.padEnd(12)}Status`,
      ),
    ),
  )
  globalThis.console.log('─'.repeat(80))

  for (
    const { hasIssue, name = '', local = '', status, jsr } of processedResults
  ) {
    const color = hasIssue ? red : green
    globalThis.console.log(
      name.padEnd(40) +
        (jsr ?? 'N/A').padEnd(12) +
        local.padEnd(12) +
        color(status),
    )
  }

  const hasIssues = processedResults.some((r) => r.hasIssue)
  if (hasIssues) {
    Deno.exit(1)
  }
}

if (import.meta.main) await main()
