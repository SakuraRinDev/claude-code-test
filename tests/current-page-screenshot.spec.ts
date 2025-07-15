import { test, expect } from '@playwright/test';

// 現在のAI Communityページ用のスクリーンショットテスト
test.describe('現在のページ スクリーンショット', () => {
  test('フルページスクリーンショット', async ({ page }) => {
    await page.goto('/');
    
    // ページの読み込み完了を待つ
    await page.waitForLoadState('networkidle');
    
    // フルページスクリーンショット
    await page.screenshot({ 
      path: 'debug-screenshots/current-full-page.png', 
      fullPage: true 
    });
    
    console.log('フルページスクリーンショット保存: debug-screenshots/current-full-page.png');
  });

  test('主要要素のスクリーンショット', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // ヒーローセクション
    const heroSection = page.locator('.hero-section');
    await heroSection.screenshot({ path: 'debug-screenshots/hero-section.png' });
    console.log('ヒーローセクション保存: debug-screenshots/hero-section.png');
    
    // メインタイトル
    const title = page.locator('.hero-title');
    await title.screenshot({ path: 'debug-screenshots/main-title.png' });
    console.log('メインタイトル保存: debug-screenshots/main-title.png');
    
    // サブタイトル
    const subtitle = page.locator('.hero-subtitle');
    await subtitle.screenshot({ path: 'debug-screenshots/subtitle.png' });
    console.log('サブタイトル保存: debug-screenshots/subtitle.png');
    
    // 説明文
    const description = page.locator('.hero-description');
    await description.screenshot({ path: 'debug-screenshots/description.png' });
    console.log('説明文保存: debug-screenshots/description.png');
    
    // CTAボタン
    const ctaButtons = page.locator('.cta-buttons');
    await ctaButtons.screenshot({ path: 'debug-screenshots/cta-buttons.png' });
    console.log('CTAボタン保存: debug-screenshots/cta-buttons.png');
    
    // 機能カード
    const features = page.locator('.ai-features');
    await features.screenshot({ path: 'debug-screenshots/features.png' });
    console.log('機能カード保存: debug-screenshots/features.png');
    
    // 個別機能カード
    const featureCards = page.locator('.feature-card');
    const count = await featureCards.count();
    for (let i = 0; i < count; i++) {
      await featureCards.nth(i).screenshot({ path: `debug-screenshots/feature-card-${i}.png` });
      console.log(`機能カード${i}保存: debug-screenshots/feature-card-${i}.png`);
    }
  });

  test('レスポンシブデザインのスクリーンショット', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // デスクトップ
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.screenshot({ 
      path: 'debug-screenshots/desktop-1920x1080.png', 
      fullPage: true 
    });
    console.log('デスクトップ表示保存: debug-screenshots/desktop-1920x1080.png');
    
    // タブレット
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ 
      path: 'debug-screenshots/tablet-768x1024.png', 
      fullPage: true 
    });
    console.log('タブレット表示保存: debug-screenshots/tablet-768x1024.png');
    
    // モバイル
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ 
      path: 'debug-screenshots/mobile-375x667.png', 
      fullPage: true 
    });
    console.log('モバイル表示保存: debug-screenshots/mobile-375x667.png');
  });

  test('インタラクションのスクリーンショット', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 初期状態
    await page.screenshot({ 
      path: 'debug-screenshots/initial-state.png', 
      fullPage: true 
    });
    console.log('初期状態保存: debug-screenshots/initial-state.png');
    
    // CTAボタンにホバー
    const primaryButton = page.locator('.cta-primary');
    await primaryButton.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'debug-screenshots/button-hover.png', 
      fullPage: true 
    });
    console.log('ボタンホバー状態保存: debug-screenshots/button-hover.png');
    
    // 機能カードにホバー
    const featureCards = page.locator('.feature-card');
    const count = await featureCards.count();
    for (let i = 0; i < count; i++) {
      await featureCards.nth(i).hover();
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: `debug-screenshots/feature-card-${i}-hover.png`, 
        fullPage: true 
      });
      console.log(`機能カード${i}ホバー状態保存: debug-screenshots/feature-card-${i}-hover.png`);
    }
    
    // 最終状態
    await page.screenshot({ 
      path: 'debug-screenshots/final-interaction-state.png', 
      fullPage: true 
    });
    console.log('最終インタラクション状態保存: debug-screenshots/final-interaction-state.png');
  });
});