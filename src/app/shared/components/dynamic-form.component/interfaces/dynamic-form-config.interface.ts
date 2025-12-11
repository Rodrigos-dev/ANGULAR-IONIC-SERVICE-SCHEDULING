import { FormGroup, ValidatorFn } from '@angular/forms';
import { EFieldDynamicForm } from '../enums/field-dynamic-form.enum';
import {
  AsteristicRequiredType,
  DateFieldInitialValue,
  FillInputType,
  JustifyContentButtonDownInputType,
  LabelPlacementType,
  SizeColumnButtonDownInputType,
} from '../types/input-field.type';
import { BorderType, TextAlignType } from '../types/styles-field.type';
import { EMaskType } from '../enums/mask-types.enum';
import { EInputModeField } from '../enums/input-mode-field.enum';
import { linesShowType } from '../types/ion-item.type';
import { Select } from './select.input.interface';
import { eFileAccept } from '../enums/image-video-document.enum';

export interface IDynamicFormConfig {
  name: string; //nome do campo no formulario formname
  typeFieldForm: EFieldDynamicForm; //tipo de campo do formulario desejado ...input..select etc

  labelItemTop?: string; // label para usar no itm...ELE FICA sobre o input em si COM UM TITULO DO CAMPO POREM TEM O INPUT LABEL TB PARA ENVIAR QUE EH O LABEL DO INPUT
  help?: string; // DICA DO QUE FAZ OU WARNIG DO CAMPO

  hint?: string; //compo de dica - do que o campo faz ou o que deve ser feito pelo usuario etc
  hintMarginLeft?: string; // enviar '1px', '1rem',......
  hintFontSize?: string; // enviar '1px', '1rem',......
  hintColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc

  //cada icon temos o padrao porem se enviar vai usar o enviado
  iconName?: string; //caso envie deve adicionar no ts o icon caso de erro pela doc https://ionicframework.com/docs/api/icon no construtor ex: - addIcons({ logoIonic });

  //grid e responsividades
  size?: number; //tamanho da grid em desktop 'LG' na column porexemplo
  mobileSize?: number; //tamanho da grid em celular 'XS' na colunn por exemplo

  //parte asteristico * de valor requerido no fim do input
  asteristicRequiredLabelItem?: boolean; //true or false
  asteristicRequiredColorLabelItem?: string; //default primary....enviar 'var()'... rgb ...rgba etc

  //relacionados aos estilos *********************
  disabled?: boolean; //disabelita o campo
  hidden?: boolean; //esconde o campo
  marginBottom?: string; //// enviar '1px', '1rem',......
  paddingStart?: string; //pode ser uma string como '8px', '0.5rem', etc
  paddingLeft?: string; // enviar '1px', '1rem',......
  paddingTop?: string; //enviar '1px', '1rem', -> aki que controla junto com o padding bottom o height do check box
  paddingBottom?: string; //enviar '1px', '1rem', -> aki que controla junto com o padding top o height do check box

  //relacionado a bordas
  border?: BorderType; //'full' | 'none' | 'bottom'
  borderRadius?: string; //30px....1rem etc
  borderColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  marginTop?: string; //30px....1rem etc

  //relacionado a cor e background color
  backgroundItem?: string; //default transparent....enviar 'var()'... rgb ...rgba etc
  color?: string; //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc

  //ion item - ion-item-divider
  itemDividerStick?: boolean; //mantem o divider parado caso role a tela
  ionItemDetail?: boolean; //true add aquela seta no fim do item
  ionItemNoneLines?: linesShowType; //"full" ｜ "inset" ｜ "none".....

  //relacionados a font
  fontWeight?: string; // enviar '600' '700' ....
  fontSize?: string; // enviar '1px', '1rem', .....
  textAlign?: TextAlignType; //'left' | 'center' | 'right'//alinhamento do texto label...input etc

  //relacionado a icon - caso envie o help pode configurar o icon
  iconMarginLeft?: string; // enviar '1px', '1rem', .....
  iconFontSize?: string; //enviar '1px', '1rem', .....
  iconColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc

  //relacionado input e text area- text area nao tem os botoes url abaixo do input igual do inpu
  autofocus?: boolean; //true, false
  backgroundInput?: string; //default transparent....enviar 'var()'... rgb ...rgba etc
  mask?: EMaskType; //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....
  placeholder?: string; //a escrita que fica no input porem some quando escreve algo em cima
  fill?: FillInputType; //"outline" ｜ "solid" - bordas no outline - background no solid
  eInputModeField?: EInputModeField; //mode de entrada do input - text,password,email,number,search,tel,url
  inputLabel?: string; //label que aparece na parte superior do input
  labelPlacement?: LabelPlacementType; //fixed, floating, stacked, start.... escrita dentro do input ou aquela que movimaneta de dentro para cima etc...fixed - com input label mantem o testo fixo no incio do input -
  showPasswordIcon?: boolean; //controla o olho do password comrisco ou sem risco
  boderColorInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  boderWidthInput?: string; // enviar '1px', '1rem', .....
  colorLabelPlaceholderAndTextInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  maxLengthInput?: number; //max quantidade de caracteres que o input suporta
  minLengthInput?: number; //min caracteres que deve ter o input
  readonlyInput?: boolean; // true ou false
  onChange?: (
    data: unknown | null | object | boolean | string | number,
    form: FormGroup
  ) => void; //funcao que retorna os valores do input
  onAddOnIconClick?: (form: FormGroup) => void;
  initialValue?: DateFieldInitialValue; //valor inicial do input - para updates etc - caso seja data ou time o input YYYY-MM-DDTHH:mm, YYYY-MM-DD, HH:mm
  validations?: ValidatorFn | ValidatorFn[]; //erros configurados no validations do input

