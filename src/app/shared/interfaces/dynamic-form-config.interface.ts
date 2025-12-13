import { Observable } from 'rxjs';

import { FormGroup, ValidatorFn } from '@angular/forms';

import { eDynamicField } from '../enums/dynamic-field.enum';
import { eBucketName } from '../enums/bucket-name.enum';
import { EMaskType } from '../components/dynamic-form.component/enums/mask-types.enum';

export type TypeField =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'search'
  | 'tel'
  | 'url';

export interface TypeControl {
  field: eDynamicField;
  typeField?: TypeField;
  inputMode?: string;
}

export interface Options {
  label: string;
  value?: string | number | boolean;
  disabled?: boolean;
  icon?: string;
}

// Crie um type específico para os modos
export type SelectModeType = 'single' | 'multiple' | 'tags';
export type FillInputType = 'solid' | 'outline';
export type LabelPlacementType =
  | 'end'
  | 'fixed'
  | 'floating'
  | 'stacked'
  | 'start';

// Use no seu interface
export interface Select {
  options?: Options[];
  options$?: Promise<Options[]> | Observable<Options[]>;
  mode?: SelectModeType; // ← Usando o type
  showSearch?: boolean;
  hideClear?: boolean;
  hide?: string[];
  maxTagCount?: number;
  dropdownMatchSelectWidth?: boolean;
}

export type IonItemNoneLines = 'none';

export enum eFileAccept {
  IMAGE = 'image/png,image/jpeg',
  VIDEO = 'video/mp4',
  IMAGEANDVIDEO = 'image/png,image/jpeg,video/mp4',
  PDF = 'pdf,application',
  WORD = 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ALLDOCUMENT = 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ALL = 'image/png,image/jpeg,video/mp4,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export interface DynamicFormDate {
  disableDate?: (current: Date) => boolean;
}

export interface IMediaItemForm {
  base64: string; // A string Base64 (ou a URL de download)
  mimeType?: string; // O tipo MIME completo (ex: image/jpeg, application/pdf)
  fileName: string; // O nome original do arquivo (ex: foto_ferias.jpg)
}

export interface IDynamicFormConfig {
  label?: string;
  name: string;
  type: TypeControl;

  inputLabel?: string;
  object?: object;
  disabled?: boolean;
  hideIfDisabled?: boolean;
  hidden?: boolean;
  initialValue?: unknown;
  placeholder?: string;
  size?: number;
  mobileSize?: number;
  select?: Select;
  date?: DynamicFormDate;
  validations?: ValidatorFn | ValidatorFn[];
  hint?: string;
  help?: string;
  mask?: EMaskType;
  avatarOrImageHeight?: string;
  avatarOrImageWidth?: string;
  ionItemNoneLines?: IonItemNoneLines;
  maskSuffix?: string;
  fill?: FillInputType;
  labelPlacement?: LabelPlacementType;
  rows?: number;
  keepSpecialCharacters?: boolean;
  showForgotPassword?: boolean;
  forgotPasswordLink?: string;
  showPasswordIcon?: boolean;
  fileAccept?: eFileAccept;
  autofocus?: boolean;
  addOnAfter?: string;
  addOnAfterIcon?: string;
  borderRadius?: string; //pode ser uma string como '8px', '0.5rem', etc
  paddingStart?: string; //pode ser uma string como '8px', '0.5rem', etc
  onAddOnAfterClick?: (form: FormGroup) => void;
  imageBucket?: eBucketName;
  maxTotalMedia?: number; // Limite total de arquivos (Imagens + Vídeos)
  maxVideos?: number;
  onChange?: (
    data: unknown | null | object | boolean | string | number,
    form: FormGroup
  ) => void;
  onOpenChange?: (open: boolean, form: FormGroup) => void;
}
