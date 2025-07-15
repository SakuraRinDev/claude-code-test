import { test, expect } from '@playwright/test';

// 基本的なページロードテスト
test.describe('UIデバッグテスト', () => {
  test('ページが正しく読み込まれる', async ({ page }) => {
    await page.goto('/');
    
    // タイトルの確認
    await expect(page).toHaveTitle('Hello World - ハローワールド');
    
    // メインコンテナが表示されている
    const container = page.locator('.container');
    await expect(container).toBeVisible();
  });

  test('テキスト要素が正しく表示される', async ({ page }) => {
    await page.goto('/');
    
    // 見出しの確認
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Hello World!');
    await expect(heading).toBeVisible();
    
    // 段落の確認
    const paragraphs = page.locator('p');
    await expect(paragraphs).toHaveCount(3);
    
    // 各段落のテキスト確認
    await expect(paragraphs.nth(0)).toHaveText('こんにちは、世界！');
    await expect(paragraphs.nth(1)).toHaveText('Welcome to our simple HTML page');
    await expect(paragraphs.nth(2)).toHaveText('シンプルなHTMLページへようこそ');
  });

  test('スタイルが正しく適用される', async ({ page }) => {
    await page.goto('/');
    
    // コンテナのスタイル確認
    const container = page.locator('.container');
    await expect(container).toHaveCSS('text-align', 'center');
    await expect(container).toHaveCSS('border-radius', '20px');
    
    // 見出しのスタイル確認
    const heading = page.locator('h1');
    await expect(heading).toHaveCSS('font-size', '48px'); // 3rem = 48px (デフォルト)
  });

  test('レスポンシブデザインの確認', async ({ page }) => {
    // デスクトップサイズ
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    
    // タブレットサイズ
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(container).toBeVisible();
    
    // モバイルサイズ
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(container).toBeVisible();
  });

  test('背景グラデーションが適用される', async ({ page }) => {
    await page.goto('/');
    
    // body要素の背景を確認
    const body = page.locator('body');
    const backgroundImage = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundImage
    );
    
    expect(backgroundImage).toContain('linear-gradient');
  });
});

// デバッグ用のヘルパーテスト
test.describe('デバッグヘルパー', () => {
  test('スクリーンショットを撮る', async ({ page }) => {
    await page.goto('/');
    await page.screenshot({ path: 'debug-screenshots/full-page.png', fullPage: true });
    console.log('スクリーンショット保存: debug-screenshots/full-page.png');
  });

  test('各要素のスクリーンショットを撮る', async ({ page }) => {
    await page.goto('/');
    
    // コンテナのスクリーンショット
    const container = page.locator('.container');
    await container.screenshot({ path: 'debug-screenshots/container.png' });
    console.log('コンテナのスクリーンショット保存: debug-screenshots/container.png');
    
    // 見出しのスクリーンショット
    const heading = page.locator('h1');
    await heading.screenshot({ path: 'debug-screenshots/heading.png' });
    console.log('見出しのスクリーンショット保存: debug-screenshots/heading.png');
    
    // 各段落のスクリーンショット
    const paragraphs = page.locator('p');
    for (let i = 0; i < await paragraphs.count(); i++) {
      await paragraphs.nth(i).screenshot({ path: `debug-screenshots/paragraph-${i}.png` });
      console.log(`段落${i}のスクリーンショット保存: debug-screenshots/paragraph-${i}.png`);
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
    const container = page.locator('.container');
    await container.hover();
    await page.waitForTimeout(1000);
    
    const heading = page.locator('h1');
    await heading.hover();
    await page.waitForTimeout(1000);
    
    const paragraphs = page.locator('p');
    for (let i = 0; i < await paragraphs.count(); i++) {
      await paragraphs.nth(i).hover();
      await page.waitForTimeout(500);
    }
    
    // 最終的なスクリーンショット
    await page.screenshot({ path: 'debug-screenshots/final-state.png', fullPage: true });
    console.log('最終状態のスクリーンショット保存: debug-screenshots/final-state.png');
  });

  test('要素の詳細情報を出力', async ({ page }) => {
    await page.goto('/');
    
    // コンテナの詳細情報
    const container = page.locator('.container');
    const boundingBox = await container.boundingBox();
    console.log('コンテナのサイズと位置:', boundingBox);
    
    // 全ての要素の階層を出力
    const htmlContent = await page.content();
    console.log('ページのHTML構造:', htmlContent);
  });
}); 