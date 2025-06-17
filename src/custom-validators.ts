import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export namespace CustomValidators {
	export const length = (requiredLength: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			return (control.value as string).length === requiredLength
				? { invalid: true }
				: null;
		};
	};
}
