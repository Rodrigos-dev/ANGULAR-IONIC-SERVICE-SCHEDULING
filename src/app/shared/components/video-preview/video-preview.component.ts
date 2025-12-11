import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: [`./video-preview.component.scss`],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class VideoPreviewComponent {
  // A URL do vídeo (pode ser Base64 temporário ou URL do Storage)
  @Input() videoUrl: string | undefined;
  // O nome do controle de formulário que disparou o modal
  @Input() controlName: string | undefined;

  @Input() itemIndex: number | undefined; // Recebe o index!

  private readonly modalCtrl = inject(ModalController);

  /**
   * Fecha o modal sem retornar nenhuma ação de remoção.
   */
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  /**
   * Fecha o modal e retorna um sinal de que o vídeo deve ser removido do formulário pai.
   */
  removeVideo() {
    // Retorna um objeto de resultado para o componente pai
    this.modalCtrl.dismiss({
      removed: true,
      controlName: this.controlName,
      itemIndex: this.itemIndex,
    });
  }
}
