# Benchmarking System

This repository includes a comprehensive benchmarking system to track and
monitor the performance of all utility functions across workspaces.

## Overview

The benchmark system consists of:

1. **Benchmark files** (`.bench.ts`) - Individual benchmark files for each
   function
2. **Benchmark runner** - Automated tool to run all benchmarks and collect
   results
3. **Benchmark history** - JSON file tracking performance metrics over time
4. **Generator tool** - Script to generate benchmark file templates

## Quick Start

### Running Benchmarks

To run all benchmarks and save results to history:

```bash
deno task bench
```

Or using the full command:

```bash
deno task bench:run
```

### Generating Benchmark Templates

If you've added new functions and need benchmark templates:

```bash
deno task bench:generate
```

This will create `.bench.ts` files for any functions that don't have benchmarks
yet.

## Benchmark File Structure

Each benchmark file follows this pattern:

```typescript
/**
 * Benchmark for functionName function
 */

import { functionName } from './function-name.ts'

// Test data
const testData = {/* ... */}

Deno.bench('functionName - basic case', () => {
  functionName(testData)
})

Deno.bench('functionName - edge case', () => {
  functionName(edgeCaseData)
})
```

### Best Practices for Writing Benchmarks

1. **Use realistic data** - Test with data that represents real-world usage
2. **Test different scales** - Small, medium, and large datasets
3. **Cover edge cases** - Empty inputs, extreme values, etc.
4. **Be descriptive** - Use clear benchmark names that explain what's being
   tested
5. **Avoid side effects** - Benchmarks should be pure and repeatable

## Benchmark History

The benchmark history is stored in `.benchmark-history/history.json`
(gitignored).

### History Entry Structure

Each benchmark run creates a history entry with:

```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "denoVersion": "2.5.6",
  "v8Version": "14.0.365.5",
  "typescriptVersion": "5.9.2",
  "os": "linux",
  "arch": "x86_64",
  "cpuModel": "N/A",
  "cpuCores": 4,
  "memoryTotal": 0,
  "packages": {
    "array": "5.0.0",
    "date": "5.0.0",
    ...
  },
  "benchmarks": {
    "array/group-by": [
      {
        "name": "groupBy - small dataset (5 items)",
        "measuredRunsAvgMs": 0.0023,
        "iterationsPerSec": 434782,
        "min": 0.0020,
        "max": 0.0030,
        "p75": 0.0024,
        "p99": 0.0028,
        "p995": 0.0029
      }
    ]
  }
}
```

### Metrics Tracked

- **measuredRunsAvgMs**: Average time per operation in milliseconds
- **iterationsPerSec**: Number of operations per second
- **min/max**: Minimum and maximum execution times
- **p75/p99/p995**: Percentile metrics for consistency analysis

## Workspaces

Benchmarks are organized by workspace:

- `array/` - Array manipulation functions
- `date/` - Date utilities
- `function/` - Function utilities
- `math/` - Mathematical operations
- `object/` - Object utilities
- `text/` - Text/string processing
- `type/` - Type utilities

## Running Individual Benchmarks

To run benchmarks for a specific file:

```bash
deno bench array/group-by.bench.ts
```

To run all benchmarks in a workspace:

```bash
deno bench array/*.bench.ts
```

## Continuous Integration

The benchmark system can be integrated into CI/CD pipelines to:

1. Track performance over time
2. Detect performance regressions
3. Compare performance across different versions
4. Monitor the impact of code changes

## Performance Regression Detection

To detect performance regressions, compare the latest benchmark results with
historical data:

1. Run benchmarks on the main branch
2. Run benchmarks on your feature branch
3. Compare the `measuredRunsAvgMs` values
4. Investigate any significant increases (>10% slower)

## Example Output

```
🏃 Running benchmarks...

System Information:
  Deno: 2.5.6
  V8: 14.0.365.5
  TypeScript: 5.9.2
  OS: linux
  Arch: x86_64
  CPU Cores: 4

Running benchmarks for array...
Running benchmarks for math...
Running benchmarks for text...

✅ Completed 12 benchmark(s)

📊 Results saved to .benchmark-history/history.json

Benchmark Summary:
  array/group-by: 0.0023ms avg (434782 ops/sec)
  array/sort-by: 0.0156ms avg (64102 ops/sec)
  math/sum: 0.0008ms avg (1250000 ops/sec)
  text/capitalize: 0.0003ms avg (3333333 ops/sec)
```

## Maintenance

- History is limited to the last 100 runs to keep file size manageable
- The `.benchmark-history` directory is gitignored
- Benchmark files are version-controlled alongside their source files
- Update benchmarks when function signatures or behavior changes

## Contributing

When adding new functions:

1. Run `deno task bench:generate` to create template benchmark files
2. Update the generated templates with appropriate test cases
3. Run `deno task bench` to verify benchmarks work
4. Commit the benchmark files with your changes

## Notes

- Benchmarks should be run on a quiet system for consistent results
- Results may vary across different hardware and OS
- Use benchmark trends over time rather than absolute values
- Consider running multiple times and averaging for critical performance tests
