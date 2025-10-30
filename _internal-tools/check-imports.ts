// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

import { green, yellow } from '@std/fmt/colors'
import importMap from '../import-map.json' with { type: 'json' }
import { getAllWorkspaceConfigs } from './deno-config.ts'

const imports = importMap?.imports
const workspaceConfigs = await getAllWorkspaceConfigs()

let failed = false

for (const { config } of workspaceConfigs) {
  const { name = '', version } = config
  const dependency = imports[name as keyof typeof imports]

  if (!dependency) {
    globalThis.console.warn(`No import map entry found for ${name}`)
    failed = true
    continue
  }
  const correctDependency = `jsr:${name}@^${version}`
  if (dependency !== correctDependency) {
    globalThis.console.warn(
      yellow(`Invalid import map entry for ${name}: ${dependency}`),
    )
    globalThis.console.warn(
      yellow(`Expected: ${correctDependency}`),
    )
    failed = true
  }
}

if (failed) {
  Deno.exit(1)
}

globalThis.console.log(green('✅ Valid import map'))
