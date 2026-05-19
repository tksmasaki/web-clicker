## 1. プロジェクトセットアップ

- [ ] 1.1 package.json を作成（Vite + CRXJS + TypeScript + Vitest）
- [ ] 1.2 tsconfig.json を作成
- [ ] 1.3 vite.config.ts を作成（CRXJS プラグイン設定）
- [ ] 1.4 .gitignore を作成

## 2. Manifest V3

- [ ] 2.1 src/manifest.ts を作成（defineManifest・content_scripts・icons）

## 3. ヒント生成ロジック（src/content/hints.ts）

- [ ] 3.1 generateLabels(count) 純粋関数を実装（1〜3 文字ラベル生成）
- [ ] 3.2 isVisible(el) ヘルパーを実装（display/visibility/opacity/viewport チェック）
- [ ] 3.3 HintManager クラスを実装
- [ ] 3.4 Shadow DOM ホストの初期化（mode: closed）
- [ ] 3.5 activate(): フォーカス可能要素の収集・ラベル生成・バッジ描画
- [ ] 3.6 deactivate(): バッジ削除・状態リセット
- [ ] 3.7 handleKey(key): プレフィックスフィルタリング・完全一致でクリック実行
- [ ] 3.8 handleBackspace(): 1 文字取り消しとバッジ再表示

## 4. コンテントスクリプト（src/content/index.ts）

- [ ] 4.1 keydown イベントリスナーをキャプチャフェーズで登録
- [ ] 4.2 Ctrl+F: preventDefault + ヒントモードトグル
- [ ] 4.3 Escape: ヒントモード終了
- [ ] 4.4 [a-z]: handleKey() 呼び出し
- [ ] 4.5 Backspace: handleBackspace() 呼び出し
- [ ] 4.6 scroll: ヒントモード自動終了

## 5. アイコン生成

- [ ] 5.1 scripts/generate-icons.mjs を作成（純粋 Node.js + zlib で PNG 生成）
- [ ] 5.2 npm run generate-icons を実行して public/icons/ に PNG を出力

## 6. テスト・ビルド確認

- [ ] 6.1 src/content/hints.test.ts で generateLabels のユニットテストを作成
- [ ] 6.2 npm install
- [ ] 6.3 npm test（全テスト pass を確認）
- [ ] 6.4 npm run build（dist/ の生成を確認）
