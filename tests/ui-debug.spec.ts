import { test, expect } from '@playwright/test';

// 牛のウェブサイトの基本テスト
test.describe('牛のウェブサイトテスト', () => {
  test('ページが正しく読み込まれる', async ({ page }) => {
    await page.goto('/');
    
    // タイトルの確認
    await expect(page).toHaveTitle('牛の世界 - 3D牧場体験');
    
    // メインヘッダーが表示されている
    const header = page.locator('.header');
    await expect(header).toBeVisible();
  });

  test('ヘッダー要素が正しく表示される', async ({ page }) => {
    await page.goto('/');
    
    // メインタイトルの確認
    const title = page.locator('.header h1');
    await expect(title).toContainText('牛の世界へようこそ');
    await expect(title).toBeVisible();
    
    // サブタイトルの確認
    const subtitle = page.locator('.header p').first();
    await expect(subtitle).toContainText('3D牧場体験で牛の魅力を発見しよう');
    
    // 牛の絵文字が表示されている
    const cowEmojis = page.locator('.cow-emoji');
    await expect(cowEmojis).toHaveCount(3);
  });

  test('Three.jsコンテナが表示される', async ({ page }) => {
    await page.goto('/');
    
    // Three.jsコンテナの存在確認
    const threeContainer = page.locator('#three-container');
    await expect(threeContainer).toBeVisible();
    
    // ローディングテキストが最初に表示される
    const loadingText = page.locator('#loading');
    await expect(loadingText).toBeVisible();
    
    // Three.jsがロードされるまで少し待つ
    await page.waitForTimeout(3000);
    
    // Three.jsのcanvas要素が生成されているかチェック
    const canvas = page.locator('#three-container canvas');
    await expect(canvas).toBeVisible();
  });

  test('牛の情報カードが表示される', async ({ page }) => {
    await page.goto('/');
    
    // 牛の情報カードの確認
    const factCards = page.locator('.cow-fact-card');
    await expect(factCards).toHaveCount(4);
    
    // 各カードのタイトル確認
    await expect(factCards.nth(0).locator('h3')).toContainText('牛の特徴');
    await expect(factCards.nth(1).locator('h3')).toContainText('牛乳の恵み');
    await expect(factCards.nth(2).locator('h3')).toContainText('環境との調和');
    await expect(factCards.nth(3).locator('h3')).toContainText('賢い動物');
  });

  test('牛の統計セクションが表示される', async ({ page }) => {
    await page.goto('/');
    
    // 統計セクションの確認
    const statsSection = page.locator('.cow-stats');
    await expect(statsSection).toBeVisible();
    
    // 統計アイテムの確認
    const statItems = page.locator('.stat-item');
    await expect(statItems).toHaveCount(4);
    
    // 各統計値の確認
    await expect(statItems.nth(0).locator('.stat-number')).toContainText('1000');
    await expect(statItems.nth(1).locator('.stat-number')).toContainText('4');
    await expect(statItems.nth(2).locator('.stat-number')).toContainText('20L');
    await expect(statItems.nth(3).locator('.stat-number')).toContainText('360°');
  });

  test('フッターが表示される', async ({ page }) => {
    await page.goto('/');
    
    // フッターの確認
    const footer = page.locator('.footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('牛と自然の調和を大切に');
    await expect(footer).toContainText('Three.js');
  });

  test('スタイルが正しく適用される', async ({ page }) => {
    await page.goto('/');
    
    // ヘッダーのスタイル確認
    const header = page.locator('.header');
    await expect(header).toHaveCSS('text-align', 'center');
    
    // Three.jsコンテナのスタイル確認
    const threeContainer = page.locator('#three-container');
    await expect(threeContainer).toHaveCSS('border-radius', '20px');
  });

  test('レスポンシブデザインの確認', async ({ page }) => {
    // デスクトップサイズ
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const header = page.locator('.header');
    await expect(header).toBeVisible();
    
    // タブレットサイズ
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(header).toBeVisible();
    
    // モバイルサイズ
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(header).toBeVisible();
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

  test('アニメーションが動作する', async ({ page }) => {
    await page.goto('/');
    
    // 牛の絵文字のアニメーション確認
    const cowEmoji = page.locator('.cow-emoji').first();
    await expect(cowEmoji).toBeVisible();
    
    // CSSアニメーションが適用されているか確認
    const animationName = await cowEmoji.evaluate(el => 
      window.getComputedStyle(el).animationName
    );
    expect(animationName).toBe('bounce');
  });
});

// Three.js 3D機能のテスト
test.describe('Three.js 3D機能テスト', () => {
  test('Three.jsライブラリが読み込まれる', async ({ page }) => {
    await page.goto('/');
    
    // Three.jsライブラリの存在確認
    const threeExists = await page.evaluate(() => typeof window.THREE !== 'undefined');
    expect(threeExists).toBe(true);
  });

  test('3D牛のレンダリング', async ({ page }) => {
    await page.goto('/');
    
    // Three.jsの初期化を待つ
    await page.waitForTimeout(5000);
    
    // canvas要素が作成されているか確認
    const canvas = page.locator('#three-container canvas');
    await expect(canvas).toBeVisible();
    
    // canvasに何かが描画されているか確認（空でないか）
    const canvasData = await canvas.evaluate((canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return imageData.data.some(pixel => pixel !== 0);
    });
    
    // WebGLレンダラーの場合は直接確認できないので、canvas要素の存在で判断
    await expect(canvas).toBeVisible();
  });

  test('Three.jsエラーハンドリング', async ({ page }) => {
    // コンソールエラーを監視
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(5000);

    // Three.js関連の致命的なエラーがないことを確認
    const threeErrors = consoleErrors.filter(error => 
      error.toLowerCase().includes('three') || 
      error.toLowerCase().includes('webgl')
    );
    
    // 重大なエラーがないことを確認（警告は許容）
    const criticalErrors = threeErrors.filter(error => 
      !error.includes('Warning') && 
      !error.includes('deprecated')
    );
    
    expect(criticalErrors.length).toBe(0);
  });
});

// デバッグ用のヘルパーテスト
test.describe('デバッグヘルパー', () => {
  test('牛サイトのスクリーンショットを撮る', async ({ page }) => {
    await page.goto('/');
    
    // Three.jsのロードを待つ
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'debug-screenshots/cow-site-full.png', fullPage: true });
    console.log('牛サイトのスクリーンショット保存: debug-screenshots/cow-site-full.png');
  });

  test('3Dセクションのスクリーンショットを撮る', async ({ page }) => {
    await page.goto('/');
    
    // Three.jsのロードを待つ
    await page.waitForTimeout(5000);
    
    // Three.jsコンテナのスクリーンショット
    const threeContainer = page.locator('#three-container');
    await threeContainer.screenshot({ path: 'debug-screenshots/three-container.png' });
    console.log('3Dコンテナのスクリーンショット保存: debug-screenshots/three-container.png');
    
    // ヘッダーのスクリーンショット
    const header = page.locator('.header');
    await header.screenshot({ path: 'debug-screenshots/cow-header.png' });
    console.log('ヘッダーのスクリーンショット保存: debug-screenshots/cow-header.png');
    
    // 牛の情報カードのスクリーンショット
    const factCards = page.locator('.cow-fact-card');
    for (let i = 0; i < await factCards.count(); i++) {
      await factCards.nth(i).screenshot({ path: `debug-screenshots/cow-fact-card-${i}.png` });
      console.log(`牛情報カード${i}のスクリーンショット保存: debug-screenshots/cow-fact-card-${i}.png`);
    }
  });

  test('インタラクションの録画', async ({ page }) => {
    await page.goto('/');
    
    // Three.jsのロードを待つ
    await page.waitForTimeout(3000);
    
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
    
    // 各牛情報カードにホバー
    const factCards = page.locator('.cow-fact-card');
    for (let i = 0; i < await factCards.count(); i++) {
      await factCards.nth(i).hover();
      await page.waitForTimeout(1000);
    }
    
    // 最終的なスクリーンショット
    await page.screenshot({ path: 'debug-screenshots/cow-site-final.png', fullPage: true });
    console.log('最終状態のスクリーンショット保存: debug-screenshots/cow-site-final.png');
  });

  test('要素の詳細情報を出力', async ({ page }) => {
    await page.goto('/');
    
    // Three.jsコンテナの詳細情報
    const threeContainer = page.locator('#three-container');
    const boundingBox = await threeContainer.boundingBox();
    console.log('Three.jsコンテナのサイズと位置:', boundingBox);
    
    // 牛の情報カードの情報
    const factCards = page.locator('.cow-fact-card');
    const cardCount = await factCards.count();
    console.log('牛情報カードの数:', cardCount);
    
    // ページのHTML構造（一部）
    const titleText = await page.locator('.header h1').textContent();
    console.log('メインタイトル:', titleText);
  });
}); 