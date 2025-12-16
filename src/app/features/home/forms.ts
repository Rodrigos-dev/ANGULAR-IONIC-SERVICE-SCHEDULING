import { Validators } from '@angular/forms';
import { EFieldDynamicForm } from 'src/app/shared/components/dynamic-form.component/enums/field-dynamic-form.enum';
import { eFileAccept } from 'src/app/shared/components/dynamic-form.component/enums/image-video-document.enum';
import { EInputModeField } from 'src/app/shared/components/dynamic-form.component/enums/input-mode-field.enum';
import { IDynamicFormConfig } from 'src/app/shared/components/dynamic-form.component/interfaces/dynamic-form-config.interface';
import {
  IDefaultAllFieldsConfigs,
  IItemContainerFieldsConfigs,
} from 'src/app/shared/components/dynamic-form.component/interfaces/fields.configs.interface';
import { linesShowType } from 'src/app/shared/components/dynamic-form.component/types/ion-item.type';

//coluna principal que empacota os campos
const defaultAllFieldsConfigs: IDefaultAllFieldsConfigs = {
  sizeGridMainColumn: 12, //tamanho da grid em desktop 'LG' na column porexemplo 3 6 9 12
  mobileSizeGridMainColumn: undefined, //tamanho da grid em celular 'XS' na colunn por exemplo 3 6 9 12
  hiddenMainColumn: undefined, //esconde o campo
};

//default para todosos campos do item que empacota os inputs
const itemContainerFieldsConfigs: IItemContainerFieldsConfigs = {
  detailItemFieldsMain: undefined, //true add aquela seta no fim do item
  noneLinesItemFieldsMain: 'none' as linesShowType, //'none', //"full" ｜ "inset" ｜ "none".....
  backgroundItemFieldsMain:
    'color-mix(in srgb, var(--ion-color-primary), white 96%)', //default transparent....enviar 'var()'... rgb ...rgba etc
  marginTopItemFieldsMain: '1px', //30px....1rem etc
  asteristicRequiredColorLabelItem: undefined, //caso envie exibe um asteristico no campo indicando item obrigatorio - default primary....enviar 'var()'... rgb ...rgba etc
  paddingStart: undefined,
  paddingBottom: undefined, // enviar '1px', '1rem', .....
  paddingTop: undefined, // enviar '1px', '1rem', .....

  labelConfigs: {
    colorLabelItemMain: undefined, //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc
    paddingLeftLabelItemMain: '10px', // enviar '1px', '1rem',......
    marginBottomLabelItemMain: undefined, //// enviar '1px', '1rem',......
    fontSizeLabelItemMain: undefined, // enviar '1px', '1rem', .....
    textLabelItemMain: undefined, //texto do label do item fica sobre o input por exemplo...nome
  },

  iconHelpConfigs: {
    helpIconName: undefined, // icone que vai ser renderizado
    helpText: undefined, //ajuda que fica do sobr input clicar em cima exibe um popover
    helpIconMarginLeft: undefined, //// enviar '1px', '1rem',......
    helpIconFontSize: undefined, // enviar '1px', '1rem', .....
    helpIconColor: undefined, //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc
  },

  hintConfigs: {
    hintText: undefined, // 'aki cada campo que usar deve passar o seu texto da dica'
    hintMarginLeft: undefined, // enviar '1px', '1rem', .....
    hintFontSize: undefined, // enviar '1px', '1rem', .....
    hintColor: undefined, //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc
  },
};

