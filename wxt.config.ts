import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'Web Clicker',
    description: 'Show hint labels with Alt+F and click any page element using only the keyboard.',
    commands: {
      'toggle-hints': {
        suggested_key: {
          default: 'Alt+F',
          mac: 'Alt+F',
        },
        description: 'Toggle hint mode',
      },
    },
    icons: {
      16: 'icons/icon16.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png',
    },
  },
});
