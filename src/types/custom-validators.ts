import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export namespace CustomValidators {
  /* eslint-disable-next-line @tseslint/no-shadow */
  export const length = (requiredLength: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => ((control.value as string).length === requiredLength
    ? { invalid: true }
    : null);
}
