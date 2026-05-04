import { mapObject } from './map-object.ts'
import { mapObjectFixture } from './map-object.fixture.ts'

Deno.bench('mapObject', () => {
  mapObject(mapObjectFixture, (v) => v * 2)
})
