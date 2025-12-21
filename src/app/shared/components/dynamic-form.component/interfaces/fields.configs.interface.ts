import { FormGroup } from '@angular/forms';
import { EInputModeField } from '../enums/input-mode-field.enum';
import { EMaskType } from '../enums/mask-types.enum';
import {
  AsteristicRequiredType,
  FillType,
  JustifyContentButtonDownInputType,
  LabelPlacementType,
  SizeColumnButtonDownInputType,
} from '../types/input-field.type';
import { linesShowType } from '../types/ion-item.type';
import { BorderType, TextAlignType } from '../types/styles-field.type';
import { ISelectOptions } from './select.input.interface';
import { SelectModeType } from '../types/select-input.type';
import { Options } from 'src/app/shared/interfaces/dynamic-form-config.interface';
import { Observable } from 'rxjs';
import { eFileAccept } from '../enums/image-video-document.enum';

//interface base que vai conter todas as outras
export interface baseConfigsFormFields {
  avatarConfigs?: IAvatarFieldConfigs;
  inputConfigs?: IInputConfigs;
  toggleConfigs?: IToggleFieldConfigs;
  selectConfigs?: ISelectFieldConfigs;
  checkBoxConfigs?: ICheckBoxConfigs;
  radioConfigs?: IRadioConfigs;
  mediasConfigs?: IMediasConfigs;
}

//********************************************** */

export interface IDefaultAllFieldsConfigs {
  sizeGridMainColumn?: number; //tamanho da grid em desktop 'LG' na column porexemplo 3 6 9 12
  mobileSizeGridMainColumn?: number; //tamanho da grid em celular 'XS' na colunn por exemplo 3 6 9 12
  hiddenMainColumn?: boolean; //esconde o campo
  marginLeftInput?: string; // caso seja borda redonda ou oval dependendo enviar 7px para nao cortar as bordas
  marginRightInput?: string; // caso seja borda redonda ou oval dependendo enviar 7px para nao cortar as bordas
  border?: BorderType; //'full' | 'none' | 'bottom'
  borderRadius?: string; //30px....1rem etc
  borderColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  borderWidthInput?: string; // enviar '1px', '1rem', .....//adiciona uma borda na parte de baixo do input quando tiver erro
  fill?: FillType; //"outline" ｜ "solid" - bordas no outline - background no solid
  labelPlacement?: LabelPlacementType; //fixed, floating, stacked, start.... escrita dentro do input ou aquela que movimaneta de dentro para cima etc...fixed - com input label mantem o testo fixo no incio do input -

  onChange?: (
    data: unknown | null | object | boolean | string | number,
    form: FormGroup
  ) => void; //funcao que retorna os valores do input
  onAddOnIconClick?: (form: FormGroup) => void;
}

//*********************************************** */

// divider interface -- é o titulo do formulario
export interface IItemDividerConfigs {
  //configuracao do divider que é o titulo do formulario
  paddingStartItemDivider?: string; //pode ser uma string como '8px', '0.5rem', etc
  borderItemDivider?: BorderType; //'full' | 'none' | 'bottom'
  borderColorItemDivider?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  borderRadiusItemDivider?: string; //30px....1rem etc
  backgroundItemItemDivider?: string; //default transparent....enviar 'var()'... rgb ...rgba etc
  stickItemDivider?: boolean; //mantem o divider parado caso role a tela
  marginBottomItemDivider?: string; //enviar '1px', '1rem', -> aki que controla junto com o padding top o height do check box
  textAlignLabelItemDivider?: TextAlignType; //'left' | 'center' | 'right'//alinhamento do texto label...input etc
  colorLabelItemDivider?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  fontWeightLabelItemDivider?: string; // enviar '600' '700' ....
  fontSizeLabelItemDivider?: string; // enviar '1px', '1rem',......
  textLabelItemDivider?: string; //escita principal no item divider - titulo caso tenha um
}

//************************************************************************************************* */

