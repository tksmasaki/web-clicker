import { HintManager } from './hints';

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main() {
    const manager = new HintManager();

    function toggle() {
      if (manager.active) {
        manager.deactivate();
      } else {
        manager.activate();
      }
    }

    // Via the Commands API (Alt+F, or a key the user set at chrome://extensions/shortcuts)
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
        // Don't use pre-commit keys during IME composition (e.g. romaji input) for hints.
        if (e.isComposing || e.keyCode === 229) return;

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
  },
});
