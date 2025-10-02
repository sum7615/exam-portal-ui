import { AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';

export class ProfileValidator {
  static requiredField(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value?.trim() ? null : { required: true };
    };
  }

  static validEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return { required: true };
      return emailRegex.test(value) ? null : { emailInvalid: true };
    };
  }

  static validPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      const phoneRegex = /^[0-9]{7,15}$/; // basic numeric check
      if (!value) return { required: true };
      return phoneRegex.test(value) ? null : { phoneInvalid: true };
    };
  }

  static minArrayLength(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const arr = control as FormArray;
      return arr?.length >= min ? null : { minArrayLength: { requiredLength: min } };
    };
  }
}
