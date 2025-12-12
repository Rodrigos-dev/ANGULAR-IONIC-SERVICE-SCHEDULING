import { debounceTime, Subject, takeUntil } from 'rxjs';

import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: 'form[formGroup][mbFormStorageName]',
  standalone: true,
})
export class FormStorageDirective implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input() formGroup!: FormGroup;
  @Input() mbFormStorageName?: string;

  ngOnInit(): void {
    if (!this.mbFormStorageName) {
      return;
    }

    this.updateFormValue();
    this.listenUpdateValue();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateFormValue(): void {
    const storageValue = JSON.parse(
      localStorage.getItem(this.mbFormStorageName!) || '{}'
    );
    if (storageValue) {
      this.formGroup.patchValue(storageValue);
    }
  }

  private listenUpdateValue(): void {
    this.formGroup.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((value) =>
        localStorage.setItem(this.mbFormStorageName!, JSON.stringify(value))
      );
  }
}
