# web-clicker

キーボードだけでページ上の任意のインタラクティブ要素をクリックできる Chrome 拡張機能。

[Vimium](https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb) の "open a link in the current tab" 機能に相当する UX を、リンクだけでなく `input` / `button` / `select` 等のフォーム要素にも対応させた拡張機能です。

## 使い方

| 操作 | 効果 |
|------|------|
| `Alt+F` | ヒントモード起動・終了 |
| `a`〜`z` | ラベルでフィルタリング（1文字に絞れた瞬間に自動クリック） |
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

```bash
git clone https://github.com/tksmasaki/web-clicker.git
cd web-clicker
npm install
npm run build
```

1. Chrome で `chrome://extensions/` を開く
2. デベロッパーモードを ON にする
3. 「パッケージ化されていない拡張機能を読み込む」→ `dist/` フォルダを選択

## 開発

```bash
npm run dev        # 開発ビルド（ウォッチモード）
npm test           # ユニットテスト
npm run build      # プロダクションビルド
npm run typecheck  # 型チェック
```

## 技術スタック

- TypeScript
- [Vite](https://vitejs.dev/) + [@crxjs/vite-plugin](https://crxjs.dev/)
- Manifest V3
- Vitest

## 安全性

- **外部通信なし** — ネットワークリクエストを一切行いません
- **最小権限** — `tabs` 権限のみ（ショートカットキーのリレーに使用）
- **スタイル隔離** — Shadow DOM によりページの CSS に干渉しません

## ライセンス

MIT
