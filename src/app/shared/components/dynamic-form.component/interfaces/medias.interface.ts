export interface IMediaItemForm {
  base64: string; // A string Base64 (ou a URL de download)
  mimeType?: string; // O tipo MIME completo (ex: image/jpeg, application/pdf)
  fileName: string; // O nome original do arquivo (ex: foto_ferias.jpg)
}

// Definição da interface de retorno de remoção (para o Service notificar o Componente)
export interface IMediaRemovalData {
  removed: boolean;
  controlName: string;
  itemIndex?: number;
}

export type MediaItemOrString = IMediaItemForm | string; // Um objeto completo ou apenas a string Base64
export type MediaControlValue =
  | MediaItemOrString
  | IMediaItemForm[]
  | null
  | undefined;
