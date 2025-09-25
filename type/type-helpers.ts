/**
 * It represents an object type with string keys and values of type `T`. It is a
 * shorthand for `Record<string, T>`. This is a more explicit way to represent an
 * object type.
 */
// deno-lint-ignore no-explicit-any
export type ObjectOfType<Value = any, Key extends string | number = string> =
  Record<Key, Value>

/**
 * It represents a primitive type in TypeScript. It is a union of `string`,
 * `number`, `boolean`, `null`, and `undefined`.
 */
export type Value = string | number | boolean | null | undefined
/**
 * It represents a primitive type in TypeScript that is not `null` or
 * `undefined`. It is a union of `string`, `number`, `boolean`, `symbol` (and
 * `bigint` if the target is ES2020 or later ).
 */
export type DefinedValue = string | number | boolean | bigint | symbol

/**
 * It represents a primitive type in JavaScript. It is a union of `string`,
 * `number`, `boolean`, `bigint`, `symbol`, `undefined`, and `null`.
 */
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null

/** A type representing a range with a value, minimum, and maximum. */
export type ValueAndRange = {
  /** The value to be checked against the range */
  value: number
  /** The minimum value of the range */
  minimum: number
  /** The maximum value of the range */
  maximum: number
}

/** A type representing a callback function with a delay. */
export type CallbackAndDelay = {
  /** The function to be called after the delay */
  callback: AnyVoidFunction
  /** The delay in milliseconds before invoking the callback */
  delay: number
}

/**
 * Type is a number representing the duration in milliseconds.
 */
export type Milliseconds = number

/**
 * Type is a number representing an integer.
 */
export type Integer = number

/**
 * Constructs a type by overriding some properties of an original type with
 * properties from another type.
 *
 * This type helper uses the `Omit` and `keyof` utility types from TypeScript.
 * It first omits the keys of the `OverrideType` from the `OriginalType`, and
 * then combines the result with the `OverrideType`.
 * This means that properties in the `OverrideType` will override properties in
 * the `OriginalType`.
 *
 * @template OriginalType The original type.
 * @template OverrideType The type that should override properties in the
 * original type.
 *
 * @example
 * ```typescript
 * type Person = {
 *   name: string
 *   age: number
 * }
 *
 * type Employee = {
 *   age: string
 *   company: string
 * }
 *
 * type EmployeePerson = Override<Person, Employee>
 * // Equivalent to: { name: string; age: string; company: string; }
 * ```
 */
export type Override<OriginalType, OverrideType> =
  & Omit<
    OriginalType,
    keyof OverrideType
  >
  & OverrideType

/**
 * Constructs a type by making some properties of an existing type required.
 *
 * This type helper uses the `Omit`, `Pick`, and `Required` utility types from
 * TypeScript.
 * It first omits the specified keys from the original type, and then makes
 * those keys required.
 *
 * @template Object_ The original type.
 * @template Key The keys of the properties that should be made required. It
 * extends `keyof Object_`, which means it can be any key of `Object_`. The default
 * value is `keyof Object_`, which means all keys of `Object_`.
 *
 * @example
 * ```typescript
 * type Person = {
 *   name: string
 *   age?: number
 * }
 *
 * type PersonWithRequiredAge = RequireKey<Person, 'age'>
 * // Equivalent to: { name: string; age: number; }
 *
 * type Employee = {
 *   name: string
 *   age?: number
 *   company?: string
 * }
 *
 * type EmployeeWithRequiredAgeAndCompany = RequireKey<Employee, 'age' | 'company'>
 * // Equivalent to: { name: string; age: number; company: string; }
 * ```
 */
export type RequireKey<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_ = keyof Object_,
> = Omit<Object_, Key> & Required<Pick<Object_, Key>>

/**
 * Constructs a type by making some properties of an existing type optional.
 *
 * This type helper uses the `Omit` and `Partial` utility types from TypeScript.
 * It first omits the specified keys from the original type, and then makes
 * those keys optional.
 *
 * @template Object_ The original type.
 * @template Key The keys of the properties that should be made optional. It
 * extends `keyof Object_`, which means it can be any key of `Object_`. The default
 * value is `keyof Object_`, which means all keys of `Object_`.
 *
 * @example
 * ```typescript
 * type Person = {
 *   name: string
 *   age: number
 * }
 *
 * type PersonWithOptionalAge = OptionalKey<Person, 'age'>
 * // Equivalent to: { name: string; age?: number; }
 *
 * type Employee = {
 *   name: string
 *   age: number
 *   company: string
 * }
 *
 * type EmployeeWithOptionalAgeAndCompany = OptionalKey<Employee, 'age' | 'company'>
 * // Equivalent to: { name: string; age?: number; company?: string; }
 * ```
 */
export type OptionalKey<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_ = keyof Object_,
> = Omit<Object_, Key> & Partial<Pick<Object_, Key>>

