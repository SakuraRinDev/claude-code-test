import { test, expect } from '@playwright/test';

// AIコミュニティページのテスト
test.describe('AIコミュニティページテスト', () => {
  test('メインページが正しく読み込まれる', async ({ page }) => {
    await page.goto('/');
    
    // タイトルの確認
    await expect(page).toHaveTitle('AI Community - 未来を創るコミュニティ');
    
    // メインセクションが表示されている
    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();
  });

  test('AIコミュニティのテキスト要素が正しく表示される', async ({ page }) => {
    await page.goto('/');
    
    // 見出しの確認
    const heading = page.locator('h1.hero-title');
    await expect(heading).toHaveText('AI Community');
    await expect(heading).toBeVisible();
    
    // サブタイトルの確認
    const subtitle = page.locator('.hero-subtitle');
    await expect(subtitle).toHaveText('未来を創る革新的なコミュニティ');
    
    // 説明文の確認
    const description = page.locator('.hero-description');
    await expect(description).toContainText('人工知能の力で世界を変える');
  });

  test('機能カードが正しく表示される', async ({ page }) => {
    await page.goto('/');
    
    // 機能カードの確認
    const featureCards = page.locator('.feature-card');
    await expect(featureCards).toHaveCount(3);
    
    // 各カードのタイトル確認
    await expect(featureCards.nth(0).locator('.feature-title')).toHaveText('AI開発');
    await expect(featureCards.nth(1).locator('.feature-title')).toHaveText('イノベーション');
    await expect(featureCards.nth(2).locator('.feature-title')).toHaveText('グローバル');
  });

  test('レスポンシブデザインの確認', async ({ page }) => {
    // デスクトップサイズ
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();
    
    // タブレットサイズ
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(heroSection).toBeVisible();
    
    // モバイルサイズ
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(heroSection).toBeVisible();
  });

  test('背景グラデーションが適用される', async ({ page }) => {
    await page.goto('/');
    
    // hero-section要素の背景を確認
    const heroSection = page.locator('.hero-section');
    const backgroundImage = await heroSection.evaluate(el => 
      window.getComputedStyle(el).backgroundImage
    );
    
    expect(backgroundImage).toContain('linear-gradient');
  });
});

// 犬のページのテスト
test.describe('犬のページテスト', () => {
  test('犬のページが正しく読み込まれる', async ({ page }) => {
    await page.goto('/dogs.html');
    
    // タイトルの確認
    await expect(page).toHaveTitle('Dogs - 犬の素晴らしい世界');
    
    // メインセクションが表示されている
    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();
  });

  test('犬ページのテキスト要素が正しく表示される', async ({ page }) => {
    await page.goto('/dogs.html');
    
    // 見出しの確認
    const heading = page.locator('h1.hero-title');
    await expect(heading).toHaveText('Dogs');
    await expect(heading).toBeVisible();
    
    // サブタイトルの確認
    const subtitle = page.locator('.hero-subtitle');
    await expect(subtitle).toHaveText('人類の最高のパートナー');
    
    // 説明文の確認
    const description = page.locator('.hero-description');
    await expect(description).toContainText('何千年もの間、犬は人間と共に歩んできました');
  });

  test('犬の特徴カードが正しく表示される', async ({ page }) => {
    await page.goto('/dogs.html');
    
    // 機能カードの確認
    const featureCards = page.locator('.feature-card');
    await expect(featureCards).toHaveCount(6);
    
    // 各カードのタイトル確認
    await expect(featureCards.nth(0).locator('.feature-title')).toHaveText('忠誠心');
    await expect(featureCards.nth(1).locator('.feature-title')).toHaveText('癒し効果');
    await expect(featureCards.nth(2).locator('.feature-title')).toHaveText('活動的');
    await expect(featureCards.nth(3).locator('.feature-title')).toHaveText('家族の一員');
    await expect(featureCards.nth(4).locator('.feature-title')).toHaveText('守護者');
    await expect(featureCards.nth(5).locator('.feature-title')).toHaveText('賢さ');
  });

  test('ホームページへのリンクが動作する', async ({ page }) => {
    await page.goto('/dogs.html');
    
    // ホームに戻るボタンの確認
    const homeButton = page.locator('a.cta-secondary');
    await expect(homeButton).toHaveText('ホームに戻る');
    await expect(homeButton).toHaveAttribute('href', 'index.html');
  });

  test('犬ページのレスポンシブデザインの確認', async ({ page }) => {
    // デスクトップサイズ
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/dogs.html');
    
    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();
    
    // タブレットサイズ
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(heroSection).toBeVisible();
    
    // モバイルサイズ
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(heroSection).toBeVisible();
  });

  test('犬ページの背景グラデーションが適用される', async ({ page }) => {
    await page.goto('/dogs.html');
    
    // hero-section要素の背景を確認
    const heroSection = page.locator('.hero-section');
    const backgroundImage = await heroSection.evaluate(el => 
      window.getComputedStyle(el).backgroundImage
    );
    
    expect(backgroundImage).toContain('linear-gradient');
  });
});

