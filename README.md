# Claude Code Test - Playwright UIデバッグ環境

このプロジェクトは、PlaywrightでUIデバッグを行うための環境です。

## セットアップ

依存関係のインストール:
```bash
npm install
```

## 使用可能なコマンド

### 基本的なテスト実行
```bash
npm test
```

### UIモードでデバッグ（推奨）
```bash
npm run test:ui
```
Playwrightの専用UIが開き、テストの実行、ステップごとの確認、タイムトラベルデバッグが可能です。

### デバッグモード
```bash
npm run test:debug
```
テストをステップごとに実行し、ブレークポイントで停止できます。

### ヘッドフルモード（ブラウザを表示）
```bash
npm run test:headed
```
実際のブラウザウィンドウを表示しながらテストを実行します。

### コード生成ツール
```bash
npm run codegen
```
ブラウザ操作を記録して、自動的にテストコードを生成します。

### テストレポート表示
```bash
npm run test:report
```
最後のテスト実行結果のHTMLレポートを表示します。

### トレースビューア
```bash
npm run trace trace.zip
```
テストのトレースファイルを表示します（失敗時に自動生成）。

### ローカルサーバー起動
```bash
npm run serve
```
http://localhost:3000 でindex.htmlを配信します。

## テストファイル

- `tests/ui-debug.spec.ts` - 基本的なUIテストとデバッグヘルパー

## デバッグのヒント

1. **UIモード** (`npm run test:ui`) が最も効率的なデバッグ方法です
2. スクリーンショットは `debug-screenshots/` フォルダに保存されます
3. 失敗時は自動的にスクリーンショット、ビデオ、トレースが記録されます
4. テストレポートで詳細な実行結果を確認できます

## プロジェクト構成

- `index.html` - テスト対象のHTMLファイル
- `playwright.config.ts` - Playwrightの設定ファイル
- `tests/` - テストファイルのディレクトリ
- `debug-screenshots/` - デバッグ用スクリーンショット保存先
