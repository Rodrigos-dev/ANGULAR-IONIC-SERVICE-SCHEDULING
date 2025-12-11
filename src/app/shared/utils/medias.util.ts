/**
 * Converte uma string Data URL (Base64) em um Blob (Objeto Binário).
 * Função utilitária movida do componente para o serviço.
 */
export const dataURLtoBlob = (dataurl: string): Blob => {
  const parts = dataurl.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1];
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
