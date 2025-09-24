import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Applies a transformation function to values at a specified key of each object in an array.
 */
export function selectAndTransform<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
  Result,
>(
  array: Object_[],
  key: Key,
  transform: (value: Object_[Key]) => Result,
): Result[] {
  return array.flatMap(
    (item) => (Object.hasOwn(item, key) ? [transform(item[key])] : []),
  )
}

/** Alias for {@link selectAndTransform}. */
export const pluckAndMap: typeof selectAndTransform = selectAndTransform
