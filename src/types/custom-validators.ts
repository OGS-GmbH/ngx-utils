import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Creates a validator function that checks whether a control's string value has the specified length.
 * @category Validators
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export namespace CustomValidators {
  /**
   * @param requiredLength - the exact length that the control's value must have.
   * @returns "invalid: true" or null.
   */
  /* eslint-disable-next-line @tseslint/no-shadow */
  export const length = (requiredLength: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => ((control.value as string).length === requiredLength
    ? { invalid: true }
    : null);
}
