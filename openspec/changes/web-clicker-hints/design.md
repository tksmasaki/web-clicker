## Context

新規の Chrome 拡張機能プロジェクト。既存コードなし。
Manifest V3・Content Script のみで構成し、特別な permission は不要。
全ページに挿入されるため、ページの CSS・JS への干渉を最小化する設計が必須。

## Goals / Non-Goals

**Goals:**
- キーボードのみでページ上のインタラクティブ要素をクリック・フォーカスできる
- Shadow DOM によりページスタイルとの完全な隔離を実現する
- TypeScript + Vite + CRXJS を用いたモダンなビルドパイプライン

**Non-Goals:**
- スクロール後のヒント位置リアルタイム更新
- カスタムショートカットキーの設定 UI
- Firefox 等他ブラウザへの対応

## Decisions

**D1: Shadow DOM によるスタイル隔離**
- `mode: 'closed'` の Shadow Root をページの `<html>` 要素直下に追加
- バッジの CSS はすべて Shadow Root 内の `<style>` として注入
- 理由: ページ側の CSS リセットやグローバルスタイルに完全に耐性を持つ

**D2: `keydown` イベントのキャプチャフェーズ登録**
- `document.addEventListener('keydown', handler, true)` を使用
- 理由: ページ内の他ハンドラより先に実行し `Ctrl+F` で確実に `preventDefault()` できる

**D3: ラベル生成は純粋関数**
- `generateLabels(count)` は副作用なしの純粋関数として切り出す
- 理由: DOM に依存せず Vitest でユニットテスト可能

**D4: `position: fixed` によるバッジ配置**
- `getBoundingClientRect()` で viewport 基準の座標を取得して固定配置
- スクロール時は座標がずれるためスクロールイベントでヒントモードを自動終了
- 理由: `position: absolute` + スクロールオフセット計算より実装が単純

## Risks / Trade-offs

- **[Risk] `Ctrl+F` のブラウザ占有** → キャプチャフェーズでの `preventDefault()` で対処。Chrome では Content Script が先にイベントを受け取れる
- **[Risk] 大量要素によるパフォーマンス低下** → `querySelectorAll` + `getBoundingClientRect` は同期処理のため要素数が多いページでは数十 ms かかる可能性。現バージョンはシンプルさを優先
- **[Trade-off] スクロール後の再表示なし** → UX は若干低下するが、実装の複雑さ（ResizeObserver + MutationObserver）を避けられる
