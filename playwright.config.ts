import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // テストディレクトリ
  testDir: './tests',
  
  // タイムアウト設定
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  
  // 失敗時の設定
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // レポーター設定
  reporter: 'html',
  
  // 共通設定
  use: {
    // アクションのタイムアウト
    actionTimeout: 0,
    
    // スクリーンショットとビデオ設定（デバッグ用）
    screenshot: 'on',  // 常にスクリーンショットを保存
    video: 'on',       // 常にビデオを保存
    
    // トレース設定（デバッグ用）
    trace: 'on',       // 常にトレースを保存
    
    // ベースURL
    baseURL: 'http://localhost:3000',
  },

  // プロジェクト設定（各ブラウザでのテスト）
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // 開発サーバー設定
  webServer: {
    command: 'npx http-server . -p 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
}); 