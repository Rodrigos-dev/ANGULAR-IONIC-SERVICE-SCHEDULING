import { EFieldDynamicForm } from 'src/app/shared/components/dynamic-form.component/enums/field-dynamic-form.enum';
import { IDynamicFormConfig } from 'src/app/shared/components/dynamic-form.component/interfaces/dynamic-form-config.interface';

export const TEST_ALL_FIELDS_FORM_CONFIG = (): IDynamicFormConfig[] => {
  return [
    // === DIVIDER ===
    {
      label: 'Informações Pessoais',
      name: 'personal_info_divider',
      typeFieldForm: EFieldDynamicForm.DIVIDER,
      size: 12,

      //relacionados aos estilos *********************
      disabled: undefined, //disabelita o campo
      hidden: undefined, //esconde o campo
      paddingStart: undefined, //pode ser uma string como '8px', '0.5rem', etc

      //relacionado a bordas
      border: undefined, //'full' | 'none' | 'bottom'
      borderRadius: undefined, //30px....1rem etc
      borderColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

      //relacionado a cor e background color
      background: undefined, //default transparent....enviar 'var()'... rgb ...rgba etc
      color: undefined, //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc

      //ion item - ion-item-divider
      itemDividerStick: undefined, //true ou false
    },
  ];
};
