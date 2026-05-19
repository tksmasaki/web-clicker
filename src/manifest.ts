import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'web-clicker',
  version: '0.2.0',
  description: 'Alt+F でヒントを表示し、キーボードだけでページ上の要素をクリックできます。',
  icons: {
    '16': 'icons/icon16.png',
    '48': 'icons/icon48.png',
    '128': 'icons/icon128.png',
  },
  commands: {
    'toggle-hints': {
      suggested_key: {
        default: 'Alt+F',
        mac: 'Alt+F',
      },
      description: 'ヒントモードの起動・終了',
    },
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  permissions: ['tabs'],
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.ts'],
      run_at: 'document_idle',
    },
  ],
});
