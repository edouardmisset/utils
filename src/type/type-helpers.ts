/**
 * A TypeScript type alias called `ObjectType`. It represents an object type
 * with string keys and values of type `T`. It is a shorthand for
 * `Record<string, T>`. This is a more explicit way to `object` type.
 */
// deno-lint-ignore no-explicit-any
export type ObjectType<T = any> = Record<string, T>

/**
 * A TypeScript type alias called `Value`. It represents a primitive type in
 * TypeScript. It is a union of `string`, `number`, `boolean`, `null`, and
 * `undefined`. 
 */
export type Value = string | number | boolean | null | undefined
/**
 * A TypeScript type alias called `DefinedValue`. It represents a primitive type
 * in TypeScript that is not `null` or `undefined`. It is a union of `string`,
 * `number`, and `boolean`.
 */
export type DefinedValue = string | number | boolean

/**
 * Constructs a type by overriding some properties of an original type with properties from another type.
 *
 * This type helper uses the `Omit` and `keyof` utility types from TypeScript.
 * It first omits the keys of the `OverrideType` from the `OriginalType`, and then combines the result with the `OverrideType`.
 * This means that properties in the `OverrideType` will override properties in the `OriginalType`.
 *
 * @template OriginalType The original type.
 * @template OverrideType The type that should override properties in the original type.
 *
 * @example
 * ```ts
 * type Person = {
 *   name: string;
 *   age: number;
 * };
 *
 * type Employee = {
 *   age: string;
 *   company: string;
 * };
 *
 * type EmployeePerson = Override<Person, Employee>;
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
 * This type helper uses the `Omit`, `Pick`, and `Required` utility types from TypeScript.
 * It first omits the specified keys from the original type, and then makes those keys required.
 *
 * @template Obj The original type.
 * @template Key The keys of the properties that should be made required. It extends `keyof Obj`, which means it can be any key of `Obj`. The default value is `keyof Obj`, which means all keys of `Obj`.
 *
 * @example
 * ```typescript
 * type Person = {
 *   name: string;
 *   age?: number;
 * };
 *
 * type PersonWithRequiredAge = RequireKey<Person, 'age'>;
 * // Equivalent to: { name: string; age: number; }
 * ```
 *
 * @example
 * ```typescript
 * type Employee = {
 *   name: string;
 *   age?: number;
 *   company?: string;
 * };
 *
 * type EmployeeWithRequiredAgeAndCompany = RequireKey<Employee, 'age' | 'company'>;
 * // Equivalent to: { name: string; age: number; company: string; }
 * ```
 */
export type RequireKey<
  Obj extends ObjectType<unknown>,
  Key extends keyof Obj = keyof Obj,
> = Omit<Obj, Key> & Required<Pick<Obj, Key>>

/**
 * Constructs a type by making some properties of an existing type optional.
 *
 * This type helper uses the `Omit` and `Partial` utility types from TypeScript.
 * It first omits the specified keys from the original type, and then makes those keys optional.
 *
 * @template Obj The original type.
 * @template Key The keys of the properties that should be made optional. It extends `keyof Obj`, which means it can be any key of `Obj`. The default value is `keyof Obj`, which means all keys of `Obj`.
 *
 * @example
 * ```typescript
 * type Person = {
 *   name: string;
 *   age: number;
 * };
 *
 * type PersonWithOptionalAge = OptionalKey<Person, 'age'>;
 * // Equivalent to: { name: string; age?: number; }
 * ```
 *
 * @example
 * ```typescript
 * type Employee = {
 *   name: string;
 *   age: number;
 *   company: string;
 * };
 *
 * type EmployeeWithOptionalAgeAndCompany = OptionalKey<Employee, 'age' | 'company'>;
 * // Equivalent to: { name: string; age?: number; company?: string; }
 * ```
 */
export type OptionalKey<
  Obj extends ObjectType<unknown>,
  Key extends keyof Obj = keyof Obj,
> = Omit<Obj, Key> & Partial<Pick<Obj, Key>>

/**
 * Constructs a type by excluding `null` from the possible values of some properties of an existing type.
 *
 * This type helper uses the `Exclude` utility type from TypeScript.
 * It iterates over the keys of the original type, and for each key, it creates a new type that excludes `null` from the possible values of that property.
 *
 * @template Obj The original type. It extends `object`, which means it can be any object type.
 * @template Key The keys of the properties that should exclude `null`. It extends `keyof Obj`, which means it can be any key of `Obj`. The default value is `keyof Obj`, which means all keys of `Obj`.
 *
 * @example
 * ```typescript
 * type Person = {
 *   name: string | null;
 *   age: number | null;
 * };
 *
 * type PersonWithoutNull = NotNullProperty<Person>;
 * // Equivalent to: { name: string; age: number; }
 * ```
 *
 * @example
 * ```typescript
 * type Employee = {
 *   name: string | null;
 *   age: number | null;
 *   company: string | null;
 * };
 *
 * type EmployeeWithoutNull = NotNullProperty<Employee, 'age' | 'company'>;
 * // Equivalent to: { name: string | null; age: number; company: string; }
 * ```
 */
export type NotNullProperty<
  Obj extends ObjectType<unknown>,
  Key extends keyof Obj = keyof Obj,
> = {
    [P in Key]: Exclude<Obj[P], null>
  }

/**
 * A TypeScript type alias called `Prettify`.
 * It takes a type as its argument and returns a new type that has the same properties as the original type,
 * but the properties are not intersected. This means that the new type is easier to read and understand.
 */
export type Prettify<Obj extends object> =
  & {
    [Key in keyof Obj]: Obj[Key]
  }
  // deno-lint-ignore ban-types
  & {}

/**
 * Constructs a type consisting of the values of the properties of an existing type.
 *
 * This type helper uses the `keyof` and indexed access (`[]`) types from TypeScript.
 * It creates a new type that includes the types of all values of the properties of the original type.
 *
 * @template Obj The original type.
 *
 * @example
 * ```typescript
 * type Person = {
 *   name: string;
 *   age: number;
 * };
 *
 * type PersonValues = ObjectValues<Person>;
 * // Equivalent to: string | number
 * ```
 *
 * @example
 * ```typescript
 * type Employee = {
 *   name: string;
 *   age: number;
 *   company: string;
 * };
 *
 * type EmployeeValues = ObjectValues<Employee>;
 * // Equivalent to: string | number
 * ```
 */
export type ObjectValues<Obj extends object> = Obj[keyof Obj]

/**
 * Represents a type that can be either a specific string (or union of strings) `S` or any string.
 *
 * @template S A string literal type.
 *
 * @example
 * ```typescript
 * // Define a type that can be either "red" or any string excluding "red"
 * type RedOrOther = LooseAutoComplete<"red">;
 *
 * // This is valid because "red" is one of the allowed values
 * let example1: RedOrOther = "red";
 *
 * // This is also valid because any string excluding "red" is allowed
 * let example2: RedOrOther = "blue";
 * ```
 */
export type LooseAutoComplete<S extends string> = S | Omit<string, S>