  //parte asteristico * de valor requerido no fim do input
  asteristicRequiredInput?: boolean; //true or false
  asteristicRequiredSlotInput?: AsteristicRequiredType; // 'start' | 'end'; local onde vai ser posicionado
  asteristicRequiredColorInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc

  textAreaRows?: number; //quantidade de linhas disponiveis paratar no text area

  //input tipo date time ou date time
  titleColorModalDate?: string; //titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
  titleFontSizeModalDate?: string; //enviar '1px', '1rem', .....
  buttonColorModalDate?: string; //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
  buttonFontSizeModalDate?: string; //enviar '1px', '1rem', .....

  //botoes de url abaixo do input tipo o esqueceu senha etc...na verdade o esqueceu senha vai ser um desses teremos 2 posiveis opcoes
  //botao 1
  showButtonOneDownInput?: boolean; //boolean para exibir o botão essa propriedade é obrigatoria true,
  sizeColumnButtonOneDownInput?: SizeColumnButtonDownInputType; // numero do grid que vai ocupar na coluna 3, 6 ou 12 permitido
  paddingLeftButtonOneDownInput?: string; //enviar '1px', '1rem', .....
  justifyContentButtonOneDownInput?: JustifyContentButtonDownInputType; // 'flex-start' 'flex-end' 'center';
  linkButtonOneDownInput?: string; //url ou page que vai ser enviado quando clicar
  fontSizebuttonOneDownInput?: string; //enviar '1px', '1rem', .....
  colorTextbuttonOneDownInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  textButtonOneDownInput?: string; //texto do que vai dizer o botao exemplo - esqueceu senha?

  //botao 2
  showButtonTwoDownInput?: boolean; //boolean para exibir o botão essa propriedade é obrigatoria true,
  sizeColumnButtonTwoDownInput?: SizeColumnButtonDownInputType; // numero do grid que vai ocupar na coluna 12 é o max ocupa linha toda
  paddingLeftButtonTwoDownInput?: string; //enviar '1px', '1rem', .....
  justifyContentButtonTwoDownInput?: JustifyContentButtonDownInputType; // 'flex-start' 'flex-end' 'center';
  linkButtonTwoDownInput?: string; //url ou page que vai ser enviado quando clicar
  fontSizebuttonTwoDownInput?: string; //enviar '1px', '1rem', .....
  colorTextbuttonTwoDownInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  textButtonTwoDownInput?: string; //texto do que vai dizer o botao exemplo - esqueceu senha?

  //---------- toggle
  toggleLabelMarginLeft?: string; //enviar '1px', '1rem', .....
  toggleLabelFontSize?: string; //enviar '1px', '1rem', .....
  toggleLabelColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  toggleLabel?: string; //texto do titulo do campo
  toggleNote?: string; //texto para indicar alguma dica sobre o campo
  toggleNoteColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  toggleNoteMarginLeft?: string; //enviar '1px', '1rem', .....
  toggleNoteFontSize?: string; //enviar '1px', '1rem', .....

  //PARTE SELECT
  onOpenChange?: (open: boolean, form: FormGroup) => void;
  select?: Select;
  selectColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  selectBorderColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  selectOptionIconColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  selectOptionIconFontSize?: string; //enviar '1px', '1rem',
  selectBackground?: string; //default primary....enviar 'var()'... rgb ...rgba etc

  //parte checkBox
  textCheckBoxColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  checkBorderCheckBoxColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  checkedCheckBoxColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  chechBoxIconBorderRadius?: string; ////enviar '1px', '1rem',
  radioItemMarginTop?: string; //enviar '1px', '1rem', - margin top do itemdo radio pra o campo acima
  radioItemNoneLines?: linesShowType; //"full" ｜ "inset" ｜ "none"..... - crado aki para nao confitar com o do item geral
  radioItemborderRadius?: string; //enviar '1px', '1rem',
  backgroundRadioItem?: string; //default primary....enviar 'var()'... rgb ...rgba etc

  titleRadioMarginLeft?: string; //enviar '1px', '1rem',
  titleRadioMarginRight?: string; //enviar '1px', '1rem',
  titleRadioMarginTop?: string; //enviar '1px', '1rem',
  textRadioTitleColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  textRadioTitleTextAlign?: TextAlignType; // onde vai ficar o titulo na linha para o Radio
  borderColorRadioCheck?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  backgroundColorRadioCheck?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  BorderRadiusradioCheck?: string; //enviar '1px', '1rem',
  textOptionRadioColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc

  //PARTE AVATAR E MEDIAS
  fileAccept?: eFileAccept; //mime types das midias
  avatarOrImageHeight?: string; //enviar '1px', '1rem',
  avatarOrImageWidth?: string; //enviar '1px', '1rem',
  maxVideos?: number; //quantidade maxima de videos para adcionar
  maxTotalMedia?: number; ////quantidade maxima de medias - doc+video+image para adcionar
  mediasCustomColorAndBorderColor?: string; ////default primary....enviar 'var()'... rgb ...rgba etc
}