// itemcontainer que contem os campos do formulario nele temos o label...o help
export interface IItemContainerFieldsConfigs {
  //container que empacota todos os inputs
  detailItemFieldsMain?: boolean; //true add aquela seta no fim do item
  noneLinesItemFieldsMain?: linesShowType; //"full" ｜ "inset" ｜ "none".....
  backgroundItemFieldsMain?: string; //default transparent....enviar 'var()'... rgb ...rgba etc
  marginTopItemFieldsMain?: string; //30px....1rem etc

  paddingStart?: string; ////caso envie border e border radius acima de 20px passar o mesmo valor da border radius porem no text area deve ser enviado 50px se nao corta as bordas enviar '1px', '1rem', .....//se o border radius for maior que 20 o padding start deve conter o mesmo valor
  paddingBottom?: string; // enviar '1px', '1rem', .....
  paddingTop?: string; // enviar '1px', '1rem', .....

  asteristicRequiredColorLabelItem?: string; //caso envie exibe um asteristico no campo indicando item obrigatorio - default primary....enviar 'var()'... rgb ...rgba etc

  labelConfigs?: ILabelItemFieldMainConfigs; //no item sobre o input fica o label exemplo - nome, email etc
  iconHelpConfigs?: IIconHelpItemMainConfigs; //icone de ajuda quando clicado exibe um popover com o text help

  hintConfigs?: IHintItemMainConfigs; ////campo que fica logo abaixo do input para dar dica ao usuario do que é o input etc
}

export interface ILabelItemFieldMainConfigs {
  //no item sobre o input fica o label exemplo - nome, email etc
  textLabelItemMain?: string; //texto do label do item fica sobre o input por exemplo...nome
  textAlignLabelItemMain?: TextAlignType; //'left' | 'center' | 'right'//alinhamento do texto label...input etc
  colorLabelItemMain?: string; //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc
  paddingLeftLabelItemMain?: string; // enviar '1px', '1rem',......
  marginBottomLabelItemMain?: string; //// enviar '1px', '1rem',......
  fontSizeLabelItemMain?: string; // enviar '1px', '1rem', .....
}

export interface IIconHelpItemMainConfigs {
  //icone de ajuda quando clicado exibe um popover com o text help
  helpIconName?: string; //ajuda que fica do sobr input clicar em cima exibe um popover
  helpText?: string; //ajuda que fica do sobr input clicar em cima exibe um popover
  helpIconMarginLeft?: string; //// enviar '1px', '1rem',......
  helpIconFontSize?: string; // enviar '1px', '1rem', .....
  helpIconColor?: string; //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc
}

export interface IHintItemMainConfigs {
  //campo que fica logo abaixo do input para dar dica ao usuario do que é o input etc
  hintText?: string;
  hintMarginLeft?: string; // enviar '1px', '1rem', .....
  hintFontSize?: string; // enviar '1px', '1rem', .....
  hintColor?: string; //default var(--ion-color-primary)....enviar 'var()'... rgb ...rgba etc
}

//******************************************************************************************************************************** */

// avatar field
export interface IAvatarFieldConfigs {
  avatarOrImageHeight?: string; //30px....1rem etc
  avatarOrImageWidth?: string; //30px....1rem etc

  buttonOneDownInput?: IButtonOneDownInput;
  buttonTwoDownInput?: IButtonTwoDownInput;
}

//********************************************************************************************************************************** */

export interface IInputConfigs {
  //para input text area e date - time
  //relacionado input e text area- text area nao tem os botoes url abaixo do input igual do inpu
  autofocusInput?: boolean; //true, false
  backgroundInput?: string; //default transparent....enviar 'var()'... rgb ...rgba etc
  maskInput?: EMaskType; //EMaskType : Telephone, Plate, PostalCode, Cpf, Cnpj, Rg, Weight, Measure, Money.....
  placeholderInput?: string; //a escrita que fica no input porem some quando escreve algo em cima
  eInputModeField?: EInputModeField; //mode de entrada do input - text,password,email,number,search,tel,url
  labelInput?: string; //label que aparece na parte superior do input
  marginTopInput?: string; //
  showPasswordIcon?: boolean; //controla o olho do password comrisco ou sem risco
  colorLabelPlaceholderAndTextInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  maxLengthInput?: number; //max quantidade de caracteres que o input suporta
  minLengthInput?: number; //min caracteres que deve ter o input
  readonlyInput?: boolean; // true ou false