/**
 * Constructs a type by excluding `null` from the possible values of some
 * properties of an existing type.
 *
 * This type helper uses the `Exclude` utility type from TypeScript.
 * It iterates over the keys of the original type, and for each key, it creates
 * a new type that excludes `null` from the possible values of that property.
 *
 * @template Object_ The original type. It extends `object`, which means it can be
 * any object type.
 * @template Key The keys of the properties that should exclude `null`. It
 * extends `keyof Object_`, which means it can be any key of `Object_`. The default
 * value is `keyof Object_`, which means all keys of `Object_`.
 *
 * @example
 * ```typescript
 * type Person = {
 *   name: string | null
 *   age: number | null
 * }
 *
 * type PersonWithoutNull = NotNullValues<Person>
 * // Equivalent to: { name: string; age: number; }
 *
 * type Employee = {
 *   name: string | null
 *   age: number | null
 *   company: string | null
 * }
 *
 * type EmployeeWithoutNull = NotNullValues<Employee, 'age' | 'company'>
 * // Equivalent to: { name: string | null; age: number; company: string; }
 * ```
 */
export type NotNullValues<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_ = keyof Object_,
> = {
  [P in Key]: Exclude<Object_[P], null>
}

/**
 * Constructs a type by excluding `null` and `undefined` from the possible values
 * of some properties of an existing type.
 * This type helper uses the `Exclude` utility type from TypeScript.
 * It iterates over the keys of the original type, and for each key, it creates
 * a new type that excludes `null` and `undefined` from the possible values of
 * that property.
 * @template Object_ The original type. It extends `object`, which means it can be
 * any object type.
 * @template Key The keys of the properties that should exclude `null` and
 * `undefined`. It extends `keyof Object_`, which means it can be any key of `Object_`.
 * The default value is `keyof Object_`, which means all keys of `Object_`.
 * @example
 * ```typescript
 * type Person = {
 *  name: string | null | undefined
 * age: number | null | undefined
 * }
 * type PersonWithoutNullish = NotNullishValues<Person>
 * // Equivalent to: { name: string; age: number; }
 *
 * type Employee = {
 * name: string | null | undefined
 * age: number | null | undefined
 * company: string | null | undefined
 * }
 * type EmployeeWithoutNullish = NotNullishValues<Employee, 'age' | 'company'>
 * // Equivalent to: { name: string | null | undefined; age: number; company: string; }
 * ```
 */
export type NotNullishValues<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_ = keyof Object_,
> = {
  [P in Key]: Exclude<Object_[P], null | undefined>
}

/**
 * It takes a type as its argument and returns a new type that has the same
 * properties as the original type, but the properties are not intersected. This
 * means that the new type is
 * easier to read and understand.
 */
export type Prettify<Object_ extends object> =
  & {
    [Key in keyof Object_]: Object_[Key]
  }
  // deno-lint-ignore ban-types
  & {}

/**
 * Constructs a type consisting of the values of the properties of an existing
 * type.
 *
 * This type helper uses the `keyof` and indexed access (`[]`) types from
 * TypeScript.
 * It creates a new type that includes the types of all values of the properties
 * of the original type.
 *
 * @template Object_ The original type.
 *
 * @example
 * ```typescript
 * type Person = {
 *   name: string
 *   age: number
 * }
 *
 * type PersonValues = ObjectValues<Person>
 * // Equivalent to: string | number
 *
 * type Employee = {
 *   name: string
 *   age: number
 *   company: string
 * }
 *
 * type EmployeeValues = ObjectValues<Employee>
 * // Equivalent to: string | number
 * ```
 */
export type ObjectValues<Object_ extends object> = Object_[keyof Object_]

/**
 * Represents a type that can be either a specific string (or union of strings)
 * `S` or any string.
 *
 * @template S A string literal type.
 *
 * @example
 * ```typescript
 * // Define a type that can be either "red" or any string excluding "red"
 * type RedOrOther = LooseAutoComplete<"red">
 *
 * // This is valid because "red" is one of the allowed values
 * let example1: RedOrOther = "red"
 *
 * // This is also valid because any string excluding "red" is allowed
 * let example2: RedOrOther = "blue"
 * ```
 */
export type LooseAutoComplete<S extends string> = S | Omit<string, S>

/** A type representing any function that takes any number of arguments and
 * returns void. */
// deno-lint-ignore no-explicit-any
export type AnyVoidFunction = (...argument: any[]) => void

/**
 * Constructs a type representing the symmetric difference between two tuple types.
 *
 * @template A The first tuple type.
 * @template B The second tuple type.
 *
 * @example
 * ```typescript
 * type TupleA = [1, 2, 3]
 * type TupleB = [3, 4, 5]
 *
 * type Difference = SetDifference<TupleA, TupleB>
 * // Equivalent to: 1 | 2 | 4 | 5
 * ```
 */
export type SetDifference<
  A extends readonly unknown[],
  B extends readonly unknown[],
> =
  | Exclude<A[number], B[number]>
  | Exclude<B[number], A[number]>
