import { CommonModule } from '@angular/common';

//enums interfaces types
import { IDynamicFormConfig } from './interfaces/dynamic-form-config.interface';

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
  Inject,
  Input,
  OnInit,
  Output,
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
  IonRadio,
} from '@ionic/angular/standalone';
import { EInputModeField } from './enums/input-mode-field.enum';
import { EMaskType } from './enums/mask-types.enum';
import { InputMaskDirective } from '../../directives/input-maks/input-mask.directive';
import {
  UntilDestroy,
  untilDestroyed,
} from '../../decorators/until-destroy.decorator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { ERROR_MESSAGES, ErrorMessages } from './form-errors';
import { FormValidatorsRequiredPipe } from '../../pipes/form-validators-required.pipe';

// MÓDULOS IONIC EQUIVALENTES
const DYNAMIC_FORM_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  // Pipes e Directives Customizados
  InputMaskDirective,
  FormValidatorsRequiredPipe,

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
  IonRadio,
];

@UntilDestroy()
@Component({
  selector: 'mb-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: DYNAMIC_FORM_MODULES,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfigFields?: IDynamicFormConfig[];
  @Output() formValueChange = new EventEmitter();

  form: FormGroup = new FormGroup({});

  protected eFieldDynamicForm = EFieldDynamicForm;
  protected eInputModeField = EInputModeField;
  public readonly eMaskType = EMaskType;

  constructor(@Inject(ERROR_MESSAGES) private readonly errors: ErrorMessages) {
    // addIcons({ eye, eyeOff });
  }

  ngOnInit() {
    this.createForm();
    this.form.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((value) => {
        this.formValueChange.emit(value);
      });
  }

  private createForm() {
    if (!this.formConfigFields)
      return console.log('formConfigFields undefined');

    for (const control of this.formConfigFields) {
      if (control.typeFieldForm !== this.eFieldDynamicForm.DIVIDER) {
        this.form.addControl(
          control.name,
          new FormControl(
            {
              value: control.initialValue ?? null,
              disabled: control.disabled,
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

    control.showPasswordIcon = !control.showPasswordIcon;
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
}

/*



// IMPORTS IONIC EQUIVALENTES
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import {
  booleanAttribute,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

// COMPONENTES IONIC
import {
  IonAvatar,
  IonButton,
  IonCheckbox,
  IonDatetime,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonNote,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToggle,
  IonModal,
} from '@ionic/angular/standalone';
import { eye, eyeOff } from 'ionicons/icons';
import { addIcons } from 'ionicons';

// DIRECTIVES E PIPES CUSTOMIZADOS
import { AutoFocusDirective } from '../../directives/auto-focus/auto-focus.directive';

// RXJS
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import {
  eFileAccept,
  IDynamicFormConfig,
  IMediaItemForm,
} from '../../interfaces/dynamic-form-config.interface';
import { ERROR_MESSAGES, ErrorMessages } from './form-errors';
import { eDynamicField } from '../../enums/dynamic-field.enum';
import {
  UntilDestroy,
  untilDestroyed,
} from '../../decorators/until-destroy.decorator';
import {
  eMaskType,
  InputMaskDirective,
} from '../../directives/input-maks/input-mask.directive';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { VideoPreviewComponent } from '../video-preview/video-preview.component';
import { DocumentPreviewComponent } from '../document-preview/document-preview.component';

@Pipe({ name: 'formIsRequired', standalone: true })
export class FormIsRequiredPipe implements PipeTransform {
  transform(value: AbstractControl) {
    return value.statusChanges.pipe(
      startWith(value),
      map(() => {
        return !value.hasValidator(Validators.required);
      })
    );
  }
}

// MÓDULOS IONIC EQUIVALENTES
const DYNAMIC_FORM_MODULES = [
  // Angular e CDK
  AutoFocusDirective,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,

  // Componentes Ionic
  IonAvatar,
  IonButton,
  IonCheckbox,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonNote,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToggle,
  IonDatetime,
  IonModal,

  // Pipes e Directives Customizados
  FormIsRequiredPipe,
  InputMaskDirective,
  ImagePreviewComponent,
  VideoPreviewComponent,
  DocumentPreviewComponent,
];

@UntilDestroy()
@Component({
  selector: 'mb-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: DYNAMIC_FORM_MODULES,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DynamicFormComponent implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Action'];

  // REMOVIDOS: nzImageService (substituído por solução Ionic)
  private readonly modalCtrl = inject(ModalController);
  public readonly eMaskType = eMaskType;

  protected autoSizeColumns = 12;
  protected eDynamicField = eDynamicField;
  public localPreviewUrls: { [fieldName: string]: string | null } = {};

  @Input() config?: IDynamicFormConfig[];
  @Input({ transform: booleanAttribute }) hideOptionalLabel = false;
  @Output() formValueChange = new EventEmitter();

  form: FormGroup = new FormGroup({});

  constructor(@Inject(ERROR_MESSAGES) private readonly errors: ErrorMessages) {
    addIcons({ eye, eyeOff });
  }

  ngOnInit() {
    this.createForm();
    this.form.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((value) => {
        this.formValueChange.emit(value);
      });
  }

  getErrorMessage(errors: ValidationErrors | null): string | null {
    console.log(errors, 'aaaaaaaa - dynamic-form.component.ts:176');
    if (!errors) return null;

    const [firstKey] = Object.keys(errors);
    const getErrorMessageFn = this.errors[firstKey];
    if (!getErrorMessageFn) return null;

    const text = getErrorMessageFn(errors[firstKey]);

    console.log(text, 'aaaaaaaa - dynamic-form.component.ts:185');
    return text;
  }

  // ATUALIZADO: Upload para Ionic
  uploadImage(field: IDynamicFormConfig) {
    // 1. Cria o input de arquivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = field.fileAccept || 'image/*';

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

  // ATUALIZADO: Preview para Ionic (usando modal nativo ou action sheet)
  async previewImage(controlName: string) {
    const base64: string = this.form.get(controlName)?.value;

    if (!base64 || typeof base64 !== 'string' || !base64.startsWith('data:')) {
      console.warn(
        'Não há imagem válida em Base64 para visualização.'
      );
      return;
    }

    try {
      const modal = await this.modalCtrl.create({
        // 1. Componente que será exibido
        component: ImagePreviewComponent,

        cssClass: 'custom-modal',

        // 2. Parâmetros que serão passados para o componente (o Base64)
        componentProps: {
          imageUrl: base64,
          controlName: controlName,
        },
      });

      await modal.present();

      const { data } = await modal.onWillDismiss();

      if (data?.removed === true) {
        this.handleImageRemoval(data.controlName);
      }
    } catch (error) {
      console.error(
        'Erro ao abrir o modal de preview:',
        error
      );
    }
  }

  handleImageRemoval(controlName: string) {
    this.form.get(controlName)?.setValue(null);
    this.localPreviewUrls[controlName] = null;
  }

  togglePasswordIconVisibility(field: IDynamicFormConfig) {
    const control = this.config?.find((c) => c.name === field.name);
    if (!control) return;

    control.showPasswordIcon = !control.showPasswordIcon;
  }

  private createForm() {
    this.config?.forEach((control) => {
      if (control.type.field !== eDynamicField.DIVIDER) {
        this.form.addControl(
          control.name,
          new FormControl(
            {
              value:
                control.initialValue !== undefined
                  ? control.initialValue
                  : null,
              disabled: control.disabled,
            },
            control.validations
          )
        );
      }
    });
  }

  // Adicione esta função para verificar se deve mostrar erro
  shouldShowError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(
      control?.errors &&
      (control.dirty || control.touched) &&
      this.form.enabled
    );
  }

  // Ou use uma propriedade computada no template
  getFieldError(fieldName: string): string | null {
    const control = this.form.get(fieldName);
    if (control?.errors && (control.dirty || control.touched)) {
      return this.getErrorMessage(control.errors);
    }
    return null;
  }

  checkFieldState(fieldName: string) {
    const control = this.form.get(fieldName);
    console.log('Field State: - dynamic-form.component.ts:315', {
      name: fieldName,
      value: control?.value,
      errors: control?.errors,
      touched: control?.touched,
      dirty: control?.dirty,
      status: control?.status,
    });
  }

  //parte de muitas medias
  isImage(url: IMediaItemForm, fileAccept: eFileAccept): boolean {
    if (
      !url.base64 ||
      typeof url.base64 !== 'string' ||
      (fileAccept !== eFileAccept.IMAGE &&
        fileAccept !== eFileAccept.IMAGEANDVIDEO &&
        fileAccept !== eFileAccept.ALL)
    ) {
      return false;
    }
    // Verifica se a URL é Base64 e começa com 'data:image'
    return url.base64.startsWith('data:image');
    // Para URLs de storage (sem o prefixo data:), você pode precisar de uma lógica de verificação de extensão mais robusta
  }

  isDocument(url: IMediaItemForm, fileAccept: eFileAccept): boolean {
    if (
      !url.base64 ||
      typeof url.base64 !== 'string' ||
      fileAccept === eFileAccept.IMAGE ||
      fileAccept === eFileAccept.VIDEO
    ) {
      return false;
    }
    // Verifica os tipos MIME de documentos (o Base64 começa com "data:application/...")
    return (
      url.base64.startsWith('data:application/pdf') ||
      url.base64.startsWith('data:application/msword') ||
      url.base64.startsWith('data:application/vnd.openxmlformats')
    );
    // Você pode expandir ou simplificar esta lista conforme necessário.
  }

  uploadMedia(field: IDynamicFormConfig) {
    // 1. VERIFICAÇÃO INICIAL: Limite Total
    if (this.isMaxMediaReached(field)) {
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
    input.accept = field.fileAccept!;

    input.onchange = (event: any) => {
      const files: FileList = event.target.files;

      if (files.length === 0 || !field.name) {
        return;
      }

      const currentArray: IMediaItemForm[] =
        this.form.get(field.name)?.value || [];

      // Configurações de limite
      const maxVideos = field.maxVideos || Infinity;
      const maxTotalMedia = field.maxTotalMedia || Infinity;
      let currentVideoCount = this.countMediaType(field.name, 'video'); // Obtém a contagem atual

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

  removeItem(fieldName: string, index: number) {
    const currentArray: string[] = this.form.get(fieldName)?.value;

    if (currentArray && index >= 0 && index < currentArray.length) {
      currentArray.splice(index, 1); // Remove 1 elemento no índice 'index'

      // Define um novo array para garantir que o Angular detecte a mudança
      this.form.get(fieldName)?.setValue([...currentArray]);
      console.log(
        `Item de mídia no índice ${index} removido.`
      );
    }
  }

  isVideo(url: IMediaItemForm, fileAccept: eFileAccept): boolean {
    if (
      !url.base64 ||
      typeof url.base64 !== 'string' ||
      (fileAccept !== eFileAccept.VIDEO &&
        fileAccept !== eFileAccept.IMAGEANDVIDEO &&
        fileAccept !== eFileAccept.ALL)
    ) {
      return false;
    }

    return (
      typeof url.base64 === 'string' && url.base64.startsWith('data:video')
    );
  }

  countMediaType(fieldName: string, mediaType: 'image' | 'video'): number {
    const currentArray: IMediaItemForm[] =
      this.form.get(fieldName)?.value || [];

    return currentArray.filter((url) => {
      if (mediaType === 'image') {
        return this.isImage(url, eFileAccept.IMAGE);
      } else if (mediaType === 'video') {
        return this.isVideo(url, eFileAccept.VIDEO);
      }
      return false;
    }).length;
  }

  isMaxMediaReached(field: IDynamicFormConfig): boolean {
    const currentArray: string[] = this.form.get(field.name)?.value || [];
    const max = field.maxTotalMedia;

    if (!max) return false;

    return currentArray.length >= max;
  }

  async previewMedia(controlName: string, itemIndex?: number) {
    const controlValue = this.form.get(controlName)?.value;
    let mediaBase64: string | null = null;
    let mimeType: string | null = null;
    let isGallery = Array.isArray(controlValue);
    let finalUrlToOpen: string | null = null; //

    // 1. DETERMINA O VALOR DA MÍDIA E TIPO
    if (isGallery) {
      if (itemIndex === undefined) {
        console.warn('Índice do item é necessário. - dynamic-form.component.ts:523');
        return;
      }
      const mediaItem = controlValue[itemIndex];
      mediaBase64 = mediaItem.base64;
      mimeType = mediaItem.mimeType;
    } else {
      mediaBase64 = controlValue as string;
      if (mediaBase64 && mediaBase64.startsWith('data:')) {
        mimeType = mediaBase64.substring(5, mediaBase64.indexOf(';'));
      }
    }

    // 2. VERIFICAÇÃO BÁSICA
    if (!mediaBase64 || typeof mediaBase64 !== 'string') {
      console.warn('Não há mídia válida para visualização. - dynamic-form.component.ts:538');
      return;
    }

    let media: IMediaItemForm = {
      base64: mediaBase64,
      fileName: '',
    };

    // 🚨 NOVO: LÓGICA DE ABERTURA EM NOVA ABA PARA VÍDEOS E DOCUMENTOS
    if (this.isDocument(media, eFileAccept.ALLDOCUMENT)) {
      //abre no modal nosso - iframe so abre pdf
      if (mimeType === eFileAccept.PDF) {
        try {
          const modal = await this.modalCtrl.create({
            component: DocumentPreviewComponent,
            cssClass: 'custom-modal-documents',
            componentProps: {
              documentUrl: mediaBase64,
              controlName: controlName,
              itemIndex: itemIndex,
              isGallery: isGallery,
            },
          });

          await modal.present();

          const { data } = await modal.onWillDismiss();
          if (data?.removed === true) {
            this.handleMediaRemoval(data.controlName, data.itemIndex);
          }
        } catch (error) {
          console.error('Erro ao abrir o modal de preview: - dynamic-form.component.ts:570', error);
        }
      }
      //abre na web se for diferente de pdf...porem funciona para pdf tb
      else {
        try {
          // Converte a string longa Base64 em um Blob (objeto binário)
          const mediaBlob = this.dataURLtoBlob(mediaBase64);

          // Cria um URL curto e temporário (Objeto URL)
          finalUrlToOpen = URL.createObjectURL(mediaBlob);

          console.log(
            `Abrindo ${mimeType} usando Object URL.`
          );

          const newWindow = window.open(finalUrlToOpen, '_blank');

          // Opcional: Libera a memória do Object URL quando a nova janela é fechada
          // (pode ser difícil de rastrear, mas é boa prática)
          if (newWindow) {
            newWindow.onbeforeunload = () =>
              URL.revokeObjectURL(finalUrlToOpen!);
          } else {
            // Caso o navegador bloqueie pop-ups, abrimos na mesma aba, ou damos um aviso.
            console.warn(
              'Popup bloqueado. Tentando abrir na aba atual.'
            );
            window.location.href = finalUrlToOpen;
          }

          return; // Termina a função
        } catch (e) {
          console.error(
            'Erro ao converter Base64 para Blob:',
            e
          );
          // Se falhar a conversão (fallback), tenta abrir a Base64 pura (pode falhar por limite de URL)
          window.open(mediaBase64, '_blank');
          return;
        }
      }
    }

    // 3. SE FOR IMAGEM (OU TIPO NÃO DOCUMENTO/VÍDEO) -> ABRE MODAL (Se preferir modal para imagens)
    else if (mediaBase64 && this.isImage(media, eFileAccept.IMAGE)) {
      try {
        const modal = await this.modalCtrl.create({
          component: ImagePreviewComponent,
          cssClass: 'custom-modal',
          componentProps: {
            imageUrl: mediaBase64,
            controlName: controlName,
            itemIndex: itemIndex,
            isGallery: isGallery,
          },
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data?.removed === true) {
          this.handleMediaRemoval(data.controlName, data.itemIndex);
        }
      } catch (error) {
        console.error('Erro ao abrir o modal de preview: - dynamic-form.component.ts:635', error);
      }
    } else if (mediaBase64 && this.isVideo(media, eFileAccept.VIDEO)) {
      try {
        const modal = await this.modalCtrl.create({
          component: VideoPreviewComponent,
          cssClass: 'custom-modal',
          componentProps: {
            videoUrl: mediaBase64,
            controlName: controlName,
            itemIndex: itemIndex,
            isGallery: isGallery,
          },
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data?.removed === true) {
          this.handleMediaRemoval(data.controlName, data.itemIndex);
        }
      } catch (error) {
        console.error('Erro ao abrir o modal de preview: - dynamic-form.component.ts:657', error);
      }
    } else {
      console.warn(
        `Tipo de arquivo (${mimeType}) não é imagem, vídeo ou documento conhecido. Nenhuma ação de preview.`
      );
    }
  }

  handleMediaRemoval(controlName: string, itemIndex?: number) {
    const control = this.form.get(controlName);
    if (!control) return;

    if (itemIndex !== undefined) {
      // Remoção de Galeria (Múltiplos)
      const currentArray: string[] = control.value || [];
      if (itemIndex >= 0 && itemIndex < currentArray.length) {
        currentArray.splice(itemIndex, 1);
        control.setValue([...currentArray]); // Atualiza o FormControl com o novo array
      }
    } else {
      // Remoção de Mídia Única
      control.setValue(null);
    }

    // Nota: Se você usa localPreviewUrls, você precisará limpar ou atualizar a entrada aqui também.
    console.log(
      `Mídia removida do campo ${controlName}. Índice: ${
        itemIndex !== undefined ? itemIndex : 'Único'
      }`
    );
  }

  getFileTypeLabel(url: string): string {
    if (url.startsWith('data:application/pdf')) {
      return 'PDF';
    } else if (
      url.includes('data:application/msword') ||
      url.includes('data:application/vnd.openxmlformats')
    ) {
      return 'DOC/DOCX';
    }
    // Você pode adicionar mais tipos aqui se necessário
    return 'Arquivo';
  }

  private dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',');
    // O tipo MIME é o que está entre "data:" e ",". Ex: "video/mp4"
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }
}




-------------------------------------------------------------------------------------------------













@if (form) {
<form [formGroup]="form">
  <ion-grid class="my-grid">
    <ion-col size-lg="12" size-lg="6"></ion-col>
    <ion-row>
      @for (field of config; track field.name) {
      <ion-col
        [attr.size-lg]="field.size ?? autoSizeColumns"
        [attr.size-xs]="field.mobileSize ?? 12"
        [style.padding-left]="'0'"
        [style.padding-right]="'0'"
        [hidden]="
          field.hidden ||
          (form.controls[field.name] &&
            form.controls[field.name].disabled &&
            field.hideIfDisabled)
        "
      >
        <!-- DIVIDER -->
        @if (field.type.field === eDynamicField.DIVIDER) {
        <ion-item-divider
          [style.--padding-start]="
            field.paddingStart ? field.paddingStart : '1.2rem'
          "
          [style.margin-bottom]="'2rem'"
        >
          <ion-label>{{ field.label }}</ion-label>
        </ion-item-divider>
        }

        <!-- CAMPOS DE FORMULÁRIO -->
        @if (field.type.field !== eDynamicField.DIVIDER) {
        <ion-item
          [class.itemWithScroll]="
            field.type.field === eDynamicField.VIDEOIMAGEORDOCUMENTS
          "
          [class.itemWithBorder]="
            field.labelPlacement ||
            field.borderRadius ||
            field.type.field === eDynamicField.DATE
          "
          [lines]="field.ionItemNoneLines"
        >
          <!-- LABEL (exceto para alguns tipos) -->
          @if (field.label && field.type.field !== eDynamicField.CHECKBOX &&
          field.type.field !== eDynamicField.SWITCH && field.type.field) {
          <ion-label position="stacked" class="labelInput">
            {{ field.label }}
            @if (field.help) {
            <ion-icon
              name="information-circle"
              [attr.title]="field.help"
            ></ion-icon>
            }
          </ion-label>
          }

          <!-- AVATAR -->
          @if (field.type.field === eDynamicField.AVATAR) {
          <div class="avatar-img-video-container">
            <div class="avatar-img-video-uploader">
              <ion-avatar
                (click)="previewImage(field.name)"
                [style.height]="field.avatarOrImageHeight || '130px'"
                [style.width]="field.avatarOrImageWidth || '130px'"
                [style.margin-bottom]="'30px'"
              >
                <ion-img
                  [src]="
                    localPreviewUrls[field.name] ||
                    form.controls[field.name].value ||
                    'https://placehold.co/1080x1080'
                  "
                  alt="Avatar"
                />
              </ion-avatar>
              <ion-button fill="clear" (click)="uploadImage(field)">
                <ion-icon name="add" slot="end"></ion-icon>
              </ion-button>
            </div>
          </div>
          }

          <!-- Varias Imagens ou videos -->
          @if (field.type.field === eDynamicField.VIDEOIMAGEORDOCUMENTS &&
          field.fileAccept) {
          <div class="media-gallery-container">
            <div class="media-list-wrapper">
              @if (!isMaxMediaReached(field)) {
              <div
                class="add-media-card"
                [style.height]="field.avatarOrImageHeight || '130px'"
                [style.width]="field.avatarOrImageWidth || '130px'"
              >
                <ion-button
                  fill="clear"
                  color="primary"
                  class="add-media-button"
                  (click)="uploadMedia(field)"
                >
                  <ion-icon name="add" slot="icon-only"></ion-icon>
                </ion-button>
              </div>
              } @for (mediaUrl of form.controls[field.name].value; track
              mediaUrl.fileName; let i = $index) {
              <ion-item
                class="media-item-card"
                lines="none"
                [style.height]="field.avatarOrImageHeight || '130px'"
                [style.width]="field.avatarOrImageWidth || '130px'"
              >
                <div
                  class="media-item-content"
                  [style.height]="field.avatarOrImageHeight || '130px'"
                  [style.width]="field.avatarOrImageWidth || '130px'"
                >
                  @if (isImage(mediaUrl, field.fileAccept)) {
                  <ion-img
                    [src]="mediaUrl.base64"
                    alt="Imagem"
                    class="imgInGalleryForm"
                    (click)="previewMedia(field.name, i)"
                  />
                  } @else if (isVideo(mediaUrl, field.fileAccept)) {
                  <div
                    class="video-thumbnail-wrapper"
                    (click)="previewMedia(field.name, i)"
                    [attr.aria-label]="'Visualizar Vídeo'"
                    [style.height]="field.avatarOrImageHeight || '130px'"
                    [style.width]="field.avatarOrImageWidth || '130px'"
                  >
                    <!-- O elemento video não tem controls, atua como thumbnail/preview -->
                    <video
                      [src]="mediaUrl.base64"
                      preload="metadata"
                      class="videoInGalleryForm"
                    >
                      Seu navegador não suporta a visualização.
                    </video>

                    <!-- Ícone de Play para indicar que o vídeo é clicável (o overlay) -->
                    <ion-icon
                      name="play-circle"
                      class="video-play-overlay"
                      size="large"
                    ></ion-icon>
                  </div>
                  } @else if (isDocument(mediaUrl, field.fileAccept)) {
                  <div
                    class="document-placeholder"
                    (click)="previewMedia(field.name, i)"
                  >
                    <ion-icon
                      name="document-text-outline"
                      class="document-icon"
                    ></ion-icon>
                    <p class="document-label">
                      {{ mediaUrl.fileName }}
                    </p>
                  </div>
                  } @else {
                  <div
                    class="document-placeholder fallback-unknown"
                    (click)="previewMedia(field.name, i)"
                  >
                    <ion-icon
                      name="alert-circle-outline"
                      class="document-icon"
                    ></ion-icon>
                    <p class="document-label">Arquivo Não Suportado</p>
                  </div>
                  }

                  <ion-button
                    fill="solid"
                    color="danger"
                    size="small"
                    class="remove-media-button"
                    (click)="removeItem(field.name, i)"
                  >
                    <ion-icon name="close-circle" slot="icon-only"></ion-icon>
                  </ion-button>
                </div>
              </ion-item>
              }
            </div>
          </div>
          }

          <!-- IMAGE -->
          @if (field.type.field === eDynamicField.IMAGE) {
          <div class="avatar-img-video-container">
            <div class="avatar-img-video-uploader">
              <ion-img
                class="imgVideoInImageOrVidedoForm"
                [src]="
                  localPreviewUrls[field.name] ||
                  form.controls[field.name].value ||
                  'https://placehold.co/1080x1080'
                "
                alt="Avatar"
                (click)="previewImage(field.name)"
                [style.height]="field.avatarOrImageHeight || '130px'"
                [style.width]="field.avatarOrImageWidth || '130px'"
                [style.margin-bottom]="'30px'"
              />
              <ion-button fill="clear" (click)="uploadImage(field)">
                <ion-icon name="add" slot="end"></ion-icon>
              </ion-button>
            </div>
          </div>
          }

          <!-- VIDEO -->
          @if (field.type.field === eDynamicField.VIDEO) {
          <div class="avatar-img-video-container">
            <div class="avatar-img-video-uploader">
              <video
                class="imgVideoInImageOrVidedoForm"
                [src]="
                  localPreviewUrls[field.name] ||
                  form.controls[field.name].value ||
                  'https://placehold.co/1080x1080'
                "
                alt="Video Preview"
                controls
                preload="metadata"
                (click)="previewImage(field.name)"
                [style.height]="field.avatarOrImageHeight || '130px'"
                [style.width]="field.avatarOrImageWidth || '130px'"
                [style.margin-bottom]="'30px'"
              >
                Seu navegador não suporta a visualização deste vídeo.
              </video>
              <ion-button fill="clear" (click)="uploadImage(field)">
                <ion-icon name="add" slot="end"></ion-icon>
              </ion-button>
            </div>
          </div>
          }

          <!-- INPUT -->
          @if (!field.type || field.type.field === (eDynamicField.INPUT)) {
          <ion-input
            mode="md"
            [formControlName]="field.name"
            [appInputMask]="field.mask"
            [type]="field.showPasswordIcon ? 'text' : field.type.typeField"
            [inputmode]="field.type.inputMode"
            [placeholder]="field.placeholder"
            [fill]="field.fill"
            [label]="field.inputLabel"
            attr.label-placement="{{
              field.fill &&
              (field.type.typeField === 'password' || field.addOnAfterIcon)
                ? 'stacked'
                : field.labelPlacement
            }}"
            (ionInput)="
              field.onChange && field.onChange($event.detail.value, form)
            "
            [autofocus]="field.autofocus"
            [style.--border-radius]="field.borderRadius"
            [style.--padding-start]="
              field.paddingStart
                ? field.paddingStart
                : field.borderRadius
                ? field.borderRadius
                : '0.9rem'
            "
          >
            @if (field.type.typeField === 'password') {
            <ion-button
              fill="clear"
              slot="end"
              (click)="togglePasswordIconVisibility(field)"
            >
              <ion-icon
                slot="icon-only"
                [name]="field.showPasswordIcon ? 'eye-off' : 'eye'"
              ></ion-icon>
            </ion-button>
            } @if (field.addOnAfterIcon) {
            <ion-button
              fill="clear"
              slot="end"
              (click)="field.onAddOnAfterClick && field.onAddOnAfterClick(form)"
            >
              <ion-icon [name]="field.addOnAfterIcon"></ion-icon>
            </ion-button>
            }
          </ion-input>

          @if (field.showForgotPassword && field.type.typeField === 'password')
          {
          <ion-button
            fill="clear"
            size="small"
            [routerLink]="field.forgotPasswordLink"
          >
            Esqueceu sua senha?
          </ion-button>
          }
          <!-- fim if eDynamicField.INPUT -->
          }

          <!-- TEXTAREA -->
          @if (field.type.field === eDynamicField.TEXTAREA) {
          <ion-textarea
            mode="md"
            [formControlName]="field.name"
            [rows]="field.rows || 4"
            [placeholder]="field.placeholder"
            [fill]="field.fill"
            [label]="field.inputLabel"
            attr.label-placement="{{
              field.fill &&
              (field.type.typeField === 'password' || field.addOnAfterIcon)
                ? 'stacked'
                : field.labelPlacement
            }}"
            [style.--border-radius]="field.borderRadius"
            [style.--padding-start]="
              field.paddingStart
                ? field.paddingStart
                : field.borderRadius
                ? field.borderRadius
                : '0.9rem'
            "
            [style.padding-top]="'6px'"
          ></ion-textarea>
          }

          <!-- TOGGLE (substitui o SWITCH) -->
          @if (field.type.field === eDynamicField.SWITCH) {
          <div class="toggle-container">
            <div class="toggle-label">
              <ion-label class="labelTextArea">{{ field.label }}</ion-label>
              @if (field.help) {
              <ion-note>{{ field.help }}</ion-note>
              }
            </div>
            <ion-toggle
              slot="end"
              [formControlName]="field.name"
              (ionChange)="
                field.onChange && field.onChange($event.detail.checked, form)
              "
            ></ion-toggle>
          </div>
          }

          <!-- SELECT -->
          @if (field.type.field === eDynamicField.SELECT) {
          <ion-select
            mode="md"
            [formControlName]="field.name"
            [placeholder]="field.placeholder"
            [multiple]="field.select?.mode === 'multiple'"
            (ionChange)="
              field.onChange && field.onChange($event.detail.value, form)
            "
            (ionFocus)="field.onOpenChange && field.onOpenChange(true, form)"
            (ionBlur)="field.onOpenChange && field.onOpenChange(false, form)"
            [fill]="field.fill"
            [label]="field.inputLabel"
            attr.label-placement="{{
              field.fill &&
              (field.type.typeField === 'password' || field.addOnAfterIcon)
                ? 'stacked'
                : field.labelPlacement
            }}"
            [autofocus]="field.autofocus"
            [style.--border-radius]="field.borderRadius"
            [style.--padding-start]="
              field.paddingStart
                ? field.paddingStart
                : field.borderRadius
                ? field.borderRadius
                : '0.9rem'
            "
          >
            @for (option of field.select?.options; track option.value) {
            <ion-select-option
              [value]="option.value"
              [disabled]="option.disabled"
            >
              @if (option.icon) {
              <ion-icon [name]="option.icon" slot="start"></ion-icon>
              }
              {{ option.label }}
            </ion-select-option>
            } @for (option of field.select?.options$ | async; track
            option.value) {
            <ion-select-option [value]="option.value">
              {{ option.label }}
            </ion-select-option>
            }
          </ion-select>
          }

          <!-- CHECKBOX -->
          @if (field.type.field === eDynamicField.CHECKBOX) {
          <ion-item
            mode="md"
            class="itemCheckbox"
            [class.itemCheckboxWithFill]="field.fill"
            [fill]="field.fill"
            [style.--border-radius]="field.borderRadius"
          >
            <ion-checkbox
              [formControlName]="field.name"
              (ionChange)="
                field.onChange && field.onChange($event.detail.checked, form)
              "
            >
              {{ field.label || field.inputLabel }}
            </ion-checkbox>
          </ion-item>
          }

          <!-- RADIO -->
          @if (field.type.field === eDynamicField.RADIO) {
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>{{ field.inputLabel }}</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
              <ion-radio-group
                [formControlName]="field.name"
                [style.padding-top]="'20px'"
                [style.padding-bottom]="'20px'"
                [style.width]="'100%'"
                errorText="This field is required"
              >
                <ion-row>
                  @for (option of field.select?.options; track option.value) {

                  <ion-col size="6">
                    <ion-item
                      lines="none"
                      [style.padding-right]="'20px'"
                      [style.padding-left]="'20px'"
                    >
                      <ion-label class="labelInRadio">
                        {{ option.label }}
                      </ion-label>

                      <ion-radio
                        slot="end"
                        [value]="option.value"
                        (ionChange)="
                          field.onChange &&
                            field.onChange($any($event).detail.value, form)
                        "
                      ></ion-radio>
                    </ion-item>
                  </ion-col>
                  }
                </ion-row>
              </ion-radio-group>
            </ion-card-content>
          </ion-card>
          }

          <!-- DATE -->
          @if (field.type.field === eDynamicField.DATE) {
          <ion-input
            mode="md"
            type="text"
            readonly="true"
            [label]="field.inputLabel"
            [formControlName]="field.name"
            [placeholder]="field.placeholder"
            [fill]="field.fill"
            [value]="form.controls[field.name]?.value | date : 'dd/MM/yyyy'"
            attr.label-placement="{{
              field.fill &&
              (field.type.typeField === 'password' || field.addOnAfterIcon)
                ? 'stacked'
                : field.labelPlacement
            }}"
            (ionInput)="
              field.onChange && field.onChange($event.detail.value, form)
            "
            [style.--border-radius]="field.borderRadius"
            [style.--padding-start]="
              field.paddingStart
                ? field.paddingStart
                : field.borderRadius
                ? field.borderRadius
                : '0.9rem'
            "
          >
            <ion-button
              fill="clear"
              slot="end"
              [id]="'modal-trigger-' + field.name"
              (click)="field.onAddOnAfterClick && field.onAddOnAfterClick(form)"
            >
              <ion-icon name="calendar-outline"></ion-icon>
            </ion-button>
          </ion-input>

          <ion-modal
            [trigger]="'modal-trigger-' + field.name"
            [keepContentsMounted]="true"
            #dateModalDate
            [breakpoints]="[0, 0.7, 1.0]"
            [initialBreakpoint]="0.9"
          >
            <ng-template>
              <ion-header>
                <ion-toolbar>
                  <ion-title class="titleModal">{{
                    field.inputLabel
                  }}</ion-title>
                  <ion-buttons slot="end">
                    <ion-button
                      (click)="dateModalDate.dismiss('cancel')"
                      class="buttonVoltarModal"
                      >Selecionar</ion-button
                    >
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content
                class="ion-padding ion-padding ion-justify-content-center"
                [style.display]="'flex'"
              >
                <ion-datetime
                  [formControlName]="field.name"
                  presentation="date"
                  [locale]="'pt-BR'"
                  (ionChange)="
                    field.onChange && field.onChange($event.detail.value, form)
                  "
                ></ion-datetime>
              </ion-content>
            </ng-template>
          </ion-modal>
          }

          <!-- DATE TIME -->
          @if (field.type.field === eDynamicField.DATE_TIME) {
          <ion-input
            mode="md"
            type="text"
            readonly="true"
            [label]="field.inputLabel"
            [formControlName]="field.name"
            [placeholder]="field.placeholder"
            [fill]="field.fill"
            [value]="
              form.controls[field.name]?.value | date : 'dd/MM/yyyy HH:mm'
            "
            attr.label-placement="{{
              field.fill &&
              (field.type.typeField === 'password' || field.addOnAfterIcon)
                ? 'stacked'
                : field.labelPlacement
            }}"
            (ionInput)="
              field.onChange && field.onChange($event.detail.value, form)
            "
            [style.--border-radius]="field.borderRadius"
            [style.--padding-start]="
              field.paddingStart
                ? field.paddingStart
                : field.borderRadius
                ? field.borderRadius
                : '0.9rem'
            "
          >
            <ion-button
              fill="clear"
              slot="end"
              [id]="'modal-trigger-' + field.name"
              (click)="field.onAddOnAfterClick && field.onAddOnAfterClick(form)"
            >
              <ion-icon name="calendar-outline"></ion-icon>
            </ion-button>
          </ion-input>

          <ion-modal
            [trigger]="'modal-trigger-' + field.name"
            [keepContentsMounted]="true"
            #dateModalDateTime
            [breakpoints]="[0, 0.7, 1.0]"
            [initialBreakpoint]="0.9"
          >
            <ng-template>
              <ion-header>
                <ion-toolbar>
                  <ion-title class="titleModal">{{
                    field.inputLabel
                  }}</ion-title>
                  <ion-buttons slot="end">
                    <ion-button
                      (click)="dateModalDateTime.dismiss('cancel')"
                      class="buttonVoltarModal"
                      >Selecionar</ion-button
                    >
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content
                class="ion-padding ion-padding ion-justify-content-center"
                [style.display]="'flex'"
              >
                <ion-datetime
                  [formControlName]="field.name"
                  hourCycle="h23"
                  presentation="date-time"
                  [locale]="'pt-BR'"
                  (ionChange)="
                    field.onChange && field.onChange($event.detail.value, form)
                  "
                ></ion-datetime>
              </ion-content>
            </ng-template>
          </ion-modal>
          }

          <!-- TIME -->
          @if (field.type.field === eDynamicField.TIME) {
          <ion-input
            mode="md"
            type="text"
            readonly="true"
            [label]="field.inputLabel"
            [formControlName]="field.name"
            [placeholder]="field.placeholder"
            [fill]="field.fill"
            [value]="form.controls[field.name]?.value"
            attr.label-placement="{{
              field.fill &&
              (field.type.typeField === 'password' || field.addOnAfterIcon)
                ? 'stacked'
                : field.labelPlacement
            }}"
            (ionInput)="
              field.onChange && field.onChange($event.detail.value, form)
            "
            [style.--border-radius]="field.borderRadius"
            [style.--padding-start]="
              field.paddingStart
                ? field.paddingStart
                : field.borderRadius
                ? field.borderRadius
                : '0.9rem'
            "
          >
            <ion-button
              fill="clear"
              slot="end"
              [id]="'modal-trigger-' + field.name"
              (click)="field.onAddOnAfterClick && field.onAddOnAfterClick(form)"
            >
              <ion-icon name="time-outline"></ion-icon>
            </ion-button>
          </ion-input>

          <ion-modal
            [trigger]="'modal-trigger-' + field.name"
            [keepContentsMounted]="true"
            #dateModalTime
            [breakpoints]="[0, 0.7, 1.0]"
            [initialBreakpoint]="0.9"
          >
            <ng-template>
              <ion-header>
                <ion-toolbar>
                  <ion-title class="titleModal">{{
                    field.inputLabel
                  }}</ion-title>
                  <ion-buttons slot="end">
                    <ion-button
                      (click)="dateModalTime.dismiss('confirm')"
                      class="buttonVoltarModal"
                    >
                      Selecionar
                    </ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content
                class="ion-padding ion-padding ion-justify-content-center"
                [style.display]="'flex'"
              >
                <ion-datetime
                  [formControlName]="field.name"
                  presentation="time"
                  [locale]="'pt-BR'"
                  hourCycle="h23"
                  (ionChange)="
                    field.onChange && field.onChange($event.detail.value, form)
                  "
                ></ion-datetime>
              </ion-content>
            </ng-template>
          </ion-modal>
          }
        </ion-item>

        <!-- HINT/ERROR -->
        @if (field.hint) {
        <ion-note slot="helper">{{ field.hint }}</ion-note>
        } @if (form.controls[field.name].errors &&
        form.controls[field.name].touched) {
        <ion-note color="danger">
          {{ getErrorMessage(form.controls[field.name].errors) }}
        </ion-note>
        } }
      </ion-col>
      }
    </ion-row>
  </ion-grid>
</form>

<!-- esse if apenas para tirar os warings para o import da diretiva auto focus e do image preview que so usa no arquivo ts -->
@if(false){
<app-image-preview [mbAutoFocus]="false"></app-image-preview>
}

<!-- fim if form -->
}



---------------------------------------------------------------------------------------------





*/
