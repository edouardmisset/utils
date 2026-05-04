import { isDateInDuration } from './is-date-in-duration.ts'
import {
  isDateInDurationFixtureDate,
  isDateInDurationFixtureDuration,
  isDateInDurationFixtureReferenceDate,
} from './is-date-in-duration.fixture.ts'

Deno.bench('isDateInDuration', () => {
  isDateInDuration(isDateInDurationFixtureDate, {
    referenceDate: isDateInDurationFixtureReferenceDate,
    durationInMS: isDateInDurationFixtureDuration,
  })
})