  //parte asteristico * de valor requerido no fim do input
  asteristicRequiredInput?: boolean; //true or false
  asteristicRequiredSlotInput?: AsteristicRequiredType; // 'start' | 'end'; local onde vai ser posicionado
  asteristicRequiredColorInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc

  iconNameInput?: string; //
  iconMarginLeftInput?: string; // enviar '1px', '1rem', .....
  iconMarginRightInput?: string; // enviar '1px', '1rem', .....
  iconFontSizeInput?: string; //enviar '1px', '1rem', .....
  iconColorInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc

  dateTimeOrTimeInputType?: IDateTimeOrTimeInputType;
  buttonOneDownInput?: IButtonOneDownInput;
  buttonTwoDownInput?: IButtonTwoDownInput;

  //quando for text area
  textAreaRows?: number; //quantidade de linhas disponiveis paratar no text area
}

export interface IDateTimeOrTimeInputType {
  titleModalDate?: string; //color do titulo do modal de selecionar a data
  titleColorModalDate?: string; //color do titulo do modal de selecionar a data //default primary....enviar 'var()'... rgb ...rgba etc
  titleFontSizeModalDate?: string; //enviar '1px', '1rem', .....
  buttonColorModalDate?: string; //botao que estamos usando selecionar pode ser voltar etc no modal de selecionar data //default primary....enviar 'var()'... rgb ...rgba etc
  buttonFontSizeModalDate?: string; //enviar '1px', '1rem', .....
}

export interface IButtonOneDownInput {
  //botao 1
  showButtonOneDownInput?: boolean; //boolean para exibir o botão essa propriedade é obrigatoria true,
  sizeColumnButtonOneDownInput?: SizeColumnButtonDownInputType; // numero do grid que vai ocupar na coluna 3, 6 ou 12 permitido
  paddingLeftButtonOneDownInput?: string; //enviar '1px', '1rem', .....
  justifyContentButtonOneDownInput?: JustifyContentButtonDownInputType; // 'flex-start' 'flex-end' 'center';
  linkButtonOneDownInput?: string; //url ou page que vai ser enviado quando clicar
  fontSizebuttonOneDownInput?: string; //enviar '1px', '1rem', .....
  colorTextbuttonOneDownInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  textButtonOneDownInput?: string; //texto do que vai dizer o botao exemplo - esqueceu senha?
}

export interface IButtonTwoDownInput {
  //botao 2
  showButtonTwoDownInput?: boolean; //boolean para exibir o botão essa propriedade é obrigatoria true,
  sizeColumnButtonTwoDownInput?: SizeColumnButtonDownInputType; // numero do grid que vai ocupar na coluna 12 é o max ocupa linha toda
  paddingLeftButtonTwoDownInput?: string; //enviar '1px', '1rem', .....
  justifyContentButtonTwoDownInput?: JustifyContentButtonDownInputType; // 'flex-start' 'flex-end' 'center';
  linkButtonTwoDownInput?: string; //url ou page que vai ser enviado quando clicar
  fontSizebuttonTwoDownInput?: string; //enviar '1px', '1rem', .....
  colorTextbuttonTwoDownInput?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  textButtonTwoDownInput?: string; //texto do que vai dizer o botao exemplo - esqueceu senha?
}

//*************************************************************************************************************** */

//---------- toggle
export interface IToggleFieldConfigs {
  toggleLabelMarginLeft?: string; //enviar '1px', '1rem', .....
  toggleLabelFontSize?: string; //enviar '1px', '1rem', .....
  toggleLabelColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  toggleLabel?: string; //texto do titulo do campo
  toggleNote?: string; //texto para indicar alguma dica sobre o campo
  toggleNoteColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  toggleNoteMarginLeft?: string; //enviar '1px', '1rem', .....
  toggleNoteFontSize?: string; //enviar '1px', '1rem', .....
  toggleFill?: FillType; //"outline" ｜ "solid" - bordas no outline - background no solid
  toggleLabelPlacement?: LabelPlacementType; //fixed, floating, stacked, start.... escrita dentro do input ou aquela que movimaneta de dentro para cima etc...fixed - com input label mantem o testo fixo no incio do input -
  toggleMarginTop?: string; //enviar '1px', '1rem', .....
  toggleMarginBottom?: string; //enviar '1px', '1rem', .....

