import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
// Importe os componentes de preview (ajuste os caminhos)
import { ImagePreviewComponent } from '../components/image-preview/image-preview.component'; // Exemplo
import { VideoPreviewComponent } from '../components/video-preview/video-preview.component'; // Exemplo
import { DocumentPreviewComponent } from '../components/document-preview/document-preview.component'; // Exemplo

import { PlatformService } from './platform.service'; // Serviço criado anteriormente
import { eFileAccept } from '../components/dynamic-form.component/enums/image-video-document.enum';
import {
  IMediaItemForm,
  IMediaRemovalData,
  MediaControlValue,
} from '../components/dynamic-form.component/interfaces/medias.interface';
import { dataURLtoBlob } from '../utils/medias.util';

import { Filesystem, Directory } from '@capacitor/filesystem';

/*

https://github.com/ionic-team/capacitor-filesystem

para instalar - npm install @capacitor/filesystem --legacy-peer-deps

//permissoes plugin file system
//<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
//<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

ios

<key>NSDownloadsFolderUsageDescription</key>
<string>Para salvar os documentos e mídias de pré-visualização no seu dispositivo.</string>

<key>NSFileProviderDomainUsageDescription</key>
<string>Para que você possa compartilhar e visualizar documentos salvos no aplicativo.</string>
*/

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(
    private readonly modalCtrl: ModalController,
    private readonly platformService: PlatformService
  ) {}

  /**
   * Lógica comum para apresentar o Modal e capturar a remoção da mídia.
   * @param component O componente (Image, Video, Document) a ser aberto no modal.
   * @param props As propriedades a serem passadas para o componente.
   * @returns Uma Promise com os dados de remoção (se houver).
   */
  private async presentModalAndHandleRemoval(
    component: any,
    props: any
  ): Promise<IMediaRemovalData | null> {
    try {
      const modal = await this.modalCtrl.create({
        component: component,
        cssClass: props.cssClass || 'custom-modal',
        componentProps: props,
      });

      await modal.present();

      const { data } = await modal.onWillDismiss();

      if (data?.removed === true) {
        // Retorna os dados necessários para o componente pai (DynamicForm)
        return {
          removed: true,
          controlName: data.controlName,
          itemIndex: data.itemIndex,
        };
      }
      return null;
    } catch (error) {
      console.error(
        'Erro ao abrir o modal de preview: - medias.service.ts:78',
        error
      );
      return null;
    }
  }

  // Função para Preview de Imagens
  public async previewImage(
    mediaBase64: string,
    controlName: string,
    itemIndex?: number,
    isGallery: boolean = false
  ): Promise<IMediaRemovalData | null> {
    return this.presentModalAndHandleRemoval(ImagePreviewComponent, {
      imageUrl: mediaBase64,
      controlName: controlName,
      itemIndex: itemIndex,
      isGallery: isGallery,
    });
  }

  // Função para Preview de Vídeos
  public async previewVideo(
    mediaBase64: string,
    controlName: string,
    itemIndex?: number,
    isGallery: boolean = false
  ): Promise<IMediaRemovalData | null> {
    return this.presentModalAndHandleRemoval(VideoPreviewComponent, {
      videoUrl: mediaBase64,
      controlName: controlName,
      itemIndex: itemIndex,
      isGallery: isGallery,
    });
  }

  // Função para Preview de Documentos (PDF, etc.)
  public async previewDocument(
    mediaBase64: string,
    mimeType: string,
    controlName: string,
    itemIndex?: number,
    isGallery: boolean = false
  ): Promise<IMediaRemovalData | null> {
    // 1. Lógica para PDF em ambiente Híbrido (usa modal local)
    if (mimeType === eFileAccept.PDF && this.platformService.isMobileHybrid()) {
      return this.presentModalAndHandleRemoval(DocumentPreviewComponent, {
        documentUrl: mediaBase64,
        controlName: controlName,
        itemIndex: itemIndex,
        isGallery: isGallery,
        cssClass: 'custom-modal-documents', // Diferencia o CSS do modal de documentos
      });
    }

    // 2. Lógica para Documentos Web (abre em nova aba via Blob/Object URL)
    try {
      const mediaBlob = dataURLtoBlob(mediaBase64);
      const finalUrlToOpen = URL.createObjectURL(mediaBlob);

      console.log(
        `Abrindo ${mimeType} usando Object URL. - medias.service.ts:137`
      );

      const newWindow = window.open(finalUrlToOpen, '_blank');

      if (newWindow) {
        newWindow.onbeforeunload = () => URL.revokeObjectURL(finalUrlToOpen);
      } else {
        console.warn(
          'Popup bloqueado. Tentando abrir na aba atual. - medias.service.ts:144'
        );
        window.location.href = finalUrlToOpen;
      }
      return null; // Nenhuma remoção de mídia ocorre ao abrir em nova aba
    } catch (e) {
      console.error(
        'Erro ao converter Base64 para Blob. Tentando abrir Base64 puro:',
        e
      );
      window.open(mediaBase64, '_blank');
      return null;
    }
  }

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

  /**
   * Função auxiliar para extrair o mimeType de uma string Data URL.
   */
  extractMimeType(base64DataUrl: string): string | undefined {
    if (base64DataUrl?.startsWith('data:')) {
      const mime = base64DataUrl.substring(5, base64DataUrl.indexOf(';'));
      return mime || undefined;
    }
    return undefined;
  }

  /**
   * EXTRAI E VALIDA os dados de mídia do valor bruto do FormControl.
   * * @param controlValue O valor do controle do formulário (tipado como MediaControlValue).
   * @param itemIndex Índice usado se for uma galeria (Array).
   * @returns Objeto com dados da mídia ou null se for inválido.
   */
  public extractMediaData(
    // Agora aceita a união de todos os tipos possíveis do FormControl
    controlValue: MediaControlValue,
    itemIndex?: number
  ): {
    mediaBase64: string;
    mimeType: string | null;
    isGallery: boolean;
  } | null {
    const isGallery = Array.isArray(controlValue);
    let mediaBase64: string | undefined; // Inicializa como undefined para validação
    let mimeType: string | undefined;

    if (isGallery) {
      // --- 1. Caso Galeria (Array de IMediaItemForm) ---
      if (itemIndex === undefined) {
        console.warn(
          'Índice do item é necessário para galeria. - medias.service.ts:240'
        );
        return null;
      }

      const controlArray = controlValue as IMediaItemForm[];
      const mediaItem = controlArray[itemIndex];

      if (mediaItem) {
        mediaBase64 = mediaItem.base64;
        mimeType = mediaItem.mimeType;
      }
    } else if (controlValue) {
      // --- 2. Caso Item Único (Objeto IMediaItemForm ou String Base64) ---

      // Se for um objeto com a propriedade 'base64' (IMediaItemForm)
      if (typeof controlValue === 'object' && 'base64' in controlValue) {
        const mediaItem = controlValue as IMediaItemForm;
        mediaBase64 = mediaItem.base64;
        mimeType = mediaItem.mimeType;

        // Se for apenas a string Base64 pura
      } else if (typeof controlValue === 'string') {
        mediaBase64 = controlValue;
        // Tenta extrair o mimeType da string se ele não veio junto
        mimeType = this.extractMimeType(mediaBase64);
      }
    }

    // Validação Final (Garantindo que a Base64 exista e seja uma string)
    if (!mediaBase64 || typeof mediaBase64 !== 'string') {
      console.warn(
        'Não há mídia válida para visualização. - medias.service.ts:270'
      );
      return null;
    }

    // Retornamos os dados validados (mimeType pode ser undefined, transformamos em null)
    return {
      mediaBase64,
      mimeType: mimeType || null,
      isGallery,
    };
  }

  async downloadDocument(documentUrl: string, mimetype: string) {
    if (!documentUrl) {
      console.warn(
        'URL do documento não está disponível para download.  documentpreview.component.ts:99'
      );
      return;
    }

    // 1. OBTÉM O MIME TYPE (Prioriza o Input, senão extrai da URL)
    const finalMimeType = mimetype || this.extractMimeType(documentUrl);

    if (!finalMimeType) {
      console.error(
        'Não foi possível determinar o MIME Type para download.  documentpreview.component.ts:108'
      );
      return;
    }

    try {
      // Extrai a string Base64 pura
      const base64Data = documentUrl.split(',')[1];

      // Determina o nome do arquivo usando o MIME Type garantido
      const extension = finalMimeType.split('/').pop() || 'dat';
      const fileName = `documento_download_${Date.now()}.${extension}`;

      // 2. Chama a lógica do Capacitor Filesystem (que funciona em Mobile e Web)
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents,
      });

      console.log(result, 'aaa  documentpreview.component.ts:127');

      // ... (Feedback ao usuário) ...
    } catch (error) {
      console.error(
        'Erro ao salvar o arquivo no sistema de arquivos nativo:',
        error
      );
    }
  }
}
