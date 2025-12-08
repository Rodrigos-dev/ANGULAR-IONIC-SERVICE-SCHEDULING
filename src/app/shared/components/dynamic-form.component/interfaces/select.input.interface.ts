import { Observable } from 'rxjs';
import { SelectModeType } from '../types/select-input.type';

export interface Select {
  options?: Options[];
  options$?: Promise<Options[]> | Observable<Options[]>;
  mode?: SelectModeType; // ← Usando o type
}

export interface Options {
  label: string;
  value?: string | number | boolean;
  disabled?: boolean;
  icon?: string;
}
