// This module is browser compatible.

/**
 * Comprehensive utility functions for array manipulation, filtering, grouping,
 * and analysis.
 * Includes functions for counting, grouping, finding elements, sorting, and
 * statistical operations.
 * E.g. {@link groupBy}, {@link countBy}, {@link maxBy}, {@link randomItem}
 *
 * @example
 * ```ts
 * import { groupBy, countBy, maxBy, randomItem } from "jsr:@edouardmisset/array";
 * import { assertEquals } from "@std/assert";
 *
 * const users = [
 *   { name: 'Alice', age: 25, role: 'admin' },
 *   { name: 'Bob', age: 30, role: 'user' },
 *   { name: 'Carol', age: 25, role: 'user' }
 * ];
 *
 * //  groupBy function
 * const byRole = groupBy(users, 'role');
 * assertEquals(byRole.admin.length, 1);
 * assertEquals(byRole.user.length, 2);
 * assertEquals(byRole.admin[0].name, 'Alice');
 *
 * //  countBy function
 * const evenAges = countBy(users, (user) => user.age % 2 === 0);
 * assertEquals(evenAges, 1);
 *
 * //  maxBy function
 * const oldest = maxBy(users, 'age');
 * assertEquals(oldest?.name, 'Bob');
 * assertEquals(oldest?.age, 30);
 *
 * //  randomItem function (check it returns a valid result)
 * const randomResult = randomItem(users);
 * assertEquals(randomResult.error, undefined);
 * assertEquals(users.some(user => user === randomResult.data), true);
 * ```
 *
 * @module
 */

export * from './collection-key-by.ts'
export * from './count-by.ts'
export * from './filter-by-date.ts'
export * from './filter-by.ts'
export * from './find-by.ts'
export * from './frequency.ts'
export * from './group-by.ts'
export * from './max-by.ts'
export * from './min-by.ts'
export * from './random-item.ts'
export * from './random-sort.ts'
export * from './range.ts'
export * from './select-by.ts'
export * from './sets.ts'
export * from './sort-by.ts'
export * from './take.ts'
export * from './update-array.ts'

