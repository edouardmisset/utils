import { performanceCases } from './cases.ts'

for (const benchmark of performanceCases) {
  Deno.bench(benchmark.name, benchmark.run)
}
