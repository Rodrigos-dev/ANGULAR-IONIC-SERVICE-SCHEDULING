import {
  Component,
  inject,
  Input,
  OnInit,
  SecurityContext,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: [`./document-preview.component.scss`],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DocumentPreviewComponent implements OnInit {
  // A URL/Base64 do documento
  @Input() documentUrl: string | undefined;
  // O nome do controle de formulário
  @Input() controlName: string | undefined;

  @Input() itemIndex: number | undefined; // Recebe o index!

  @Input() mimetype!: string;

  // URL segura para ser usada no iframe
  public safeDocumentUrl: SafeResourceUrl | undefined;

  private readonly modalCtrl = inject(ModalController);
  private readonly sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    if (this.documentUrl) {
      // O DomSanitizer é crucial para permitir que a URL/Base64 seja usada
      // como src em um iframe, prevenindo vulnerabilidades XSS.
      this.safeDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.documentUrl + '#zoom=60'
      );
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
}
