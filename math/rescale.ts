import { scale, type Rescale } from './scale.ts'
import type { Result } from '@edouardmisset/function'

/**
 * Scales a value from one range to a value between 0 and 1.
 */
export function rescale(parameters: Rescale): Result<number, Error> {
  const { value, minimum, maximum } = parameters
  return scale({
    inMinimum: minimum,
    inMaximum: maximum,
    value,
    outMinimum: 0,
    outMaximum: 1,
  })
}
