const suiteFiles = ['cases.ts', 'performance.bench.ts']

function argument(name: string): string | undefined {
  const prefix = `--${name}=`
  return Deno.args.find((value) => value.startsWith(prefix))?.slice(
    prefix.length,
  )
}

async function installSuite(source: string, target: string): Promise<void> {
  await Deno.mkdir(`${target}/benchmarks`, { recursive: true })
  for (const file of suiteFiles) {
    await Deno.copyFile(
      `${source}/benchmarks/${file}`,
      `${target}/benchmarks/${file}`,
    )
  }
}

async function runBenchmark(
  checkout: string,
  outputDirectory: string,
  iteration: number,
): Promise<void> {
  const command = new Deno.Command(Deno.execPath(), {
    args: [
      'bench',
      '--config',
      `${checkout}/deno.json`,
      '--no-check',
      '--allow-env',
      '--seed=1',
      '--json',
      `${checkout}/benchmarks/performance.bench.ts`,
    ],
    stdout: 'piped',
    stderr: 'inherit',
  })
  const result = await command.output()
  if (!result.success) {
    throw new Error(`Benchmark failed for ${checkout} with code ${result.code}`)
  }
  await Deno.writeFile(`${outputDirectory}/${iteration}.json`, result.stdout)
}

async function main(): Promise<void> {
  const baseline = argument('baseline')
  const candidate = argument('candidate')
  const output = argument('output')
  const runs = Number(argument('runs') ?? '3')
  if (
    !baseline || !candidate || !output || !Number.isInteger(runs) || runs < 1
  ) {
    throw new Error(
      'Usage: run.ts --baseline=<checkout> --candidate=<checkout> --output=<directory> [--runs=3]',
    )
  }

  await installSuite(candidate, baseline)
  const baselineOutput = `${output}/baseline`
  const candidateOutput = `${output}/candidate`
  await Deno.mkdir(baselineOutput, { recursive: true })
  await Deno.mkdir(candidateOutput, { recursive: true })

  for (let iteration = 1; iteration <= runs; iteration++) {
    const order = iteration % 2 === 1
      ? [[baseline, baselineOutput], [candidate, candidateOutput]]
      : [[candidate, candidateOutput], [baseline, baselineOutput]]
    for (const [checkout, outputDirectory] of order) {
      await runBenchmark(checkout, outputDirectory, iteration)
    }
  }
}

if (import.meta.main) await main()
