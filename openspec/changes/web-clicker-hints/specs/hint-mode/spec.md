## ADDED Requirements

### Requirement: Ctrl+F でヒントモードを起動・終了する
拡張機能は `Ctrl+F` キー押下時にヒントモードを起動し、ブラウザのデフォルト検索バーを抑止しなければならない（SHALL）。ヒントモード中に再度 `Ctrl+F` を押すと終了しなければならない（SHALL）。

#### Scenario: Ctrl+F でヒントモード起動
- **WHEN** ユーザーが任意のページで `Ctrl+F` を押す
- **THEN** ページ上のフォーカス可能要素にアルファベットバッジが表示される
- **THEN** ブラウザの検索バーは開かない

#### Scenario: ヒントモード中に Ctrl+F で終了
- **WHEN** ヒントモードが起動中に `Ctrl+F` を押す
- **THEN** 全バッジが消えてヒントモードが終了する

### Requirement: フォーカス可能要素を検出する
拡張機能は以下のセレクタかつ viewport 内に表示されている要素を対象としなければならない（SHALL）: `a[href]`, `button:not([disabled])`, `input:not([disabled]):not([type="hidden"])`, `select:not([disabled])`, `textarea:not([disabled])`, `[tabindex]:not([tabindex="-1"])`, `[contenteditable="true"]`

#### Scenario: リンクとボタンが検出される
- **WHEN** ヒントモードを起動する
- **THEN** viewport 内の `a[href]` と `button` 要素にバッジが表示される

#### Scenario: 非表示要素は除外される
- **WHEN** ヒントモードを起動する
- **THEN** `display:none` / `visibility:hidden` / `opacity:0` の要素にはバッジが表示されない

#### Scenario: viewport 外の要素は除外される
- **WHEN** ヒントモードを起動する
- **THEN** スクロールで画面外にある要素にはバッジが表示されない

### Requirement: アルファベットラベルを一意に生成する
拡張機能は要素数に応じて一意なラベルを生成しなければならない（SHALL）。要素数 ≤ 26 は 1 文字（a〜z）、≤ 676 は 2 文字（aa〜zz）、それ以上は 3 文字（aaa〜zzz）を使用しなければならない（SHALL）。

#### Scenario: 要素が 26 個以下の場合
- **WHEN** 対象要素が 3 個ある
- **THEN** ラベルは `a`, `b`, `c` となる

#### Scenario: 要素が 26 個を超える場合
- **WHEN** 対象要素が 27 個ある
- **THEN** 全ラベルが 2 文字となり `aa`, `ab`, ..., `ba` の順になる

### Requirement: キー入力でフィルタリングして要素を選択する
ヒントモード中にアルファベットキーを押すと、プレフィックスが一致するバッジのみ表示されなければならない（SHALL）。ラベルと完全一致した時点で対象要素を `focus()` → `click()` し、ヒントモードを終了しなければならない（SHALL）。

#### Scenario: キー入力でフィルタリング
- **WHEN** ヒントモード中に `a` を入力する
- **THEN** ラベルが `a` で始まるバッジのみ表示される

#### Scenario: 完全一致で要素を実行
- **WHEN** ヒントモード中にラベル `ab` の要素に対して `a` → `b` と入力する
- **THEN** 対象要素がクリックされヒントモードが終了する

#### Scenario: 入力が一切マッチしない場合
- **WHEN** ヒントモード中に存在しない文字を入力する
- **THEN** 全バッジが消えてヒントモードが自動終了する

### Requirement: Backspace で直前の入力を取り消す
ヒントモード中に `Backspace` を押すと直前に入力した 1 文字が取り消され、より多くのバッジが再表示されなければならない（SHALL）。

#### Scenario: Backspace で入力取り消し
- **WHEN** ヒントモード中に `a`・`b` と入力した後 `Backspace` を押す
- **THEN** 入力が `a` に戻り、`a` で始まる全バッジが再表示される

### Requirement: Escape またはスクロールでキャンセルする
`Escape` キー押下またはページスクロール時にヒントモードを終了しなければならない（SHALL）。

#### Scenario: Escape でキャンセル
- **WHEN** ヒントモード中に `Escape` を押す
- **THEN** 全バッジが消えてヒントモードが終了する

#### Scenario: スクロールで自動終了
- **WHEN** ヒントモード中にページをスクロールする
- **THEN** ヒントモードが自動的に終了する
