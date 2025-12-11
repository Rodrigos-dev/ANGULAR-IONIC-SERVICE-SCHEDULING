// until-destroy.decorator.ts - VERSÃO CORRIGIDA
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function UntilDestroy() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const originalNgOnDestroy = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      if (this.destroy$) {
        this.destroy$.next();
        this.destroy$.complete();
      }
      originalNgOnDestroy?.apply(this);
    };

    //Garante que destroy$ existe
    constructor.prototype.destroy$ = new Subject<void>();

    //Método untilDestroyed
    constructor.prototype.untilDestroyed = function () {
      return takeUntil(this.destroy$);
    };

    return constructor;
  };
}

//Função global corrigida
export function untilDestroyed(instance: any) {
  if (!instance.destroy$) {
    instance.destroy$ = new Subject<void>();
  }
  return takeUntil(instance.destroy$);
}
