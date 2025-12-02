import { FormControl, FormGroup } from "@angular/forms";

/**
 * Maps an object type `T` to either its raw flat form object or a `FormGroup` containing
 * the corresponding controls/groups for all of its properties, depending on `RawOuter`.
 *
 * @typeParam T - The source type to transform into a form-mapped structure.
 * @typeParam Atomic - Types that should be treated as primitives and mapped directly to a `FormControl`. Defaults to {@link ToFormDefaultAtomic}.
 * @typeParam RawOuter - If `true`, the result is the raw mapped object type. If `false`, the result is wrapped in a `FormGroup`.
 *
 * @since 1.2.0
 * @author Ian Wenneckers
 */
export type ToFormObject<T, Atomic, RawOuter extends boolean> = RawOuter extends true
  ? ToFlatFormObject<T, Atomic>
  : FormGroup<ToFlatFormObject<T, Atomic>>;
/**
 * Maps an array type `T` to a corresponding array of mapped form controls/groups.
 * Delegates to {@link ToFlatFormArray}.
 *
 * @typeParam T - The array type to map.
 * @typeParam Atomic - See {@link ToFormDefaultAtomic}.
 * @typeParam RawOuter - Whether the outer array elements are returned raw or wrapped.
 *
 * @since 1.2.0
 * @author Ian Wenneckers
 */
export type ToFormArray<T, Atomic = ToFormDefaultAtomic, RawOuter extends boolean = false> = ToFlatFormArray<T, Atomic, RawOuter>;
/**
 * Core implementation of array mapping, resolving the element type and passing
 * it to {@link ToForm}.
 *
 * @typeParam T - The array type.
 * @typeParam Atomic - Atomic types passed directly to controls.
 * @typeParam RawOuter - Determines wrapping of nested structures.
 *
 * @since 1.2.0
 * @author Ian Wenneckers
 */
export type ToFlatFormArray<T, Atomic = ToFormDefaultAtomic, RawOuter extends boolean = false> =
  T extends (infer U) ? ToForm<U, Atomic, RawOuter> : never;
/**
 * Maps an object type `T` to a flat object where each property is mapped using {@link ToForm}.
 *
 * @typeParam T - The object type.
 * @typeParam Atomic - Atomic types passed directly to controls.
 * @typeParam RawOuter - Determines wrapping of nested structures.
 *
 * @since 1.0.0
 * @author Ian Wenneckers
 */
export type ToFlatFormObject<T, Atomic = ToFormDefaultAtomic, RawOuter extends boolean = false> = {
  [K in keyof NonNullable<T>]: ToForm<NonNullable<T>[K], Atomic, RawOuter>;
};
/**
 * Represents a primitive form field for values of type `T`. Nullable by default.
 *
 * @since 1.2.0
 * @author Ian Wenneckers
 */
export type ToFormPrimitive<T> = FormControl<T | null>;
/**
 * Default set of types that should be treated as atomic (not recursively inspected).
 * These are mapped directly to `FormControl` instances.
 *
 * @since 1.2.0
 * @author Ian Wenneckers
 */
export type ToFormDefaultAtomic = Date | File | Blob;
/**
 * Main type that maps any type `T` to the corresponding Angular form representation.
 * Determines whether `T` is atomic, an object, an array, or a primitive.
 *
 * @typeParam T - The input type to convert.
 * @typeParam Atomic - Types treated as atomic values. Defaults to {@link ToFormDefaultAtomic}.
 * @typeParam RawOuter - Whether object types should be returned as raw mapped structures instead of wrapped in `FormGroup`. Defaults to `true`.
 *
 * @since 1.2.0
 * @author Ian Wenneckers
 *
 * @example
 * ```ts
 * interface User {
 *   name: string;
 *   age: number;
 *   tags: string[];
 * }
 *
 * // Produces:
 * // {
 * //   name: FormControl<string>;
 * //   age: FormControl<number>;
 * //   tags: FormArray<FormControl<string>>;
 * // }
 * type UserForm = ToForm<User>;
 * ```
 */
export type ToForm<T, Atomic = ToFormDefaultAtomic, RawOuter extends boolean = true> =
  [NonNullable<T>] extends [Atomic]
    ? ToFormPrimitive<T>
    : [NonNullable<T>] extends [object]
      ? ToFormObject<T, Atomic, RawOuter>
      : [NonNullable<T>] extends [unknown[]]
        ? ToFormArray<T, Atomic, RawOuter>
        : ToFormPrimitive<T>;
