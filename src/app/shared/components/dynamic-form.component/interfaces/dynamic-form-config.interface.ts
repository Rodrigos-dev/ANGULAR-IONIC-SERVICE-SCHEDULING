import { ValidatorFn } from '@angular/forms';
import { EFieldDynamicForm } from '../enums/field-dynamic-form.enum';
import { DateFieldInitialValue } from '../types/input-field.type';
import {
  baseConfigsFormFields,
  IDefaultAllFieldsConfigs,
  IItemContainerFieldsConfigs,
  IItemDividerConfigs,
} from './fields.configs.interface';

export interface IDynamicFormContainerConfig {
  paddingRightForm?: string;
  paddingLeftForm?: string;
  paddingBottomForm?: string;
  paddingTopForm?: string;
  maxWidthForm?: string;
  gapFieldsForm?: string;
}

export interface IDynamicFormFieldsConfig {
  name: string; //nome do campo no formulario formname
  typeFieldForm: EFieldDynamicForm; //tipo de campo do formulario desejado ...input..select etc
  initialValue?: DateFieldInitialValue; //valor inicial do input - para updates etc - caso seja data ou time o input YYYY-MM-DDTHH:mm, YYYY-MM-DD, HH:mm
  disabled?: boolean; //disabelita o campo
  validations?: ValidatorFn | ValidatorFn[]; //erros configurados no validations do input

  defaultAllFieldsConfigs?: IDefaultAllFieldsConfigs; //default para todos os campos

  itemDividerConfigs?: IItemDividerConfigs; //titulo do formulario

  itemContainerFieldsConfigs?: IItemContainerFieldsConfigs; //container que envolve todos os campo

  fieldsConfigs?: baseConfigsFormFields; //todas as config de cada campo
}
