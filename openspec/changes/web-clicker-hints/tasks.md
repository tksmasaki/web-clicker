## 1. プロジェクトセットアップ

- [x] 1.1 package.json を作成（Vite + CRXJS + TypeScript + Vitest）
- [x] 1.2 tsconfig.json を作成
- [x] 1.3 vite.config.ts を作成（CRXJS プラグイン設定）
- [x] 1.4 .gitignore を作成

## 2. Manifest V3

- [x] 2.1 src/manifest.ts を作成（defineManifest・content_scripts・icons）

## 3. ヒント生成ロジック（src/content/hints.ts）

- [x] 3.1 generateLabels(count) 純粋関数を実装（1〜3 文字ラベル生成）
- [x] 3.2 isVisible(el) ヘルパーを実装（display/visibility/opacity/viewport チェック）
- [x] 3.3 HintManager クラスを実装
- [x] 3.4 Shadow DOM ホストの初期化（mode: closed）
- [x] 3.5 activate(): フォーカス可能要素の収集・ラベル生成・バッジ描画
- [x] 3.6 deactivate(): バッジ削除・状態リセット
- [x] 3.7 handleKey(key): プレフィックスフィルタリング・完全一致でクリック実行
- [x] 3.8 handleBackspace(): 1 文字取り消しとバッジ再表示

## 4. コンテントスクリプト（src/content/index.ts）

- [x] 4.1 keydown イベントリスナーをキャプチャフェーズで登録
- [x] 4.2 Ctrl+F: preventDefault + ヒントモードトグル
- [x] 4.3 Escape: ヒントモード終了
- [x] 4.4 [a-z]: handleKey() 呼び出し
- [x] 4.5 Backspace: handleBackspace() 呼び出し
- [x] 4.6 scroll: ヒントモード自動終了

## 5. アイコン生成

- [x] 5.1 scripts/generate-icons.mjs を作成（純粋 Node.js + zlib で PNG 生成）
- [x] 5.2 npm run generate-icons を実行して public/icons/ に PNG を出力

## 6. テスト・ビルド確認

- [x] 6.1 src/content/hints.test.ts で generateLabels のユニットテストを作成
- [x] 6.2 npm install
- [x] 6.3 npm test（全テスト pass を確認）
- [x] 6.4 npm run build（dist/ の生成を確認）
