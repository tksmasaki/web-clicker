## Why

キーボードのみでページ上の任意のインタラクティブ要素（リンク・ボタン・input 等）へアクセスできる Chrome 拡張機能が存在しないため、マウスなしで操作速度とアクセシビリティを向上させたい。Vimium はリンク中心でフォーム要素を網羅していないため、新たに実装する。

## What Changes

- `Ctrl+F` キーでヒントモードを起動し、ページ上の全フォーカス可能要素にアルファベットラベル（a〜z / aa〜zz …）のバッジを表示する
- アルファベットを入力するとリアルタイムでフィルタリングされ、一致した要素を自動クリック・フォーカスする
- `Backspace` で入力を 1 文字取り消し、`Escape` またはスクロールでキャンセル
- 対象要素: `a[href]`, `button`, `input`, `select`, `textarea`, `[tabindex]`, `[contenteditable]`

## Capabilities

### New Capabilities

- `hint-mode`: `Ctrl+F` で起動するヒントオーバーレイ。フォーカス可能要素の検出・ラベル生成・キー入力によるフィルタリング・クリック実行を担う

### Modified Capabilities

（既存スペックなし）

## Impact

- 新規 Chrome 拡張機能プロジェクト（Manifest V3）
- Content script のみ、特別な permission 不要
- 全ページ（`<all_urls>`）に挿入される
- Shadow DOM でページ CSS との干渉を防ぐ
