# Utils Benchmarking Context

Defines the domain language for benchmark coverage and result tracking in this
repository.

## Language

**Benchmark Case**: One measurable benchmark unit for a specific exported
runtime function in a specific workspace. _Avoid_: Test case, scenario

**Benchmark Run**: A single execution session that evaluates multiple Benchmark
Cases and emits per-case results. _Avoid_: Build, test run

**Benchmark History Record**: An append-only entry describing one case result
(or skip) from one Benchmark Run, including metadata. _Avoid_: Snapshot, report
blob

**Skip Rule**: A deterministic rule that marks a function as skipped for
benchmarking when timing data would be unreliable. _Avoid_: Ignore list,
exception

## Relationships

- A **Benchmark Run** contains many **Benchmark History Records**.
- Each **Benchmark History Record** refers to exactly one **Benchmark Case**.
- A **Skip Rule** can mark a **Benchmark Case** as skipped in a **Benchmark
  Run**.
