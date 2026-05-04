import { product } from './product.ts'
import { productFixture } from './product.fixture.ts'

Deno.bench('product', () => {
  product(productFixture)
})