  buttonOneDownInput?: IButtonOneDownInput;
  buttonTwoDownInput?: IButtonTwoDownInput;
}

//******************************************************************************************************************* */

export interface ISelectFieldConfigs {
  onOpenChange?: (open: boolean, form: FormGroup) => void;
  selectLabel?: string; //
  selectOptions?: ISelectOptions[];
  options$?: Promise<Options[]> | Observable<Options[]>;
  selectModeType?: SelectModeType; //'single'  'multiple'  'tags';
  selectColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  selectBorderColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  selectOptionIconColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  selectOptionIconFontSize?: string; //enviar '1px', '1rem',
  selectBackground?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  selectPlaceholder?: string;

  buttonOneDownInput?: IButtonOneDownInput;
  buttonTwoDownInput?: IButtonTwoDownInput;
}

//************************************************************************************************************************** */

export interface ICheckBoxConfigs {
  //parte checkBox
  checkBoxLabel?: string;
  checkBoxLabelColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  checkBorderCheckBoxColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  checkedCheckBoxColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  chechBoxIconBorderRadius?: string; ////enviar '1px', '1rem',
  radioItemMarginTop?: string; //enviar '1px', '1rem', - margin top do itemdo radio pra o campo acima
  radioItemNoneLines?: linesShowType; //"full" ｜ "inset" ｜ "none"..... - crado aki para nao confitar com o do item geral
  radioItemborderRadius?: string; //enviar '1px', '1rem',
  backgroundRadioItem?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  checkBoxPaddingStart?: string;
  checkBoxPaddingLeft?: string;
  checkBoxPaddingTop?: string;
  checkBoxPaddingBottom?: string;
  checkBoxMarginTop?: string;
  checkBoxItemLinesDow?: linesShowType; //"full" ｜ "inset" ｜ "none".....

  buttonOneDownInput?: IButtonOneDownInput;
  buttonTwoDownInput?: IButtonTwoDownInput;
}

//************************************************************************************************************************** */

export interface IRadioConfigs {
  //parte radio
  radioLabel: string;
  radioItemMarginTop?: string; //enviar '1px', '1rem', - margin top do itemdo radio pra o campo acima
  radioItemNoneLines?: linesShowType; //"full" ｜ "inset" ｜ "none"..... - crado aki para nao confitar com o do item geral
  radioItemborderRadius?: string; //enviar '1px', '1rem',
  backgroundRadioItem?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  titleRadioMarginLeft?: string; //enviar '1px', '1rem',
  titleRadioMarginRight?: string; //enviar '1px', '1rem',
  titleRadioMarginTop?: string; //enviar '1px', '1rem',
  titleRadioPaddingLeft?: string; //enviar '1px', '1rem',
  textRadioTitleColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  textRadioTitleTextAlign?: TextAlignType; // onde vai ficar o titulo na linha para o Radio
  borderColorRadioCheck?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  backgroundColorRadioCheck?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  BorderRadiusradioCheck?: string; //enviar '1px', '1rem',
  textOptionRadioColor?: string; //default primary....enviar 'var()'... rgb ...rgba etc
  selectOptions?: ISelectOptions[];

  buttonOneDownInput?: IButtonOneDownInput;
  buttonTwoDownInput?: IButtonTwoDownInput;
}

//********************************************************************************************************************** */

export interface IMediasConfigs {
  fileAccept: eFileAccept; //mime types das midias
  avatarOrImageHeight?: string; //enviar '1px', '1rem',
  avatarOrImageWidth?: string; //enviar '1px', '1rem',
  maxVideos?: number; //quantidade maxima de videos para adcionar
  maxTotalMedia?: number; ////quantidade maxima de medias - doc+video+image para adcionar
  mediasCustomColorAndBorderColor?: string; ////default primary....enviar 'var()'... rgb ...rgba etc

  buttonOneDownInput?: IButtonOneDownInput;
  buttonTwoDownInput?: IButtonTwoDownInput;
}
