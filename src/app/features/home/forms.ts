import { Validators } from '@angular/forms';
import { EFieldDynamicForm } from 'src/app/shared/components/dynamic-form.component/enums/field-dynamic-form.enum';
import { EInputModeField } from 'src/app/shared/components/dynamic-form.component/enums/input-mode-field.enum';
import { EMaskType } from 'src/app/shared/components/dynamic-form.component/enums/mask-types.enum';
import { IDynamicFormConfig } from 'src/app/shared/components/dynamic-form.component/interfaces/dynamic-form-config.interface';

export const TEST_ALL_FIELDS_FORM_CONFIG = (): IDynamicFormConfig[] => {
  return [
    // === DIVIDER ===
    {
      typeFieldForm: EFieldDynamicForm.DIVIDER, // tipo de campo
      name: 'personal_info_divider', //namo do form control field

      help: 'label com help', //balao de dica quando clica
      labelItemTop: 'Informações Pessoais', //label no dividir é o titulo no resto e o nome do campo que fica no superior

      iconName: undefined, //caso envie deve adicionar no ts o icon caso de erro pela doc https://ionicframework.com/docs/api/icon no construtor ex: - addIcons({ logoIonic });

      //relacionado a grid e responsividade
      size: 12, //tamanho da grid em desktop 'LG' na column e with que ocupa naos campos por exemplo
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
      backgroundItem: 'color-mix(in srgb, var(--ion-color-primary), white 96%)', //undefined, //default transparent....enviar 'var()'... rgb ...rgba etc
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

    //
    // === INPUT TEXT ===
    {
      name: 'name', //namo do form control field
      typeFieldForm: EFieldDynamicForm.INPUT, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments

      help: undefined, //balao de dica quando clica - input para nome completo por exemplo
      labelItemTop: undefined, //label que fica fora do input - label no dividir é o titulo no resto e o nome do campo que fica no superior
      iconName: undefined, //caso envie deve adicionar no ts o icon caso de erro pela doc https://ionicframework.com/docs/api/icon no construtor ex: - addIcons({ logoIonic });

      hint: undefined, //compo de dica - do que o campo faz ou o que deve ser feito pelo usuario etc
      hintMarginLeft: undefined, // enviar '1px', '1rem',......
      hintFontSize: undefined, // enviar '1px', '1rem',......
      hintColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      validations: [Validators.required, Validators.minLength(3)], //validacoes do formulario

      //relacionado a grid e responsividade
      size: 12, //tamanho da grid em desktop 'LG' na column e with que ocupa naos campos por exemplo
      mobileSize: undefined, //tamanho da grid em celular 'XS' na colunn por exemplo

      ionItemDetail: undefined, //true add aquela seta no fim do item
      ionItemNoneLines: 'none', //"full" ｜ "inset" ｜ "none".....

      //parte asteristico * de valor requerido no fim do input
      asteristicRequiredLabelItem: true, //true or false
      asteristicRequiredColorLabelItem: 'red', //default primary....enviar 'var()'... rgb ...rgba etc

      //inputs data
      eInputModeField: EInputModeField.TEXT, //mode de entrada do input - text,password,email,number,search,tel,url
      initialValue: '', //valor que o campo vai iniciar
      placeholder: 'Digite seu nome completo', //a escrita que fica no input porem some quando escreve algo em cima
      fill: undefined, //"outline" ｜ "solid"
      labelPlacement: 'stacked', //fixed, floating, stacked, start.... escrita dentro do input ou aquela que movimaneta de dentro para cima etc...fixed - com input label mantem o testo fixo no incio do input -
      borderRadius: undefined, //enviar '1px', '1rem', .....
      paddingStart: undefined, //enviar '1px', '1rem', .....
      backgroundInput:
        'color-mix(in srgb, var(--ion-color-primary), white 96%)', //'color-mix(in srgb, var(--ion-color-primary), white 96%)', //
      boderColorInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      boderWidthInput: '1px', // default - 1px, sem borda enviar 0 - com borda - enviar '1px', '1rem', .....
      colorLabelPlaceholderAndTextInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      maxLengthInput: undefined, //max quantidade de caracteres que o input suporta
      minLengthInput: undefined, //min caracteres que deve ter o input

      inputLabel: undefined, //label que aparece na parte superior do input
      autofocus: undefined, //true, false
      mask: undefined, //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....

      //parte asteristico * de valor requerido no fim do input
      asteristicRequiredInput: undefined, //true or false
      asteristicRequiredSlotInput: undefined, // 'start' | 'end' - default end; local onde vai ser posicionado
      asteristicRequiredColorInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

      //sobre icones
      showPasswordIcon: false, //controla o olho do password com risco ou sem risco mostrar ou não
      onAddOnIconClick: undefined, //ver  que é
      iconMarginLeft: undefined, //enviar '1px', '1rem', .....
      iconFontSize: undefined, //enviar '1px', '1rem', .....
      iconColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

      //buttons downs input - botoes de url ou  que quiser abaixo do input tipo o esqueceu senha etc...na verdade o esqueceu senha vai ser um desses teremos 2 posiveis opcoes
      //botao 1
      showButtonOneDownInput: undefined, //boolean para exibir o botão essa propriedade é obrigatoria true,
      sizeColumnButtonOneDownInput: undefined, // numero do grid que vai ocupar na coluna 3, 6 ou 12 permitido
      paddingLeftButtonOneDownInput: undefined, //enviar '1px', '1rem', .....
      justifyContentButtonOneDownInput: undefined, // 'flex-start' 'flex-end' 'center';
      linkButtonOneDownInput: undefined, //url ou page que vai ser enviado quando clicar
      fontSizebuttonOneDownInput: undefined, //enviar '1px', '1rem', .....
      colorTextbuttonOneDownInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      textButtonOneDownInput: 'Esqueceu Senha?', //texto do que vai dizer o botao exemplo - esqueceu senha

      //botao 2
      showButtonTwoDownInput: undefined, //boolean para exibir o botão essa propriedade é obrigatoria true,
      sizeColumnButtonTwoDownInput: undefined, // numero do grid que vai ocupar na coluna 12 é o max ocupa linha toda
      paddingLeftButtonTwoDownInput: undefined, //enviar '1px', '1rem', .....
      justifyContentButtonTwoDownInput: undefined, // 'flex-start' 'flex-end' 'center';
      linkButtonTwoDownInput: undefined, //url ou page que vai ser enviado quando clicar
      fontSizebuttonTwoDownInput: undefined, //enviar '1px', '1rem', .....
      colorTextbuttonTwoDownInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      textButtonTwoDownInput: 'Criar conta?', //texto do que vai dizer o botao exemplo - esqueceu senha?
    },
  ];
};
