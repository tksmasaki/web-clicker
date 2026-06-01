# web-clicker

キーボードだけでページ上の任意のインタラクティブ要素をクリックできる Chrome 拡張機能。

[Vimium](https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb) の "open a link in the current tab" 機能に相当する UX を、リンクだけでなく `input` / `button` / `select` 等のフォーム要素にも対応させた拡張機能です。

## 使い方

| 操作 | 効果 |
|------|------|
| `Alt+F` | ヒントモード起動・終了 |
| `a`〜`z` | ラベルでフィルタリング（候補が1つに確定した瞬間に自動クリック） |
| `Backspace` | 入力を1文字取り消し |
| `Escape` | ヒントモードをキャンセル |
| スクロール | ヒントモードを自動終了 |

### ショートカットキーの変更

`chrome://extensions/shortcuts` を開き、**web-clicker** の「ヒントモードの起動・終了」を任意のキーに変更できます。

## ヒントの対象要素

- `a[href]` — リンク
- `button` — ボタン
- `input` — テキストボックス、チェックボックス等
- `select` — セレクトボックス
- `textarea` — テキストエリア
- `[tabindex]` — tabindex 付き要素
- `[contenteditable]` — 編集可能要素

## インストール（開発版）

Node.js 20 以上が必要です。

```bash
git clone https://github.com/tksmasaki/web-clicker.git
cd web-clicker
npm install
npm run build
```

1. Chrome で `chrome://extensions/` を開く
2. デベロッパーモードを ON にする
3. 「パッケージ化されていない拡張機能を読み込む」→ `.output/chrome-mv3/` フォルダを選択

## 開発

```bash
npm run dev        # 開発サーバー（HMR 付き、ブラウザ自動起動）
npm test           # ユニットテスト
npm run build      # プロダクションビルド
npm run zip        # 配布用 zip を生成
npm run typecheck  # 型チェック
```

## 技術スタック

- TypeScript
- [WXT](https://wxt.dev/)（Vite ベースの拡張機能フレームワーク）
- Manifest V3
- Vitest

## 安全性

- **外部通信なし** — ネットワークリクエストを一切行いません
- **権限ゼロ** — `permissions` を一切要求しません（ショートカットのリレーは権限不要の `chrome.tabs.sendMessage` で実現）
- **スタイル隔離** — Shadow DOM によりページの CSS に干渉しません

## ライセンス

MIT
