import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: [`./image-preview.component.scss`],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ImagePreviewComponent {
  // ... (Restante do código do componente: @Input e dismissModal)
  @Input() imageUrl: string | undefined;
  @Input() controlName: string | undefined;

  private readonly modalCtrl = inject(ModalController);

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  removeImage() {
    // Retorna um objeto de resultado para o componente pai
    this.modalCtrl.dismiss({
      removed: true,
      controlName: this.controlName,
    });
  }
}
