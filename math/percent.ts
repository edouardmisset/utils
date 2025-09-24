import { scale, type Rescale } from './scale.ts'
import type { Result } from '@edouardmisset/function'

/**
 * Scales a value from one range to another, outputting a percentage.
 */
export function percent(parameters: Rescale): Result<number, Error> {
  const { value, minimum, maximum } = parameters
  return scale({
    inMinimum: minimum,
    inMaximum: maximum,
    outMinimum: 0,
    outMaximum: 100,
    value,
  })
}
