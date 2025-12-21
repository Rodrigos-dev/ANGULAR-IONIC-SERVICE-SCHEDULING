import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'service-scheduling',
  webDir: 'www',

  plugins: {
    Keyboard: {
      resize: KeyboardResize.None, // Impede que a tela "pule" ao clicar em inputs
    },
  },
};

export default config;