// デバッグ用のヘルパーテスト
test.describe('デバッグヘルパー', () => {
  test('メインページのスクリーンショットを撮る', async ({ page }) => {
    await page.goto('/');
    await page.screenshot({ path: 'debug-screenshots/main-page.png', fullPage: true });
    console.log('メインページのスクリーンショット保存: debug-screenshots/main-page.png');
  });

  test('犬ページのスクリーンショットを撮る', async ({ page }) => {
    await page.goto('/dogs.html');
    await page.screenshot({ path: 'debug-screenshots/dogs-page.png', fullPage: true });
    console.log('犬ページのスクリーンショット保存: debug-screenshots/dogs-page.png');
  });

  test('各要素のスクリーンショットを撮る', async ({ page }) => {
    await page.goto('/');
    
    // ヒーローセクションのスクリーンショット
    const heroSection = page.locator('.hero-section');
    await heroSection.screenshot({ path: 'debug-screenshots/hero-section.png' });
    console.log('ヒーローセクションのスクリーンショット保存: debug-screenshots/hero-section.png');
    
    // 見出しのスクリーンショット
    const heading = page.locator('h1.hero-title');
    await heading.screenshot({ path: 'debug-screenshots/heading.png' });
    console.log('見出しのスクリーンショット保存: debug-screenshots/heading.png');
    
    // 機能カードのスクリーンショット
    const featureCards = page.locator('.feature-card');
    for (let i = 0; i < await featureCards.count(); i++) {
      await featureCards.nth(i).screenshot({ path: `debug-screenshots/feature-card-${i}.png` });
      console.log(`機能カード${i}のスクリーンショット保存: debug-screenshots/feature-card-${i}.png`);
    }
  });

  test('インタラクションの録画', async ({ page }) => {
    await page.goto('/');
    
    // ページ全体をゆっくりスクロール
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          
          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve(null);
          }
        }, 100);
      });
    });
    
    // 各要素にホバー
    const heroSection = page.locator('.hero-section');
    await heroSection.hover();
    await page.waitForTimeout(1000);
    
    const heading = page.locator('h1.hero-title');
    await heading.hover();
    await page.waitForTimeout(1000);
    
    const featureCards = page.locator('.feature-card');
    for (let i = 0; i < await featureCards.count(); i++) {
      await featureCards.nth(i).hover();
      await page.waitForTimeout(500);
    }
    
    // 最終的なスクリーンショット
    await page.screenshot({ path: 'debug-screenshots/final-state.png', fullPage: true });
    console.log('最終状態のスクリーンショット保存: debug-screenshots/final-state.png');
  });

  test('要素の詳細情報を出力', async ({ page }) => {
    await page.goto('/');
    
    // ヒーローセクションの詳細情報
    const heroSection = page.locator('.hero-section');
    const boundingBox = await heroSection.boundingBox();
    console.log('ヒーローセクションのサイズと位置:', boundingBox);
    
    // 全ての要素の階層を出力
    const htmlContent = await page.content();
    console.log('ページのHTML構造:', htmlContent);
  });
}); 