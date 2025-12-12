import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[mbAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements AfterViewInit {
  @Input('mbAutoFocus') autoFocus?: boolean = true;

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterViewInit() {
    if (!this.autoFocus) return;

    setTimeout(() => {
      // Tenta encontrar o input nativo dentro do ion-input
      const nativeInput = this.elementRef.nativeElement.querySelector('input');

      if (nativeInput) {
        nativeInput.focus();
      } else {
        // Fallback: Tenta focar o próprio ion-input se o input nativo não for encontrado
        this.elementRef.nativeElement.focus();
      }
    }, 500);
  }
}
