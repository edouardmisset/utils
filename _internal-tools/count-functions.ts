#!/usr/bin/env -S deno run --allow-read

import { bold } from '@std/fmt/colors'
import { walk } from '@std/fs'

const ROOT_PATH = '.'

/**
 * Simple script to count functions in the utils repository.
 * Excludes _internal-tools directory and test files.
 */
async function countFunctions(): Promise<void> {
  let count = 0

  for await (
    const { name, path } of walk(ROOT_PATH, {
      exts: ['.ts'],
      skip: [/_internal-tools/, /coverage/, /docs/, /node_modules/, /\.git/],
    })
  ) {
    if (name.includes('.test.') || name === 'mod.ts') continue

    const content = await Deno.readTextFile(path)

    // Count export function declarations
    const functionMatches =
      content.match(/^export\s+(?:async\s+)?function\s+\w+/gm) || []
    count += functionMatches.length
  }

  globalThis.console.log(`Total number of functions: ${bold(String(count))}`)
}

if (import.meta.main) {
  await countFunctions()
}
