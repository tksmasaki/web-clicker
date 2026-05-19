import { HintManager } from './hints';

const manager = new HintManager();

function toggle() {
  if (manager.active) {
    manager.deactivate();
  } else {
    manager.activate();
  }
}

// Commands API 経由（Alt+F、または chrome://extensions/shortcuts でユーザーが設定したキー）
chrome.runtime.onMessage.addListener((message: unknown) => {
  if (
    message !== null &&
    typeof message === 'object' &&
    (message as { type?: string }).type === 'toggle-hints'
  ) {
    toggle();
  }
});

document.addEventListener(
  'keydown',
  (e: KeyboardEvent) => {
    if (!manager.active) return;

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
    }
  },
  true,
);

document.addEventListener(
  'scroll',
  () => {
    if (manager.active) manager.deactivate();
  },
  true,
);
