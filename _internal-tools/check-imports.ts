// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

import { green, yellow } from '@std/fmt/colors'
import { join } from '@std/path'
import denoJson from '../deno.json' with { type: 'json' }
import importMap from '../import-map.json' with { type: 'json' }

const imports = importMap.imports
const denoJsonList = Promise.all(
  denoJson.workspace.map((space) =>
    Deno.readTextFile(join(space, 'deno.json')).then(JSON.parse)
  ),
)

let failed = false

for (const denoJson of await denoJsonList) {
  const dependency = imports[denoJson.name as keyof typeof imports]

  if (!dependency) {
    globalThis.console.warn(`No import map entry found for ${denoJson.name}`)
    failed = true
    continue
  }
  const correctDependency = `jsr:${denoJson.name}@^${denoJson.version}`
  if (dependency !== correctDependency) {
    globalThis.console.warn(
      yellow(`Invalid import map entry for ${denoJson.name}: ${dependency}`),
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
