// deno-lint-ignore-file no-console
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

import { green } from 'jsr:@std/fmt/colors'
import { join } from 'jsr:@std/path'
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
    console.warn(`No import map entry found for ${denoJson.name}`)
    failed = true
    continue
  }
  const correctDependency = `jsr:${denoJson.name}@^${denoJson.version}`
  if (dependency !== correctDependency) {
    console.warn(
      `Invalid import map entry for ${denoJson.name}: ${dependency}`,
    )
    console.warn(
      `Expected: ${correctDependency}`,
    )
    failed = true
  }
}

if (failed) {
  Deno.exit(1)
}

console.log(green('Valid import map'))
