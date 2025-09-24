import type { ObjectOfType } from '@edouardmisset/type'

/** Creates a function that selects a specific key's value from a given object. */
export function createSelectBy<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(key: Key): (object_: Object_) => Object_[Key] {
  return (object_) => object_[key]
}

/** Alias for {@link createSelectBy}. */
export const buildSelectBy: typeof createSelectBy = createSelectBy
