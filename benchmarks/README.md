# Performance regression gate

The benchmark suite imports production functions directly. It covers every
distinct runtime implementation exported by the root module; aliases share the
case for their canonical function. A test fails when a runtime export is added
without benchmark coverage. The current registry covers 112 runtime exports with
94 benchmark cases.

On pull requests, GitHub Actions invokes Deno entrypoints which install and run
the same suite three times against both the PR base SHA and the candidate SHA on
one runner. The comparator uses the median average time and fails when any
candidate benchmark is more than 10% slower.

Run the suite locally with:

```sh
deno bench --no-check --allow-env --seed=1 benchmarks/performance.bench.ts
```

The CI workflow uploads the raw Deno JSON files as an artifact and writes the
comparison table to the workflow summary. Deno currently marks `--json` as
unstable, so `benchmarks/compare.ts` may need updating when its schema changes.

The workflow alternates which revision runs first to reduce order and thermal
bias. Pinning Deno and the runner image plus comparing medians on the same
machine reduces noise, but a failed gate should still be confirmed by rerunning
the job before treating a result near the threshold as a regression.
