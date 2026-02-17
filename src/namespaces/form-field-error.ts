// eslint-disable-next-line @tseslint/no-unused-vars
import { Validators, AbstractControl } from "@angular/forms";

/* eslint-disable @tseslint/typedef */
/**
 * Groups the keys of the Angular-Native FormField-Validators to be matched with the {@link AbstractControl.hasError | hasError}-method of the {@link AbstractControl}-class
 * @see https://v21.angular.dev/guide/forms/form-validation
 * @since 2.1.0
 * @author Ian Wenneckers
	* @category Namespaces
 */
export namespace FormFieldError {
  /**
   * Throws when the input value is empty (from Validator: {@link Validators.required | required}).
   * @see https://v21.angular.dev/api/forms/Validators#required
   * @since 2.1.0
   * @author Ian Wenneckers
   */
  export const REQUIRED = "required";
  /**
   * Throws when the input value is not `true` (typically checkbox) (from Validator: {@link Validators.requiredTrue | requiredTrue}).
   * @see https://v21.angular.dev/api/forms/Validators#requiredTrue
   * @since 2.1.0
   * @author Ian Wenneckers
   */
  export const REQUIRED_TRUE = "requiredTrue";
  /**
   * Throws when input doesn't match a valid email pattern (from Validator: {@link Validators.email | email}).
   * @see https://v21.angular.dev/api/forms/Validators#email
   * @since 2.1.0
   * @author Ian Wenneckers
   */
  export const EMAIL = "email";
  /**
   * Throws when input length is less than the configured minimum (from Validator: {@link Validators.minLength | minLength}).
   * @see https://v21.angular.dev/api/forms/Validators#minLength
   * @since 2.1.0
   * @author Ian Wenneckers
   */
  export const MIN_LENGTH = "minlength";
  /**
   * Throws when input length exceeds the configured maximum (from Validator: {@link Validators.maxLength | maxLength}).
   * @see https://v21.angular.dev/api/forms/Validators#maxLength
   * @since 2.1.0
   * @author Ian Wenneckers
   */
  export const MAX_LENGTH = "maxlength";
  /**
   * Throws when input value is less than the configured minimum (from Validator: {@link Validators.min | min}).
   * @see https://v21.angular.dev/api/forms/Validators#min
   * @since 2.1.0
   * @author Ian Wenneckers
   */
  export const MIN = "min";
  /**
   * Throws when input value is greater than the configured maximum (from Validator: {@link Validators.max | max}).
   * @see https://v21.angular.dev/api/forms/Validators#max
   * @since 2.1.0
   * @author Ian Wenneckers
   */
  export const MAX = "max";
  /**
   * Throws when input doesn't match the configured regex pattern (from Validator: {@link Validators.pattern | pattern}).
   * @see https://v21.angular.dev/api/forms/Validators#pattern
   * @since 2.1.0
   * @author Ian Wenneckers
   */
  export const PATTERN = "pattern";
}
/* eslint-enable @tseslint/typedef */