//
export const TEST_ALL_FIELDS_FORM_CONFIG = (): IDynamicFormConfig[] => {
  return [
    // === DIVIDER ===
    {
      typeFieldForm: EFieldDynamicForm.DIVIDER, // tipo de campo
      name: 'personal_info_divider', //namo do form control field

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      itemDividerConfigs: {
        backgroundItemItemDivider:
          'color-mix(in srgb, var(--ion-color-primary), white 96%)', //undefined, //default transparent....enviar 'var()'... rgb ...rgba etc
        borderColorItemDivider: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
        borderRadiusItemDivider: undefined, //30px....1rem etc
        paddingStartItemDivider: undefined, //pode ser uma string como '8px', '0.5rem', etc
        borderItemDivider: undefined, //'full' | 'none' | 'bottom'
        stickItemDivider: undefined, //true ou false
        marginBottomItemDivider: undefined, //enviar '1px', '1rem', -> aki que controla junto com o padding top o height do check box
        textAlignLabelItemDivider: undefined, //'left' | 'center' | 'right'//alinhamento do texto label...input etc
        colorLabelItemDivider: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
        fontWeightLabelItemDivider: undefined, // enviar '600' '700' ....
        fontSizeLabelItemDivider: undefined, // enviar '1px', '1rem',......
        textLabelItemDivider: 'Informações Pessoais', //escita principal no item divider - titulo caso tenha um
      },
    },

    //   // === AVATAR ===
    {
      name: 'avatar',
      typeFieldForm: EFieldDynamicForm.AVATAR, // tipo de campo
      disabled: undefined,
      initialValue: '',

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      fieldsConfigs: {
        avatarConfigs: {
          avatarOrImageHeight: '130px',
          avatarOrImageWidth: '130px',
        },
      },
    },

    //
    // === INPUT TEXT ===
    {
      name: 'name', //namo do form control field
      typeFieldForm: EFieldDynamicForm.INPUT, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments
      validations: [Validators.required, Validators.minLength(3)], //validacoes do formulario
      initialValue: '',
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      fieldsConfigs: {
        inputConfigs: {
          eInputModeField: EInputModeField.TEXT, //mode de entrada do input - text,password,email,number,search,tel,url
          placeholderInput: 'Digite seu nome completo', //a escrita que fica no input porem some quando escreve algo em cima
          backgroundInput:
            'color-mix(in srgb, var(--ion-color-primary), white 96%)', //'color-mix(in srgb, var(--ion-color-primary), white 96%)', //
          colorLabelPlaceholderAndTextInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          maxLengthInput: undefined, //max quantidade de caracteres que o input suporta
          minLengthInput: undefined, //min caracteres que deve ter o input

          labelInput: 'Nome', //label que aparece na parte superior do input
          autofocusInput: undefined, //true, false
          maskInput: undefined, //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....

          //parte asteristico * de valor requerido no fim do input
          asteristicRequiredInput: undefined, //true or false
          asteristicRequiredSlotInput: undefined, // 'start' | 'end' - default end; local onde vai ser posicionado
          asteristicRequiredColorInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

          //sobre icones
          showPasswordIcon: false, //controla o olho do password com risco ou sem risco mostrar ou não

          dateTimeOrTimeInputType: {
            titleColorModalDate: undefined, //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
            titleFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
            buttonColorModalDate: undefined, //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
            buttonFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
          },

          //buttons downs input - botoes de url ou  que quiser abaixo do input tipo o esqueceu senha etc...na verdade o esqueceu senha vai ser um desses teremos 2 posiveis opcoes
          buttonOneDownInput: {
            //botao 1
            showButtonOneDownInput: undefined, //boolean para exibir o botão essa propriedade é obrigatoria true,
            sizeColumnButtonOneDownInput: undefined, // numero do grid que vai ocupar na coluna 3, 6 ou 12 permitido
            paddingLeftButtonOneDownInput: undefined, //enviar '1px', '1rem', .....
            justifyContentButtonOneDownInput: undefined, // 'flex-start' 'flex-end' 'center';
            linkButtonOneDownInput: undefined, //url ou page que vai ser enviado quando clicar
            fontSizebuttonOneDownInput: undefined, //enviar '1px', '1rem', .....
            colorTextbuttonOneDownInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
            textButtonOneDownInput: 'Esqueceu Senha?', //texto do que vai dizer o botao exemplo - esqueceu senha
          },
          //
          buttonTwoDownInput: {
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
        },
      },
    },

    // === INPUT TEXT AREA===
    {
      name: 'sobreVoce', //namo do form control field
      typeFieldForm: EFieldDynamicForm.TEXTAREA, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments
      initialValue: '',
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      fieldsConfigs: {
        inputConfigs: {
          eInputModeField: EInputModeField.TEXT, //mode de entrada do input - text,password,email,number,search,tel,url
          placeholderInput: 'Digite seu nome completo', //a escrita que fica no input porem some quando escreve algo em cima
          backgroundInput:
            'color-mix(in srgb, var(--ion-color-primary), white 96%)', //'color-mix(in srgb, var(--ion-color-primary), white 96%)', //
          colorLabelPlaceholderAndTextInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          maxLengthInput: undefined, //max quantidade de caracteres que o input suporta
          minLengthInput: undefined, //min caracteres que deve ter o input

          labelInput: 'Nome', //label que aparece na parte superior do input
          autofocusInput: undefined, //true, false
          maskInput: undefined, //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....

          //parte asteristico * de valor requerido no fim do input
          asteristicRequiredInput: undefined, //true or false
          asteristicRequiredSlotInput: undefined, // 'start' | 'end' - default end; local onde vai ser posicionado
          asteristicRequiredColorInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

          //sobre icones
          showPasswordIcon: false, //controla o olho do password com risco ou sem risco mostrar ou não

          textAreaRows: undefined,

          dateTimeOrTimeInputType: {
            titleColorModalDate: undefined, //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
            titleFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
            buttonColorModalDate: undefined, //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
            buttonFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
          },

          //buttons downs input - botoes de url ou  que quiser abaixo do input tipo o esqueceu senha etc...na verdade o esqueceu senha vai ser um desses teremos 2 posiveis opcoes
          buttonOneDownInput: {
            //botao 1
            showButtonOneDownInput: undefined, //boolean para exibir o botão essa propriedade é obrigatoria true,
            sizeColumnButtonOneDownInput: undefined, // numero do grid que vai ocupar na coluna 3, 6 ou 12 permitido
            paddingLeftButtonOneDownInput: undefined, //enviar '1px', '1rem', .....
            justifyContentButtonOneDownInput: undefined, // 'flex-start' 'flex-end' 'center';
            linkButtonOneDownInput: undefined, //url ou page que vai ser enviado quando clicar
            fontSizebuttonOneDownInput: undefined, //enviar '1px', '1rem', .....
            colorTextbuttonOneDownInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
            textButtonOneDownInput: 'Esqueceu Senha?', //texto do que vai dizer o botao exemplo - esqueceu senha
          },
          //
          buttonTwoDownInput: {
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
        },
      },
    },

    // === SWITCH/TOGGLE ===
    {
      name: 'receive_notifications',
      typeFieldForm: EFieldDynamicForm.SWITCH,
      initialValue: true,
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      fieldsConfigs: {
        toggleConfigs: {
          toggleLabel: 'Receber Notificações', //texto do titulo do campo
          toggleNote: 'Receba notificações por e-mail sobre novidades', //texto para indicar alguma dica sobre o campo, //texto para indicar alguma dica sobre o campo

          toggleLabelMarginLeft: undefined, //enviar '1px', '1rem', .....
          toggleLabelFontSize: undefined, //enviar '1px', '1rem', .....
          toggleLabelColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          toggleNoteColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          toggleNoteMarginLeft: undefined, //enviar '1px', '1rem', .....
          toggleNoteFontSize: undefined, //enviar '1px', '1rem', .....
          toggleFill: 'outline', //"outline" ｜ "solid" - bordas no outline - background no solid
          toggleLabelPlacement: 'stacked', //fixed, floating, stacked, start.... escrita dentro do input ou aquela que movimaneta de dentro para cima etc...fixed - com input label mantem o testo fixo no incio do input -
          toggleMarginTop: undefined, //30px....1rem etc
          toggleMarginBottom: undefined, //enviar '1px', '1rem', .....
        },
      },
    },

    //=== SELECT ===
    {
      name: 'gender',
      typeFieldForm: EFieldDynamicForm.SELECT,
      initialValue: 'male',
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      fieldsConfigs: {
        selectConfigs: {
          selectLabel: 'Gênero',
          selectPlaceholder: 'Selecione seu gênero',

          selectOptions: [
            { value: 'male', label: 'Masculino' },
            { value: 'female', label: 'Feminino' },
            { value: 'other', label: 'Outro' },
          ],
          selectModeType: 'single',

          selectColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          selectBorderColor: 'transparent', //default primary....enviar 'var()'... rgb ...rgba etc
          selectOptionIconColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          selectOptionIconFontSize: undefined, //enviar '1px', '1rem',
          selectBackground: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
        },
      },
    },

    // === CHECKBOX ===
    {
      name: 'accept_terms',
      typeFieldForm: EFieldDynamicForm.CHECKBOX,
      initialValue: false,
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      //parte checkBox
      fieldsConfigs: {
        checkBoxConfigs: {
          checkBoxLabel: 'Aceito os termos e condições',
          checkBoxLabelColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          checkBorderCheckBoxColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          checkedCheckBoxColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          checkBoxPaddingStart: undefined, //pode ser uma string como '8px', '0.5rem', etc
          checkBoxPaddingLeft: undefined, // enviar '1px', '1rem',......
          checkBoxPaddingTop: undefined, //enviar '1px', '1rem', -> aki que controla junto com o padding bottom o height desse input
          checkBoxPaddingBottom: undefined, //enviar '1px', '1rem', -> aki que controla junto com o padding top o height desse input
          checkBoxMarginTop: undefined, // enviar '1px', '1rem',......
          checkBoxItemLinesDow: undefined, //"full" ｜ "inset" ｜ "none".....
          chechBoxIconBorderRadius: undefined, ////enviar '1px', '1rem - arrendonda o icon de chheck ',
        },
      },
    },

    // === RADIO ===
    {
      name: 'experience_level',
      typeFieldForm: EFieldDynamicForm.RADIO,
      initialValue: '',
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      //parte checkBox
      fieldsConfigs: {
        radioConfigs: {
          radioLabel: 'Nível de Experiência',
          radioItemMarginTop: undefined, //enviar '1px', '1rem', - margin top do itemdo radio pra o campo acima
          radioItemNoneLines: undefined, //"full" ｜ "inset" ｜ "none"..... - crado aki para nao confitar com o do item geral
          radioItemborderRadius: undefined, //enviar '1px', '1rem', - caso tenha bordas pelo fill
          backgroundRadioItem: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

          titleRadioMarginLeft: undefined, //enviar '1px', '1rem',
          titleRadioMarginRight: undefined, //enviar '1px', '1rem',
          titleRadioMarginTop: undefined, //enviar '1px', '1rem',
          textRadioTitleColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          textRadioTitleTextAlign: undefined, // onde vai ficar o titulo na linha para o Radio
          borderColorRadioCheck: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          backgroundColorRadioCheck: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          BorderRadiusradioCheck: undefined, //enviar '1px', '1rem',
          textOptionRadioColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

          selectOptions: [
            { value: 'beginner', label: 'Iniciante' },
            { value: 'intermediate', label: 'Intermediário' },
            { value: 'advanced', label: 'Avançado2' },
            { value: 'beginner2', label: 'Iniciante2' },
            { value: 'intermediate2', label: 'Intermediário2' },
            { value: 'advanced2', label: 'Avançado2' },
          ],
        },
      },
    },

    // === DATE ===
    {
      name: 'birth_date', //namo do form control field
      typeFieldForm: EFieldDynamicForm.DATE, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments
      validations: [Validators.required], //validacoes do formulario //validacoes do
      initialValue: '', //'2025-12-01',
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      fieldsConfigs: {
        inputConfigs: {
          eInputModeField: EInputModeField.TEXT, //mode de entrada do input - text,password,email,number,search,tel,url
          placeholderInput: 'Selecione a data', //a escrita que fica no input porem some quando escreve algo em cima
          backgroundInput:
            'color-mix(in srgb, var(--ion-color-primary), white 96%)', //'color-mix(in srgb, var(--ion-color-primary), white 96%)', //
          colorLabelPlaceholderAndTextInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          maxLengthInput: undefined, //max quantidade de caracteres que o input suporta
          minLengthInput: undefined, //min caracteres que deve ter o input

          labelInput: undefined, //label que aparece na parte superior do input
          autofocusInput: undefined, //true, false
          maskInput: undefined, //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....

          //parte asteristico * de valor requerido no fim do input
          asteristicRequiredInput: undefined, //true or false
          asteristicRequiredSlotInput: undefined, // 'start' | 'end' - default end; local onde vai ser posicionado
          asteristicRequiredColorInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

          //sobre icones
          showPasswordIcon: false, //controla o olho do password com risco ou sem risco mostrar ou não

          dateTimeOrTimeInputType: {
            titleModalDate: 'Selecione a data',
            titleColorModalDate: undefined, //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
            titleFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
            buttonColorModalDate: undefined, //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
            buttonFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
          },

          //buttons downs input - botoes de url ou  que quiser abaixo do input tipo o esqueceu senha etc...na verdade o esqueceu senha vai ser um desses teremos 2 posiveis opcoes
          buttonOneDownInput: {
            //botao 1
            showButtonOneDownInput: undefined, //boolean para exibir o botão essa propriedade é obrigatoria true,
            sizeColumnButtonOneDownInput: undefined, // numero do grid que vai ocupar na coluna 3, 6 ou 12 permitido
            paddingLeftButtonOneDownInput: undefined, //enviar '1px', '1rem', .....
            justifyContentButtonOneDownInput: undefined, // 'flex-start' 'flex-end' 'center';
            linkButtonOneDownInput: undefined, //url ou page que vai ser enviado quando clicar
            fontSizebuttonOneDownInput: undefined, //enviar '1px', '1rem', .....
            colorTextbuttonOneDownInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
            textButtonOneDownInput: 'Esqueceu Senha?', //texto do que vai dizer o botao exemplo - esqueceu senha
          },
          //
          buttonTwoDownInput: {
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
        },
      },
    },

    // === DATE TIME ===
    {
      name: 'agendamentoDataHora', //namo do form control field
      typeFieldForm: EFieldDynamicForm.DATE_TIME, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments
      initialValue: '', //'2025-12-01T23:55',
      validations: [Validators.required], //validacoes do formulario //validacoes do
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      fieldsConfigs: {
        inputConfigs: {
          eInputModeField: EInputModeField.TEXT, //mode de entrada do input - text,password,email,number,search,tel,url
          placeholderInput: 'Selecione a data e hora', //a escrita que fica no input porem some quando escreve algo em cima
          backgroundInput:
            'color-mix(in srgb, var(--ion-color-primary), white 96%)', //'color-mix(in srgb, var(--ion-color-primary), white 96%)', //
          colorLabelPlaceholderAndTextInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          maxLengthInput: undefined, //max quantidade de caracteres que o input suporta
          minLengthInput: undefined, //min caracteres que deve ter o input

          labelInput: undefined, //label que aparece na parte superior do input
          autofocusInput: undefined, //true, false
          maskInput: undefined, //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....

          //parte asteristico * de valor requerido no fim do input
          asteristicRequiredInput: undefined, //true or false
          asteristicRequiredSlotInput: undefined, // 'start' | 'end' - default end; local onde vai ser posicionado
          asteristicRequiredColorInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

          //sobre icones
          showPasswordIcon: false, //controla o olho do password com risco ou sem risco mostrar ou não

          dateTimeOrTimeInputType: {
            titleModalDate: 'Selecione a data e hora',
            titleColorModalDate: undefined, //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
            titleFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
            buttonColorModalDate: undefined, //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
            buttonFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
          },

          //buttons downs input - botoes de url ou  que quiser abaixo do input tipo o esqueceu senha etc...na verdade o esqueceu senha vai ser um desses teremos 2 posiveis opcoes
          buttonOneDownInput: {
            //botao 1
            showButtonOneDownInput: undefined, //boolean para exibir o botão essa propriedade é obrigatoria true,
            sizeColumnButtonOneDownInput: undefined, // numero do grid que vai ocupar na coluna 3, 6 ou 12 permitido
            paddingLeftButtonOneDownInput: undefined, //enviar '1px', '1rem', .....
            justifyContentButtonOneDownInput: undefined, // 'flex-start' 'flex-end' 'center';
            linkButtonOneDownInput: undefined, //url ou page que vai ser enviado quando clicar
            fontSizebuttonOneDownInput: undefined, //enviar '1px', '1rem', .....
            colorTextbuttonOneDownInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
            textButtonOneDownInput: 'Esqueceu Senha?', //texto do que vai dizer o botao exemplo - esqueceu senha
          },
          //
          buttonTwoDownInput: {
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
        },
      },
    },

    // === TIME ===
    {
      name: 'preferred_time', //namo do form control field
      typeFieldForm: EFieldDynamicForm.TIME, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments
      initialValue: '', //'23:55',
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: itemContainerFieldsConfigs,

      fieldsConfigs: {
        inputConfigs: {
          eInputModeField: EInputModeField.TEXT, //mode de entrada do input - text,password,email,number,search,tel,url
          placeholderInput: 'Selecione o horário', //a escrita que fica no input porem some quando escreve algo em cima
          backgroundInput:
            'color-mix(in srgb, var(--ion-color-primary), white 96%)', //'color-mix(in srgb, var(--ion-color-primary), white 96%)', //
          colorLabelPlaceholderAndTextInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
          maxLengthInput: undefined, //max quantidade de caracteres que o input suporta
          minLengthInput: undefined, //min caracteres que deve ter o input

          labelInput: undefined, //label que aparece na parte superior do input
          autofocusInput: undefined, //true, false
          maskInput: undefined, //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....

          //parte asteristico * de valor requerido no fim do input
          asteristicRequiredInput: undefined, //true or false
          asteristicRequiredSlotInput: undefined, // 'start' | 'end' - default end; local onde vai ser posicionado
          asteristicRequiredColorInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

          //sobre icones
          showPasswordIcon: false, //controla o olho do password com risco ou sem risco mostrar ou não

          dateTimeOrTimeInputType: {
            titleModalDate: 'Selecione o horário',
            titleColorModalDate: undefined, //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
            titleFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
            buttonColorModalDate: undefined, //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
            buttonFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
          },

          //buttons downs input - botoes de url ou  que quiser abaixo do input tipo o esqueceu senha etc...na verdade o esqueceu senha vai ser um desses teremos 2 posiveis opcoes
          buttonOneDownInput: {
            //botao 1
            showButtonOneDownInput: undefined, //boolean para exibir o botão essa propriedade é obrigatoria true,
            sizeColumnButtonOneDownInput: undefined, // numero do grid que vai ocupar na coluna 3, 6 ou 12 permitido
            paddingLeftButtonOneDownInput: undefined, //enviar '1px', '1rem', .....
            justifyContentButtonOneDownInput: undefined, // 'flex-start' 'flex-end' 'center';
            linkButtonOneDownInput: undefined, //url ou page que vai ser enviado quando clicar
            fontSizebuttonOneDownInput: undefined, //enviar '1px', '1rem', .....
            colorTextbuttonOneDownInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
            textButtonOneDownInput: 'Esqueceu Senha?', //texto do que vai dizer o botao exemplo - esqueceu senha
          },
          //
          buttonTwoDownInput: {
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
        },
      },
    },

    //   IMAGE === VIDEO === DOCUMENTOS
    {
      name: 'videoImageOrDocuments',
      typeFieldForm: EFieldDynamicForm.VIDEOIMAGEORDOCUMENTS, // tipo de campo
      initialValue: '',
      disabled: undefined,

      defaultAllFieldsConfigs: defaultAllFieldsConfigs,

      itemContainerFieldsConfigs: {
        ...itemContainerFieldsConfigs,
        paddingBottom: '10px',
        paddingTop: '10px',
        labelConfigs: {
          ...itemContainerFieldsConfigs.labelConfigs,
          textLabelItemMain: 'IMAGE VIDEO OU DOCUMENTOS',
        },
      },

      fieldsConfigs: {
        mediasConfigs: {
          avatarOrImageHeight: '130px',
          avatarOrImageWidth: '130px',
          fileAccept: eFileAccept.ALL,
          maxTotalMedia: 5,
          maxVideos: 1,
        },
      },

      // //relacionado a bordas do item
      // //relacionados aos estilos *********************
      // disabled: undefined, //disabelita o campo
      // //hidden: undefined, //esconde o campo
      // paddingStart: undefined, //pode ser uma string como '8px', '0.5rem', etc
      // paddingLeft: '10px', // enviar '1px', '1rem',......                                                       -- ion-label
      // marginBottom: undefined, //// enviar '1px', '1rem',......
      // marginTop: '14px',

      // border: undefined, //'full' | 'none' | 'bottom'
      // borderRadius: '8px', //30px....1rem etc
      // borderColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

      // //relacionado a cor e background color
      // backgroundItem: 'color-mix(in srgb, var(--ion-color-primary), white 96%)', //undefined, //default transparent....enviar 'var()'... rgb ...rgba etc
      // color: undefined, //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc

      // //relacionados a font
      // fontWeight: undefined, // enviar '600' '700' ....                                                           -- ion-item-divider
      // fontSize: undefined, // enviar '1px', '1rem', .....
      // textAlign: undefined, // enviar 'left' | 'center' | 'right'//alinhamento do texto label...input etc

      // //relacionado a icon - caso envie o help pode configurar o icon
      // iconMarginLeft: undefined, // enviar '1px', '1rem', .....                                                   -- ion-icon
      // iconFontSize: undefined, //enviar '1px', '1rem', .....                                                      -- ion-icon
      // iconColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc                                -- ion-icon

      // //para medias
      // mediasCustomColorAndBorderColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
    },
  ];
};
