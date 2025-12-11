import { Validators } from '@angular/forms';
import { EFieldDynamicForm } from 'src/app/shared/components/dynamic-form.component/enums/field-dynamic-form.enum';
import { eFileAccept } from 'src/app/shared/components/dynamic-form.component/enums/image-video-document.enum';
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

    //   // === AVATAR ===
    {
      labelItemTop: 'Foto de Perfil',
      name: 'avatar',
      typeFieldForm: EFieldDynamicForm.AVATAR, // tipo de campo
      initialValue: '',
      avatarOrImageHeight: '130px',
      avatarOrImageWidth: '130px',
      ionItemNoneLines: 'none',
      size: 12,
      fileAccept: eFileAccept.IMAGE,

      //relacionado a bordas do item
      //relacionados aos estilos *********************

      border: undefined, //'full' | 'none' | 'bottom'
      borderRadius: '8px', //30px....1rem etc
      borderColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      backgroundItem: 'color-mix(in srgb, var(--ion-color-primary), white 96%)', //undefined, //default transparent....enviar 'var()'... rgb ...rgba etc

      disabled: undefined, //disabelita o campo
      hidden: undefined, //esconde o campo
      paddingStart: undefined, //pode ser uma string como '8px', '0.5rem', etc
      paddingLeft: '10px', // enviar '1px', '1rem',......                                                       -- ion-label
      marginBottom: undefined, //// enviar '1px', '1rem',......
      marginTop: '14px',

      //ion item - ion-item-divider
      itemDividerStick: undefined, //true ou false

      //relacionados a font na parte do item
      fontWeight: undefined, // enviar '600' '700' ....                                                           -- ion-item-divider
      fontSize: undefined, // enviar '1px', '1rem', .....
      textAlign: undefined, // enviar 'left' | 'center' | 'right'//alinhamento do texto label...input etc

      //relacionado a icon - caso envie o help pode configurar o icon
      iconMarginLeft: undefined, // enviar '1px', '1rem', .....                                                   -- ion-icon
      iconFontSize: undefined, //enviar '1px', '1rem', .....                                                      -- ion-icon
      iconColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc                                -- ion-icon

      color: undefined, //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc
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

      inputLabel: 'Nome', //label que aparece na parte superior do input
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

      //input tipo date time ou date time
      titleColorModalDate: undefined, //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
      titleFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
      buttonColorModalDate: undefined, //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
      buttonFontSizeModalDate: undefined, //enviar '1px', '1rem', .....

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

    // === INPUT TEXT AREA===
    {
      name: 'sobreVoce', //namo do form control field
      typeFieldForm: EFieldDynamicForm.TEXTAREA, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments

      help: undefined, //balao de dica quando clica - input para nome completo por exemplo
      labelItemTop: undefined, //label que fica fora do input - label no dividir é o titulo no resto e o nome do campo que fica no superior
      iconName: undefined, //caso envie deve adicionar no ts o icon caso de erro pela doc https://ionicframework.com/docs/api/icon no construtor ex: - addIcons({ logoIonic });

      hint: undefined, //compo de dica - do que o campo faz ou o que deve ser feito pelo usuario etc
      hintMarginLeft: undefined, // enviar '1px', '1rem',......
      hintFontSize: undefined, // enviar '1px', '1rem',......
      hintColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      validations: undefined, //validacoes do formulario

      //relacionado a grid e responsividade
      size: 12, //tamanho da grid em desktop 'LG' na column e with que ocupa naos campos por exemplo
      mobileSize: undefined, //tamanho da grid em celular 'XS' na colunn por exemplo

      ionItemDetail: undefined, //true add aquela seta no fim do item
      ionItemNoneLines: 'none', //"full" ｜ "inset" ｜ "none".....

      //parte asteristico * de valor requerido no fim do input
      asteristicRequiredLabelItem: true, //true or false
      asteristicRequiredColorLabelItem: 'red', //default primary....enviar 'var()'... rgb ...rgba etc

      //inputs data e text area
      eInputModeField: undefined, //mode de entrada do input - text,password,email,number,search,tel,url
      initialValue: '', //valor que o campo vai iniciar
      placeholder: 'Fale sobre você...', //a escrita que fica no input porem some quando escreve algo em cima
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

      inputLabel: 'Diga sobre você...', //label que aparece na parte superior do input
      autofocus: undefined, //true, false
      mask: undefined, //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....

      textAreaRows: undefined, //quantidade de linhas que vai aparecer em tela o input....

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

    // === SWITCH/TOGGLE ===
    {
      toggleLabel: 'Receber Notificações', //texto do titulo do campo
      name: 'receive_notifications',
      typeFieldForm: EFieldDynamicForm.SWITCH,
      initialValue: true,
      toggleNote: 'Receba notificações por e-mail sobre novidades', //texto para indicar alguma dica sobre o campo
      size: 12,
      fill: 'outline',
      labelPlacement: 'stacked',
      borderRadius: undefined, //30px....1rem etc
      marginTop: '12px', //30px....1rem etc

      toggleLabelMarginLeft: undefined, //enviar '1px', '1rem', .....
      toggleLabelFontSize: undefined, //enviar '1px', '1rem', .....
      toggleLabelColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      toggleNoteColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      toggleNoteMarginLeft: undefined, //enviar '1px', '1rem', .....
      toggleNoteFontSize: undefined, //enviar '1px', '1rem', .....
    },

    //=== SELECT ===
    {
      inputLabel: 'Gênero',
      name: 'gender',
      typeFieldForm: EFieldDynamicForm.SELECT,
      initialValue: 'male',
      placeholder: 'Selecione seu gênero',
      select: {
        options: [
          { value: 'male', label: 'Masculino' },
          { value: 'female', label: 'Feminino' },
          { value: 'other', label: 'Outro' },
        ],
        mode: 'single',
      },
      size: 12,
      fill: 'outline',
      labelPlacement: 'stacked',
      borderRadius: undefined,
      selectColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      selectBorderColor: 'transparent', //default primary....enviar 'var()'... rgb ...rgba etc
      selectOptionIconColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      selectOptionIconFontSize: undefined, //enviar '1px', '1rem',
      selectBackground: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
    },

    // === CHECKBOX ===
    {
      labelItemTop: 'Aceito os termos e condições',
      name: 'accept_terms',
      typeFieldForm: EFieldDynamicForm.CHECKBOX,
      initialValue: false,
      size: 12,
      fill: undefined, //'outline',
      labelPlacement: 'start',
      borderRadius: '10px',
      ionItemNoneLines: 'none', //"full" ｜ "inset" ｜ "none".....

      //parte checkBox
      textCheckBoxColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      checkBorderCheckBoxColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      checkedCheckBoxColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      paddingStart: undefined, //pode ser uma string como '8px', '0.5rem', etc
      paddingLeft: undefined, // enviar '1px', '1rem',......
      paddingTop: undefined, //enviar '1px', '1rem', -> aki que controla junto com o padding bottom o height desse input
      paddingBottom: undefined, //enviar '1px', '1rem', -> aki que controla junto com o padding top o height desse input
      chechBoxIconBorderRadius: undefined, ////enviar '1px', '1rem - arrendonda o icon de chheck ',
    },

    // === RADIO ===
    {
      inputLabel: 'Nível de Experiência',
      name: 'experience_level',
      typeFieldForm: EFieldDynamicForm.RADIO,
      initialValue: '', //inicia o valor selecionado
      select: {
        options: [
          { value: 'beginner', label: 'Iniciante' },
          { value: 'intermediate', label: 'Intermediário' },
          { value: 'advanced', label: 'Avançado2' },
          { value: 'beginner2', label: 'Iniciante2' },
          { value: 'intermediate2', label: 'Intermediário2' },
          { value: 'advanced2', label: 'Avançado2' },
        ],
      },
      size: 12,
      fill: 'outline',
      labelPlacement: 'start',
      borderRadius: '10px',

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
    },

    // === DATE ===
    {
      name: 'birth_date', //namo do form control field
      typeFieldForm: EFieldDynamicForm.DATE, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments

      help: undefined, //balao de dica quando clica - input para nome completo por exemplo
      labelItemTop: undefined, //label que fica fora do input - label no dividir é o titulo no resto e o nome do campo que fica no superior
      iconName: undefined, //caso envie deve adicionar no ts o icon caso de erro pela doc https://ionicframework.com/docs/api/icon no construtor ex: - addIcons({ logoIonic });

      hint: undefined, //compo de dica - do que o campo faz ou o que deve ser feito pelo usuario etc
      hintMarginLeft: undefined, // enviar '1px', '1rem',......
      hintFontSize: undefined, // enviar '1px', '1rem',......
      hintColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      validations: [Validators.required], //validacoes do formulario

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
      initialValue: '2025-12-01', //valor que o campo vai iniciar - //valor inicial do input - para updates etc - caso seja data ou time o input YYYY-MM-DDTHH:mm, YYYY-MM-DD, HH:mm
      placeholder: 'Selecione a data', //a escrita que fica no input porem some quando escreve algo em cima
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

      inputLabel: 'Data de Nascimento', //label que aparece na parte superior do input
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

      //input tipo date time ou date time
      titleColorModalDate: undefined, //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
      titleFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
      buttonColorModalDate: undefined, //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
      buttonFontSizeModalDate: undefined, //enviar '1px', '1rem', .....

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

    // === DATE TIME ===
    {
      name: 'agendamentoDataHora', //namo do form control field
      typeFieldForm: EFieldDynamicForm.DATE_TIME, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments

      help: undefined, //balao de dica quando clica - input para nome completo por exemplo
      labelItemTop: undefined, //label que fica fora do input - label no dividir é o titulo no resto e o nome do campo que fica no superior
      iconName: undefined, //caso envie deve adicionar no ts o icon caso de erro pela doc https://ionicframework.com/docs/api/icon no construtor ex: - addIcons({ logoIonic });

      hint: undefined, //compo de dica - do que o campo faz ou o que deve ser feito pelo usuario etc
      hintMarginLeft: undefined, // enviar '1px', '1rem',......
      hintFontSize: undefined, // enviar '1px', '1rem',......
      hintColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      validations: [Validators.required], //validacoes do formulario

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
      initialValue: '2025-12-01T23:55', //valor que o campo vai iniciar
      placeholder: 'Selecione a data e hora', //a escrita que fica no input porem some quando escreve algo em cima
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

      inputLabel: 'Data e Hora de Agendamento', //label que aparece na parte superior do input
      autofocus: undefined, //true, false
      mask: undefined, //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....

      //parte asteristico * de valor requerido no fim do input
      asteristicRequiredInput: undefined, //true or false
      asteristicRequiredSlotInput: undefined, // 'start' | 'end' - default end; local onde vai ser posicionado
      asteristicRequiredColorInput: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

      //input tipo date time ou date time
      titleColorModalDate: undefined, //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
      titleFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
      buttonColorModalDate: undefined, //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
      buttonFontSizeModalDate: undefined, //enviar '1px', '1rem', .....

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

    // === TIME ===
    {
      name: 'preferred_time', //namo do form control field
      typeFieldForm: EFieldDynamicForm.TIME, // tipo de campo input, number, select, textArea, checkbox, date, time, dateTime, switch, avatar, termsPolicy, selectUser, divider, radio, image, video, videoImageOrDocuments

      help: undefined, //balao de dica quando clica - input para nome completo por exemplo
      labelItemTop: undefined, //label que fica fora do input - label no dividir é o titulo no resto e o nome do campo que fica no superior
      iconName: undefined, //caso envie deve adicionar no ts o icon caso de erro pela doc https://ionicframework.com/docs/api/icon no construtor ex: - addIcons({ logoIonic });

      hint: undefined, //compo de dica - do que o campo faz ou o que deve ser feito pelo usuario etc
      hintMarginLeft: undefined, // enviar '1px', '1rem',......
      hintFontSize: undefined, // enviar '1px', '1rem',......
      hintColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
      validations: [Validators.required], //validacoes do formulario

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
      initialValue: '23:55', //valor que o campo vai iniciar
      placeholder: 'Selecione o horário', //a escrita que fica no input porem some quando escreve algo em cima
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

      inputLabel: 'Horário Preferido', //label que aparece na parte superior do input
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

      //input tipo date time ou date time
      titleColorModalDate: undefined, //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
      titleFontSizeModalDate: undefined, //enviar '1px', '1rem', .....
      buttonColorModalDate: undefined, //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
      buttonFontSizeModalDate: undefined, //enviar '1px', '1rem', .....

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

    //   IMAGE === VIDEO === DOCUMENTOS
    {
      name: 'videoImageOrDocuments',
      typeFieldForm: EFieldDynamicForm.VIDEOIMAGEORDOCUMENTS, // tipo de campo
      labelItemTop: 'IMAGE VIDEO OU DOCUMENTOS',

      initialValue: '',
      avatarOrImageHeight: '130px',
      avatarOrImageWidth: '130px',
      ionItemNoneLines: 'none',
      size: 12,
      fileAccept: eFileAccept.ALL,
      maxTotalMedia: 5,
      maxVideos: 1,

      //relacionado a bordas do item
      //relacionados aos estilos *********************
      disabled: undefined, //disabelita o campo
      hidden: undefined, //esconde o campo
      paddingStart: undefined, //pode ser uma string como '8px', '0.5rem', etc
      paddingLeft: '10px', // enviar '1px', '1rem',......                                                       -- ion-label
      marginBottom: undefined, //// enviar '1px', '1rem',......
      marginTop: '14px',

      border: undefined, //'full' | 'none' | 'bottom'
      borderRadius: '8px', //30px....1rem etc
      borderColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc

      //relacionado a cor e background color
      backgroundItem: 'color-mix(in srgb, var(--ion-color-primary), white 96%)', //undefined, //default transparent....enviar 'var()'... rgb ...rgba etc
      color: undefined, //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc

      //relacionados a font
      fontWeight: undefined, // enviar '600' '700' ....                                                           -- ion-item-divider
      fontSize: undefined, // enviar '1px', '1rem', .....
      textAlign: undefined, // enviar 'left' | 'center' | 'right'//alinhamento do texto label...input etc

      //relacionado a icon - caso envie o help pode configurar o icon
      iconMarginLeft: undefined, // enviar '1px', '1rem', .....                                                   -- ion-icon
      iconFontSize: undefined, //enviar '1px', '1rem', .....                                                      -- ion-icon
      iconColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc                                -- ion-icon

      //para medias
      mediasCustomColorAndBorderColor: undefined, //default primary....enviar 'var()'... rgb ...rgba etc
    },
  ];
};
