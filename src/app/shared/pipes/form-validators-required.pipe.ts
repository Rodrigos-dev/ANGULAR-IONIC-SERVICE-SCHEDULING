import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';

@Pipe({ name: 'formValidatorRequired', standalone: true })
export class FormValidatorsRequiredPipe implements PipeTransform {
  transform(value: AbstractControl) {
    return value.statusChanges.pipe(
      startWith(value),
      map(() => {
        return !value.hasValidator(Validators.required);
      })
    );
  }
}
