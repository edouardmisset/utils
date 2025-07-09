/**
 * TypeScript utility types and helpers for enhanced type safety and developer experience.
 * Includes advanced type helpers for autocomplete, conditionals, and type transformations.
 *
 * @example
 * ```ts
 * import type { LooseAutoComplete, ObjectOfType } from "jsr:@edouardmisset/type";
 * import { assertEquals } from "@std/assert";
 *
 * // Test LooseAutoComplete type - allows both predefined and custom values
 * type Color = LooseAutoComplete<"red" | "blue" | "green">;
 * const color1: Color = "red";    // predefined value
 * const color2: Color = "purple"; // custom value
 * assertEquals(typeof color1, "string");
 * assertEquals(typeof color2, "string");
 *
 * // Test ObjectOfType for type-safe objects
 * type StringRecord = ObjectOfType<string>;
 * const record: StringRecord = { name: "Alice", role: "admin" };
 * assertEquals(typeof record.name, "string");
 * assertEquals(typeof record.role, "string");
 *
 * // Test with actual data structures showing type utility
 * type User = { name: string; settings: { theme: string; lang: string; } };
 * const user: User = {
 *   name: "Bob",
 *   settings: { theme: "dark", lang: "en" }
 * };
 * assertEquals(typeof user.settings.theme, "string");
 * ```
 *
 * @module
 */

export * from './type-helpers.ts'
