import { HintManager } from './hints';

const manager = new HintManager();

document.addEventListener(
  'keydown',
  (e: KeyboardEvent) => {
    if (manager.active) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        manager.deactivate();
        return;
      }

      if (e.key === 'Backspace' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        manager.handleBackspace();
        return;
      }

      if (
        e.key.length === 1 &&
        /^[a-z]$/i.test(e.key) &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        e.stopPropagation();
        manager.handleKey(e.key);
        return;
      }
    }

    if (e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey && e.key === 'f') {
      e.preventDefault();
      e.stopPropagation();
      if (manager.active) {
        manager.deactivate();
      } else {
        manager.activate();
      }
    }
  },
  true, // キャプチャフェーズで登録し、ブラウザのデフォルト処理より先に実行
);

document.addEventListener(
  'scroll',
  () => {
    if (manager.active) manager.deactivate();
  },
  true,
);
