import { EFieldDynamicForm } from 'src/app/shared/components/dynamic-form.component/enums/field-dynamic-form.enum';
import { IDynamicFormConfig } from 'src/app/shared/components/dynamic-form.component/interfaces/dynamic-form-config.interface';

export const TEST_ALL_FIELDS_FORM_CONFIG = (): IDynamicFormConfig[] => {
  return [
    // === DIVIDER ===
    {
      typeFieldForm: EFieldDynamicForm.DIVIDER, // tipo de campo
      name: 'personal_info_divider', //namo do form control field

      help: 'label com help', //balao de dica quando clica
      label: 'Informações Pessoais', //label no dividir é o titulo no resto e o nome do campo que fica no superior

      iconName: undefined, //caso envie deve adicionar no ts o icon caso de erro pela doc https://ionicframework.com/docs/api/icon no construtor ex: - addIcons({ logoIonic });

      //relacionado a grid e responsividade
      size: 12, //tamanho da grid em desktop 'LG' na column porexemplo
      mobileSize: undefined, //tamanho da grid em celular 'XS' na colunn por exemplo

      //relacionados aos estilos *********************
      disabled: undefined, //disabelita o campo
      hidden: undefined, //esconde o campo
      paddingStart: undefined, //pode ser uma string como '8px', '0.5rem', etc
      paddingLeft: undefined, // enviar '1px', '1rem',......                                                       -- ion-label
      marginBottom: undefined, //// enviar '1px', '1rem',......

      //relacionado a bordas
      border: undefined, //'full' | 'none' | 'bottom'
      borderRadius: undefined, //30px....1rem etc
      borderColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

      //relacionado a cor e background color
      background: 'color-mix(in srgb, var(--ion-color-primary), white 96%)', //undefined, //default transparent....enviar 'var()'... rgb ...rgba etc
      color: undefined, //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc

      //ion item - ion-item-divider
      itemDividerStick: undefined, //true ou false

      //relacionados a font
      fontWeight: undefined, // enviar '600' '700' ....                                                           -- ion-item-divider
      fontSize: undefined, // enviar '1px', '1rem', .....
      textAlign: undefined, // enviar 'left' | 'center' | 'right'//alinhamento do texto label...input etc

      //relacionado a icon - caso envie o help pode configurar o icon
      iconMarginLeft: undefined, // enviar '1px', '1rem', .....                                                   -- ion-icon
      iconFontSize: undefined, //enviar '1px', '1rem', .....                                                      -- ion-icon
      iconColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc                                -- ion-icon
    },
  ];
};
