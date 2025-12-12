import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MediaService } from '../../services/medias.service';
/*
doc pdf viewer
https://www.npmjs.com/package/ng2-pdf-viewer
*/

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: [`./document-preview.component.scss`],
  standalone: true,
  imports: [CommonModule, IonicModule, PdfViewerModule],
})
export class DocumentPreviewComponent implements OnInit {
  // A URL/Base64 do documento
  @Input() documentUrl: string | undefined;
  // O nome do controle de formulário
  @Input() controlName: string | undefined;

  @Input() itemIndex: number | undefined; // Recebe o index!

  @Input() mimetype!: string;

  private readonly modalCtrl = inject(ModalController);
  private readonly mediaService = inject(MediaService);

  // Variáveis para controle do visualizador
  public zoom: number = 1; // Zoom inicial (1.0 = 100%)
  public originalSize: boolean = false; // Ajustar o PDF ao container
  public page: number = 1; // Pode ser útil para definir a página inicial

  ngOnInit(): void {
    if (this.documentUrl) {
      // 1. Configura o zoom inicial
      // Se originalSize for 'false', o PDF tentará se ajustar ao container (fit).
      this.originalSize = false;
    }
  }

  /**
   * Fecha o modal sem retornar nenhuma ação de remoção.
   */
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  /**
   * Fecha o modal e retorna um sinal de que o documento deve ser removido.
   */
  removeDocument() {
    // Retorna um objeto de resultado para o componente pai
    this.modalCtrl.dismiss({
      removed: true,
      controlName: this.controlName,
      itemIndex: this.itemIndex,
    });
  }

  async downloadDocument() {
    if (this.documentUrl) {
      await this.mediaService.downloadDocument(this.documentUrl, this.mimetype);
    }
  }
}
