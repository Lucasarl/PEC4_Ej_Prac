import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function NameArticleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbiddenNames = ['prueba', 'test', 'mock', 'fake'];
    const value = control.value?.toLowerCase().trim();
    
    if (value && forbiddenNames.includes(value)) {
      return { forbiddenName: { value: control.value } };
    }
    
    return null;
  };
}
