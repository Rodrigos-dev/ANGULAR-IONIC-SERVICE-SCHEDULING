// src/app/services/platform.service.ts
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private readonly platform: Platform) {}

  /**
   * Retorna a plataforma primária em que o app está rodando.
   * Útil para lógica condicional (ex: estilos, funcionalidades).
   * @returns 'web', 'ios', 'android', 'electron' ou 'unknown'.
   */
  public getPrimaryPlatform():
    | 'web'
    | 'ios'
    | 'android'
    | 'electron'
    | 'unknown' {
    if (this.platform.is('hybrid')) {
      // Se for um aplicativo nativo (usando Capacitor/Cordova)
      if (this.platform.is('ios')) {
        return 'ios';
      } else if (this.platform.is('android')) {
        return 'android';
      }
    } else if (this.platform.is('pwa') || this.platform.is('desktop')) {
      // Se for PWA ou rodando em um navegador de desktop
      return 'web';
    } else if (this.platform.is('electron')) {
      return 'electron';
    }

    // Fallback
    return 'unknown';
  }

  /**
   * Retorna um array de strings com todas as flags da plataforma.
   * Ex: ['cordova', 'android', 'mobile', 'hybrid'] ou ['pwa', 'desktop', 'dom']
   */
  public getPlatformDetails(): string[] {
    return this.platform.platforms();
  }

  /**
   * Retorna TRUE se estiver rodando em qualquer dispositivo móvel (iOS ou Android nativo).
   */
  public isMobileHybrid(): boolean {
    return this.platform.is('ios') || this.platform.is('android');
  }

  /**
   * Retorna TRUE se estiver rodando no navegador (PWA ou desktop).
   */
  public isWeb(): boolean {
    return (
      this.platform.is('pwa') ||
      this.platform.is('desktop') ||
      this.platform.is('mobileweb')
    );
  }
}
