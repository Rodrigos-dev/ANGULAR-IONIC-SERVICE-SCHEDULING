import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';

//angular
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EFieldDynamicForm } from './enums/field-dynamic-form.enum';
import {
  IonPopover,
  IonContent,
  IonCol,
  IonInput,
  IonTextarea,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonRadioGroup,
  IonRadio,
  IonDatetime,
  IonModal,
  IonAvatar,
} from '@ionic/angular/standalone';
import {
  EFormatDateValueInInput,
  EInputModeField,
} from './enums/input-mode-field.enum';
import { EMaskType } from './enums/mask-types.enum';
import { InputMaskDirective } from '../../directives/input-maks/input-mask.directive';
import {
  UntilDestroy,
  untilDestroyed,
} from '../../decorators/until-destroy.decorator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { ERROR_MESSAGES, ErrorMessages } from './form-errors';
import { FormValidatorsRequiredPipe } from '../../pipes/form-validators-required.pipe';

import { format, parseISO, isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { eFileAccept } from './enums/image-video-document.enum';
import {
  IMediaItemForm,
  IMediaRemovalData,
} from './interfaces/medias.interface';
import { MediaService } from '../../services/medias.service';
import { IDynamicFormConfig } from './interfaces/dynamic-form-config.interface';
import { IsMediaTypePipe } from '../../pipes/is-media-type.pipe';
import { FormStorageDirective } from '../../directives/form-storage/form-storage.directive';
import {
  eye,
  eyeOff,
  lockClosed,
  lockOpen,
  mail,
  person,
  call,
  calendar,
  location,
  home,
  checkmarkCircle,
  closeCircle,
  warning,
  helpCircle,
  informationCircle,
  search,
  add,
  trash,
  chevronDown,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  formatDateFieldInputs,
  getFormatDateValue,
} from '../../utils/date.util';

// MÓDULOS IONIC EQUIVALENTES
const DYNAMIC_FORM_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  // Pipes e Directives Customizados
  InputMaskDirective,
  FormValidatorsRequiredPipe,
  IsMediaTypePipe,
  FormStorageDirective,

  //inputs usados
  IonInput,
  IonTextarea,
  IonPopover,
  IonContent,
  IonCol,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonRadioGroup,
  IonRadio,
  IonDatetime,
  IonModal,
  IonAvatar,
];

