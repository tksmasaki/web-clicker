import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'web-clicker',
    description: 'Alt+F でヒントを表示し、キーボードだけでページ上の要素をクリックできます。',
    commands: {
      'toggle-hints': {
        suggested_key: {
          default: 'Alt+F',
          mac: 'Alt+F',
        },
        description: 'ヒントモードの起動・終了',
      },
    },
    icons: {
      16: 'icons/icon16.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png',
    },
  },
});
