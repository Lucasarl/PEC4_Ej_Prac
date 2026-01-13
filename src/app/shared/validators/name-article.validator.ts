import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function NameArticleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    // Check if name contains only letters and spaces
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const valid = namePattern.test(value);
    
    return valid ? null : { invalidName: { value: control.value } };
  };
}