@UntilDestroy()
@Component({
  selector: 'mb-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: DYNAMIC_FORM_MODULES,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ModalController,
    // Embora o MediaService tenha providedIn: 'root',
    // adicioná-lo aqui garante que ele seja resolvido após o ModalController.
    // No entanto, se ele já estiver em 'root', não é estritamente necessário.
    MediaService,
  ],
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfigFields?: IDynamicFormConfig[];
  @Input() mbFormStorageName?: string; //enviar apenas se for salvar no storage e manter salvo para usuario continuar a preencher//deve limpar o storage depois do submit
  @Input() mbFormStorageFieldTypes?: Record<string, EFieldDynamicForm>;
  @Output() formValueChange = new EventEmitter();

  form: FormGroup = new FormGroup({});

  @ViewChild('dateModal') dateModal?: IonModal;

  protected eFieldDynamicForm = EFieldDynamicForm;
  protected eInputModeField = EInputModeField;
  protected eFormatDateValueInInput = EFormatDateValueInInput;
  public readonly eMaskType = EMaskType;
  formFieldTypes!: Record<string, EFieldDynamicForm>;

  public localPreviewUrls: { [fieldName: string]: string | null } = {};

  private readonly mediaService = inject(MediaService);

  constructor(@Inject(ERROR_MESSAGES) private readonly errors: ErrorMessages) {
    addIcons({
      eye,
      eyeOff,
      lockClosed,
      lockOpen,
      mail,
      person,
      call,
      calendar,
      location,
      home,
      checkmarkCircle,
      closeCircle,
      warning,
      helpCircle,
      informationCircle,
      search,
      add,
      trash,
      chevronDown,
    });
  }

  ngOnInit() {
    this.createForm();
    // 1. O valueChanges emite o valor bruto (ISO 8601)
    this.form.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), untilDestroyed(this))
      // 2. Antes de emitir, chame a transformação
      .subscribe((rawValue) => {
        // Chama o novo método auxiliar para transformar o valor
        const transformedValue = this.transformRawValueForChange(rawValue); //aki para refatorar valores e enviar certo para backend ...tipo o time que esta data completa e tem que envciar so hh:mm

        // 3. Emite o valor já formatado para o Backend
        this.formValueChange.emit(transformedValue);
      });

    if (this.formConfigFields) {
      this.formFieldTypes = this.formConfigFields?.reduce((acc, field) => {
        acc[field.name] = field.typeFieldForm;
        return acc;
      }, {} as Record<string, EFieldDynamicForm>);
    }
  }

  private transformRawValueForChange(rawValue: any): { [key: string]: any } {
    const transformedData: { [key: string]: any } = { ...rawValue };

    if (!this.formConfigFields) {
      return transformedData;
    }

    for (const field of this.formConfigFields) {
      const fieldType = field.typeFieldForm;
      const fieldValue = rawValue[field.name];

      const isDateOrTimeField =
        field.typeFieldForm === this.eFieldDynamicForm.DATE ||
        field.typeFieldForm === this.eFieldDynamicForm.TIME ||
        field.typeFieldForm === this.eFieldDynamicForm.DATE_TIME;
      // Aplica a transformação APENAS se for data/hora e tiver valor

      if (fieldValue && isDateOrTimeField) {
        // *** AQUI ESTÁ A SUBSTITUIÇÃO DO DATEPIPE ***
        const formattedValue = this.transformValueForBackend(
          fieldValue,
          fieldType
        );

        transformedData[field.name] = formattedValue;
      }
    }

    return transformedData;
  }

  private createForm() {
    if (!this.formConfigFields)
      return console.log('formConfigFields undefined');

    for (const control of this.formConfigFields) {
      if (control.typeFieldForm !== this.eFieldDynamicForm.DIVIDER) {
        let cleanInitialValue;
        let dateOrInputFileds = false;

        //
        if (
          control.typeFieldForm === this.eFieldDynamicForm.INPUT ||
          control.typeFieldForm === this.eFieldDynamicForm.DATE ||
          control.typeFieldForm === this.eFieldDynamicForm.TIME ||
          control.typeFieldForm === this.eFieldDynamicForm.DATE_TIME
        ) {
          dateOrInputFileds = true;

          cleanInitialValue = this.getFormattedInitialValue(
            control.initialValue,
            control.typeFieldForm // Assumindo que você passa o tipo do campo
          );
        }

        this.form.addControl(
          control.name,
          new FormControl(
            {
              value: dateOrInputFileds
                ? cleanInitialValue
                : control.initialValue ?? null,
              disabled: control.disabled ?? false,
            },
            control.validations
          )
        );
      }
    }
  }

  togglePasswordIconVisibility(field: IDynamicFormConfig) {
    const control = this.formConfigFields?.find((c) => c.name === field.name);
    if (!control) return;

    // 2. Armazena o objeto 'inputConfigs' (o alvo) em uma variável local.
    // Isso garante que o TypeScript saiba que o objeto existe (se não for null/undefined)
    const inputConfigs = control.fieldsConfigs?.inputConfigs;

    // 3. Verifica se o objeto alvo existe e se a propriedade existe DENTRO dele
    if (inputConfigs && typeof inputConfigs.showPasswordIcon === 'boolean') {
      // 4. Atribuição Segura: Como 'inputConfigs' não é null/undefined aqui,
      // podemos atribuir diretamente à propriedade interna.
      inputConfigs.showPasswordIcon = !inputConfigs.showPasswordIcon;
    } else {
      // Opcional: Tratar o caso em que o objeto de configs não existe
      // ou a propriedade ainda não foi inicializada.
      console.warn(
        'As configurações de input não estão disponíveis ou showPasswordIcon não é booleano.'
      );
    }
  }

  getErrorMessage(errors: ValidationErrors | null): string | null {
    console.log(
      errors,
      'aaaaaaaa  dynamicform.component.ts:173 - form-dynamic-ok.ts:174'
    );
    if (!errors) return null;

    const [firstKey] = Object.keys(errors);
    const getErrorMessageFn = this.errors[firstKey];
    if (!getErrorMessageFn) return null;

    const text = getErrorMessageFn(errors[firstKey]);

    console.log(
      text,
      'aaaaaaaa  dynamicform.component.ts:182 - form-dynamic-ok.ts:183'
    );
    return text;
  }

  //#### Parte do input tipo DATA TIME ou DATE-TIME
  // Mapeia o tipo de campo para a apresentação do modal
  getPresentationDateType(typeField: EFieldDynamicForm): string {
    switch (typeField) {
      case EFieldDynamicForm.DATE:
        return 'date'; // ou EFieldDynamicForm.DATE se o valor for 'date'
      case EFieldDynamicForm.TIME:
        return 'time'; // ou EFieldDynamicForm.TIME se o valor for 'time'
      case EFieldDynamicForm.DATE_TIME:
        return 'date-time'; // ou EFieldDynamicForm.DATE_TIME se o valor for 'date-time'
      default:
        return 'date-time';
    }
  }

  // 1. Função que mapeia o tipo de campo para o formato (Reutilizando a lógica anterior)
  getFormatDateValue(
    typeField: EFieldDynamicForm
  ): EFormatDateValueInInput | undefined {
    return getFormatDateValue(typeField);
  }

  /**
   * Verifica se um valor é uma data válida e o formata para exibição no Input.
   *
   * @param initialValue O valor inicial do FormControl.
   * @param typeField O tipo do campo (DATE, TIME, DATE_TIME).
   * @returns A string formatada da data/hora, ou undefined se o valor for inválido.
   */
  getFormattedInitialValue(
    initialValue: any,
    typeField: EFieldDynamicForm
  ): string | undefined {
    if (!initialValue) {
      return undefined;
    }

    let dateObject: Date;
    const formatString = this.getFormatDateValue(typeField); // Obtém o formato 'HH:mm'

    if (!formatString) {
      return undefined;
    }

    // Lógica de Análise: Usa parse para TIME e parseISO para DATE/DATE_TIME
    if (typeField === EFieldDynamicForm.TIME) {
      // 1. Para TIME, tentamos analisar a string 'HH:mm' usando o formato 'HH:mm'
      // Devemos fornecer uma data de referência (new Date()) para criar um objeto Date válido.
      // Se initialValue for uma string ISO completa, o 'parse' ainda deve funcionar.
      dateObject = parse(initialValue, formatString, new Date());
    } else {
      // 2. Para DATE e DATE_TIME, parseISO é o padrão, pois espera um formato ISO
      dateObject =
        initialValue instanceof Date ? initialValue : parseISO(initialValue);
    }

    // 3. Verifica se o objeto Date resultante é válido
    if (!isValid(dateObject)) {
      return undefined;
    }

    try {
      // 4. Formata a data válida para a string de exibição
      return format(dateObject, formatString, { locale: ptBR });
    } catch (error) {
      console.error(
        'Erro ao formatar data: - dynamic-form.component.ts:384',
        error
      );
      return undefined;
    }
  }
  //#### Fim da Parte do input tipo DATA TIME ou DATE-TIME

  // PARTE IMAGE - OBEJTO UNICO
  // upload para avatar que sobe uma midia apenas.....se usar uma midia usar essa
  uploadImage(field: IDynamicFormConfig) {
    // 1. Cria o input de arquivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = field.fieldsConfigs?.mediasConfigs?.fileAccept || 'image/*';

    input.onchange = (event: any) => {
      const file: File = event.target.files[0];

      if (file && field.name) {
        const reader = new FileReader();
        // 2. SALVA O OBJETO FILE NO FORM CONTROL (Para o futuro upload)

        reader.onload = () => {
          const base64String = reader.result as string;

          this.localPreviewUrls[field.name] = base64String;
          this.form.get(field.name)?.setValue(base64String);
        };

        reader.readAsDataURL(file);
      } else if (field.name) {
        // Se o usuário cancelar a seleção, limpa o form e a preview
        this.form.get(field.name)?.setValue(null);
        this.localPreviewUrls[field.name] = null;
      }
    };

    // 4. Dispara o input
    input.click();
  }

  // PARTE MEDIAS ARRAY
  // parte medias - para campo que recebe array de midias usa essa - image - video e documents
  uploadMedia(field: IDynamicFormConfig) {
    // 1. VERIFICAÇÃO INICIAL: Limite Total
    if (field && this.isMaxMediaReached(field)) {
      // Exibe uma notificação ou alerta de que o limite total foi atingido
      // (Use ToastController ou similar aqui)
      console.warn(
        'Limite máximo de mídias (Total) atingido. Não é possível adicionar mais arquivos.'
      );
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = field.fieldsConfigs?.mediasConfigs?.fileAccept!;

    input.onchange = (event: any) => {
      const files: FileList = event.target.files;

      if (files.length === 0 || !field.name) {
        return;
      }

      const currentArray: IMediaItemForm[] =
        this.form.get(field.name)?.value || [];

      // Configurações de limite
      const maxVideos = field.fieldsConfigs?.mediasConfigs?.maxVideos || 0;
      const maxTotalMedia =
        field.fieldsConfigs?.mediasConfigs?.maxTotalMedia || 5;
      let currentVideoCount = this.countMediaType(currentArray, 'video'); // Obtém a contagem atual

      // Array para armazenar os arquivos que PASSARAM nas verificações
      const filesToProcess: File[] = [];
      let totalMediaAfterAddition = currentArray.length;

      // 2. VERIFICAÇÃO DE PRÉ-PROCESSAMENTO: Itera para verificar limites antes de ler
      Array.from(files).forEach((file: File) => {
        const isVideoFile = file.type.startsWith('video/');

        // Checa o limite total
        if (totalMediaAfterAddition >= maxTotalMedia) {
          console.warn(
            `Arquivo ignorado: Limite total de ${maxTotalMedia} mídias atingido.`
          );
          return; // Ignora este arquivo
        }

        // Checa o limite de vídeos
        if (isVideoFile && currentVideoCount >= maxVideos) {
          console.warn(
            `Vídeo ignorado: Limite máximo de ${maxVideos} vídeos atingido.`
          );
          return; // Ignora este arquivo
        }

        // Se passou nas checagens:
        filesToProcess.push(file);
        totalMediaAfterAddition++; // Incrementa para checagem do próximo item
        if (isVideoFile) {
          currentVideoCount++; // Incrementa a contagem de vídeos
        }
      });

      // 3. LEITURA DOS ARQUIVOS (Apenas os que passaram no filtro)
      if (filesToProcess.length === 0) {
        console.log(
          'Nenhum arquivo válido para processar após a verificação de limites.'
        );
        return;
      }

      let filesProcessed = 0;

      filesToProcess.forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;

          const mediaItem: IMediaItemForm = {
            base64: base64String,
            mimeType: file.type, // Salva o MIME Type
            fileName: file.name, // Salva o Nome do Arquivo
          };

          // Adiciona o Base64 ao array (que só contém os itens válidos)
          currentArray.push(mediaItem);
          filesProcessed++;

          // Atualiza o FormControl APENAS depois que todos os arquivos foram lidos
          if (filesProcessed === filesToProcess.length) {
            this.form.get(field.name)?.setValue([...currentArray]);
          }
        };
        reader.readAsDataURL(file);
      });
    };

    input.click();
  }

  async previewMedia(controlName: string, itemIndex?: number) {
    // 1. O COMPONENTE obtém o valor do controle (a única interação com o formulário local)
    // O tipo aqui é o MediaControlValue que definimos (string | IMediaItemForm[] | null | undefined)
    const controlValue = this.form.get(controlName)?.value;

    // 2. CHAMA O SERVIÇO para processar, validar e extrair os dados da mídia
    const mediaData = this.mediaService.extractMediaData(
      controlValue,
      itemIndex
    );

    if (!mediaData) {
      // O serviço já validou e retornou null se não houver mídia válida
      return;
    }

    const { mediaBase64, mimeType, isGallery } = mediaData;
    const media: IMediaItemForm = { base64: mediaBase64, fileName: '' };

    let removalData: IMediaRemovalData | null = null; // Para capturar o resultado do serviço

    if (this.mediaService.isDocument(media, eFileAccept.ALLDOCUMENT)) {
      removalData = await this.mediaService.previewDocument(
        mediaBase64,
        mimeType!,
        controlName,
        itemIndex,
        isGallery
      );
    } else if (this.mediaService.isImage(media, eFileAccept.IMAGE)) {
      removalData = await this.mediaService.previewImage(
        mediaBase64,
        controlName,
        itemIndex,
        isGallery
      );
    } else if (this.mediaService.isVideo(media, eFileAccept.VIDEO)) {
      removalData = await this.mediaService.previewVideo(
        mediaBase64,
        controlName,
        itemIndex,
        isGallery
      );
    } else {
      console.warn(
        `Tipo de arquivo (${mimeType}) não é imagem, vídeo ou documento conhecido.`
      );
    }

    // Lógica única para lidar com a remoção de mídia, agora que o Service retorna o evento
    if (removalData?.removed === true) {
      this.handleMediaRemoval(removalData.controlName, removalData.itemIndex);
    }
  }

  countMediaType(
    currentArray: IMediaItemForm[],
    mediaType: 'image' | 'video'
  ): number {
    return currentArray.filter((url) => {
      if (mediaType === 'image') {
        return this.mediaService.isImage(url, eFileAccept.IMAGE);
      } else if (mediaType === 'video') {
        return this.mediaService.isVideo(url, eFileAccept.VIDEO);
      }
      return false;
    }).length;
  }

  isMaxMediaReached(field: IDynamicFormConfig): boolean {
    const currentArray: string[] = this.form.get(field.name)?.value || [];
    const max = field.fieldsConfigs?.mediasConfigs?.maxTotalMedia;

    if (!max) return false;

    return currentArray.length >= max;
  }

  handleMediaRemoval(controlName: string, itemIndex?: number) {
    const control = this.form.get(controlName);
    if (!control) return;

    if (itemIndex === undefined) {
      // Remoção de Mídia Única
      control.setValue(null);
      this.localPreviewUrls[controlName] = null;
    } else {
      // Remoção de Galeria (Múltiplos)
      const currentArray: string[] = control.value || [];
      if (itemIndex >= 0 && itemIndex < currentArray.length) {
        currentArray.splice(itemIndex, 1);
        control.setValue([...currentArray]); // Atualiza o FormControl com o novo array
      }
    }

    // Nota: Se você usa localPreviewUrls, você precisará limpar ou atualizar a entrada aqui também.
    console.log(
      `Mídia removida do campo ${controlName}. Índice: ${
        itemIndex ?? 'Único ou 0'
      }`
    );
  }

  //**** parte de ajustar os dados para retorno por exemplo a data  */
  private transformValueForBackend(
    fieldValue: any,
    fieldType: EFieldDynamicForm
  ): string | null {
    if (!fieldValue) {
      return null;
    }

    if (this.isDateField(fieldType)) {
      return formatDateFieldInputs(fieldValue, fieldType);
    }

    return fieldValue;
  }

  private isDateField(fieldType: EFieldDynamicForm): boolean {
    return [
      EFieldDynamicForm.DATE,
      EFieldDynamicForm.TIME,
      EFieldDynamicForm.DATE_TIME,
    ].includes(fieldType);
  }
}
