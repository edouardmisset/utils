import { findAndUpdate } from './find-and-update.ts'
import { findAndUpdateFixture } from './find-and-update.fixture.ts'

Deno.bench('findAndUpdate', () => {
  findAndUpdate({
    array: findAndUpdateFixture,
    key: 'id',
    value: 1,
    updates: { name: 'Updated' },
  })
})
