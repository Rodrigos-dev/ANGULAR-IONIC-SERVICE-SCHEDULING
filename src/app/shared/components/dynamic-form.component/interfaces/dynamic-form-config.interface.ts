import { ValidatorFn } from '@angular/forms';
import { EFieldDynamicForm } from '../enums/field-dynamic-form.enum';
import { TypeInputField } from '../types/input-field.type';
import { borderType } from '../types/styles-field.type';

export interface IDynamicFormConfig {
  name: string; //nome do campo no formulario formname
  typeFieldForm: EFieldDynamicForm; //tipo de campo do formulario desejado ...input..select etc

  label?: string; // label para usar no itm...ELE FICA sobre o input em si COM UM TITULO DO CAMPO POREM TEM O INPUT LABEL TB PARA ENVIAR QUE EH O LABEL DO INPUT

  //grid e responsividades
  size?: number; //tamanho da grid em desktop 'LG' na column porexemplo
  mobileSize?: number; //tamanho da grid em celular 'XS' na colunn por exemplo

  //relacionados aos estilos *********************
  disabled?: boolean; //disabelita o campo                                                                  -- ion-item-divider
  hidden?: boolean; //esconde o campo                                                                       -- ion-item-divider
  paddingStart?: string; //pode ser uma string como '8px', '0.5rem', etc                                    -- ion-item-divider

  //relacionado a bordas
  border?: borderType; //'full' | 'none' | 'bottom'                                                         -- ion-item-divider
  borderRadius?: string; //30px....1rem etc                                                                 -- ion-item-divider
  borderColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc                              -- ion-item-divider

  //relacionado a cor e background color
  background?: string; //default transparent....enviar 'var()'... rgb ...rgba etc                           -- ion-item-divider
  color?: string; //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc                   -- ion-item-divider

  //ion item - ion-item-divider
  itemDividerStick?: boolean; //mantem o divider parado caso role a tela                                     -- ion-item-divider

  //relacionados a font
  fontWeight?: string; // enviar '600' '700' ....                                                           -- ion-item-divider
  fontSize?: string; // enviar '1px', '1rem', .....                                                         -- ion-item-divider
}
