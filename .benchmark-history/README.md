# Benchmark History

This directory stores the benchmark history in `history.json`. The file is
gitignored.

## Format

See `history.example.json` for the format. Each entry contains:

- Timestamp of the benchmark run
- System information (Deno, V8, TypeScript versions)
- Hardware details (OS, architecture, CPU cores)
- Package versions for each workspace
- Benchmark results for each function

## Usage

History is automatically managed by the benchmark runner:

```bash
deno task bench
```

The history file keeps the last 100 benchmark runs.
