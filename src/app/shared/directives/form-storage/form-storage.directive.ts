import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EFieldDynamicForm } from '../../components/dynamic-form.component/enums/field-dynamic-form.enum';
import { formatDateFieldInputs } from '../../utils/date.util';

@Directive({
  selector: 'form[formGroup][mbFormStorageName]',
  standalone: true,
})
export class FormStorageDirective implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input() formGroup!: FormGroup;
  @Input() mbFormStorageName?: string;
  @Input() mbFormStorageFieldTypes?: Record<string, EFieldDynamicForm>;

  ngOnInit(): void {
    if (!this.mbFormStorageName) return;

    this.updateFormValue();
    this.listenUpdateValue();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateFormValue(): void {
    setTimeout(() => {
      const storageValue = JSON.parse(
        localStorage.getItem(this.mbFormStorageName!) || '{}'
      );

      if (storageValue) {
        this.formGroup.patchValue(storageValue);
      }
    });
  }

  private listenUpdateValue(): void {
    this.formGroup.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((value) => {
        const formattedValue = this.formatValuesForStorage(value);
        console.log(
          'SALVANDO NO STORAGE: - form-storage.directive.ts:47',
          value
        );
        localStorage.setItem(
          this.mbFormStorageName!,
          JSON.stringify(formattedValue)
        );
      });
  }

  private formatValuesForStorage(values: any): any {
    // Se não veio o mapa de tipos, salva do jeito que está
    if (!this.mbFormStorageFieldTypes) {
      return values;
    }

    const formatted = { ...values };

    Object.entries(this.mbFormStorageFieldTypes).forEach(
      ([field, fieldType]) => {
        const fieldValue = formatted[field];

        // Campo não existe ou está vazio
        if (!fieldValue) return;

        // Só formata se for campo de data / hora
        formatted[field] = formatDateFieldInputs(fieldValue, fieldType);
      }
    );

    return formatted;
  }
}
