import { Pipe, PipeTransform } from '@angular/core';
import { MediaService } from '../services/medias.service';
import { IMediaItemForm } from '../components/dynamic-form.component/interfaces/medias.interface';
import { eFileAccept } from '../components/dynamic-form.component/enums/image-video-document.enum';

type MediaType = 'image' | 'video' | 'document';

@Pipe({
  name: 'isMediaType',
  standalone: true,
})
export class IsMediaTypePipe implements PipeTransform {
  constructor(private readonly mediaService: MediaService) {}

  /**
   * @param mediaItem O objeto de mídia (IMediaItemForm) a ser verificado.
   * @param mediaType O tipo de mídia que você deseja verificar ('image', 'video', 'document').
   * @param fileAccept O eFileAccept necessário para a verificação.
   * @returns True se o item de mídia for do tipo especificado.
   */
  transform(
    mediaItem: IMediaItemForm,
    mediaType: MediaType,
    fileAccept: eFileAccept
  ): boolean {
    // Validação básica
    if (!mediaItem?.base64) {
      return false;
    }

    switch (mediaType) {
      case 'image':
        return this.mediaService.isImage(mediaItem, fileAccept);
      case 'video':
        return this.mediaService.isVideo(mediaItem, fileAccept);
      case 'document':
        return this.mediaService.isDocument(mediaItem, fileAccept);
      default:
        return false;
    }
  }
}
