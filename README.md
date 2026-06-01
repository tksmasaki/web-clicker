# Web Clicker

Chrome extension that lets you click any interactive element on a page using
only the keyboard.

It brings the UX of [Vimium](https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)'s
"open a link in the current tab" to more than just links — `input` / `button` /
`select` and other form controls are supported too.

## Usage

| Key | Effect |
|-----|--------|
| `Alt+F` | Toggle hint mode |
| `a`–`z` | Filter by label (auto-activates the moment a single match remains) |
| `Backspace` | Delete the last typed character |
| `Escape` | Cancel hint mode |
| Scroll | Automatically exit hint mode |

Activating a hint focuses text fields, selects, and editable elements; links,
buttons, and checkbox/radio-style inputs are clicked.

### Changing the shortcut

Open `chrome://extensions/shortcuts` and rebind **Web Clicker**'s "Toggle hint
mode" to any key.

## Hinted elements

- `a[href]` — links
- `button` — buttons
- `input` — text boxes, checkboxes, etc.
- `select` — select boxes
- `textarea` — text areas
- `[tabindex]` — elements with a tabindex
- `[contenteditable]` — editable elements

Occluded elements (behind modals, sticky headers, etc.) and
`pointer-events: none` elements are skipped.

## Install (unpacked)

Requires Node.js 20+.

```bash
git clone https://github.com/tksmasaki/web-clicker.git
cd web-clicker
npm install
npm run build
```

1. Open `chrome://extensions/` in Chrome.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `.output/chrome-mv3/` directory.

## Development

```bash
npm run dev        # dev server (HMR, auto-opens the browser)
npm test           # unit tests
npm run build      # production build
npm run zip        # build a distributable zip
npm run typecheck  # type check
```

## Tech stack

- TypeScript
- [WXT](https://wxt.dev/) (Vite-based extension framework)
- Manifest V3
- Vitest

## Safety

- **No external communication** — makes no network requests.
- **Zero permissions** — requests no `permissions` at all (the shortcut relay uses `chrome.tabs.sendMessage`, which needs none).
- **Style isolation** — a Shadow DOM keeps it from interfering with the page's CSS.

## License

MIT
