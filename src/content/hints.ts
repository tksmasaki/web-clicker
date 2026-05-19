const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const N = ALPHABET.length;

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

const HINT_STYLES = `
  .badge {
    position: fixed;
    background: #ffd700;
    color: #111;
    border: 1px solid #b8960c;
    border-radius: 3px;
    font: bold 13px/1.4 system-ui, -apple-system, sans-serif;
    padding: 3px 6px;
    letter-spacing: 0.05em;
    pointer-events: none;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.25);
    z-index: 2147483647;
    transform: translate(-1px, -1px);
  }
  .badge .matched {
    color: #a07c00;
    text-decoration: line-through;
  }
`;

export function generateLabels(count: number): string[] {
  if (count === 0) return [];

  if (count <= N) {
    return Array.from({ length: count }, (_, i) => ALPHABET[i]);
  }

  if (count <= N * N) {
    return Array.from({ length: count }, (_, i) =>
      ALPHABET[Math.floor(i / N)] + ALPHABET[i % N]
    );
  }

  return Array.from({ length: count }, (_, i) => {
    const c = i % N;
    const b = Math.floor(i / N) % N;
    const a = Math.floor(i / (N * N));
    return ALPHABET[a] + ALPHABET[b] + ALPHABET[c];
  });
}

function isVisible(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;
  if (rect.bottom < 0 || rect.top > window.innerHeight) return false;
  if (rect.right < 0 || rect.left > window.innerWidth) return false;
  const s = window.getComputedStyle(el);
  return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0';
}

interface HintEntry {
  element: Element;
  label: string;
  badge: HTMLElement;
}

export class HintManager {
  private readonly shadow: ShadowRoot;
  private readonly container: HTMLElement;
  private hints: HintEntry[] = [];
  private typed = '';
  private _active = false;

  constructor() {
    const host = document.createElement('div');
    host.id = '__web-clicker-host__';
    Object.assign(host.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '0',
      height: '0',
      overflow: 'visible',
      zIndex: '2147483647',
      pointerEvents: 'none',
    });

    this.shadow = host.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = HINT_STYLES;
    this.shadow.appendChild(style);

    this.container = document.createElement('div');
    this.shadow.appendChild(this.container);

    document.documentElement.appendChild(host);
  }

  get active(): boolean {
    return this._active;
  }

  activate(): void {
    this.typed = '';
    this.hints = this.buildHints();
    this.render();
    this._active = true;
  }

  deactivate(): void {
    this.container.innerHTML = '';
    this.hints = [];
    this.typed = '';
    this._active = false;
  }

  handleKey(key: string): void {
    this.typed += key.toLowerCase();
    const matching = this.hints.filter(h => h.label.startsWith(this.typed));

    if (matching.length === 0) {
      this.deactivate();
      return;
    }

    if (matching.length === 1 && matching[0].label === this.typed) {
      this.trigger(matching[0].element);
      this.deactivate();
      return;
    }

    this.updateBadges();
  }

  handleBackspace(): void {
    if (this.typed.length > 0) {
      this.typed = this.typed.slice(0, -1);
      this.updateBadges();
    }
  }

  private buildHints(): HintEntry[] {
    const elements = Array.from(document.querySelectorAll<Element>(FOCUSABLE_SELECTORS));
    const visible = elements.filter(isVisible);
    const labels = generateLabels(visible.length);
    return visible.map((element, i) => ({
      element,
      label: labels[i],
      badge: this.createBadge(element, labels[i]),
    }));
  }

  private createBadge(el: Element, label: string): HTMLElement {
    const rect = el.getBoundingClientRect();
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.style.left = `${rect.left}px`;
    badge.style.top = `${rect.top}px`;
    badge.textContent = label;
    return badge;
  }

  private render(): void {
    this.container.innerHTML = '';
    for (const hint of this.hints) {
      this.container.appendChild(hint.badge);
    }
  }

  private updateBadges(): void {
    for (const { label, badge } of this.hints) {
      const matches = label.startsWith(this.typed);
      badge.style.display = matches ? '' : 'none';
      if (matches) {
        const done = label.slice(0, this.typed.length);
        const rest = label.slice(this.typed.length);
        badge.innerHTML =
          `<span class="matched">${done}</span>${rest}`;
      }
    }
  }

  private trigger(el: Element): void {
    if (el instanceof HTMLElement) {
      el.focus();
      el.click();
    }
  }
}
