import {
  canParse,
  format,
  increment,
  parse,
  ReleaseType,
} from 'jsr:@std/semver@0.223.0'

import denoJSON from '../deno.json' with { type: 'json' }

async function incrementVersion(releaseType: ReleaseType): Promise<void> {
  const currentVersion = denoJSON.version
  if (!canParse(currentVersion)) {
    throw new Error(`Invalid version: ${currentVersion}`)
  }
  const v = parse(currentVersion)

  const nextVersion = increment(v, releaseType)

  denoJSON.version = format(nextVersion)

  await Deno.writeTextFile('./deno.json', JSON.stringify(denoJSON))
}

const basicReleaseTypes = new Set<ReleaseType>(['major', 'minor', 'patch'])
const releaseTypeFromArg = Deno.args[0] as ReleaseType

if (!basicReleaseTypes.has(releaseTypeFromArg)) {
  console.error(
    `Invalid release type. Please provide one of the following: ${[...basicReleaseTypes].join(', ')
    }`,
  )
  Deno.exit(1)
}

await incrementVersion(releaseTypeFromArg).catch(error => console.error(error))

const f = new Deno.Command(Deno.execPath(), {
  args: ['fmt', 'deno.json'],
  stderr: 'piped',
})

try {
  const { stderr, success } = await f.output()
  const textDecoder = new TextDecoder()
  if (!success) {
    console.error(textDecoder.decode(stderr))
    Deno.exit(1)
  }
} catch (error) {
  console.error(error)
}
