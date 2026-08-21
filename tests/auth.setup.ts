import { test as setup, expect } from '../fixtures/test-base';

setup('Autentikasi dan simpan state per browser', async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.navigasiKeLogin();
    await loginPage.login('Admintest@gmail.com', 'admin1234');
    await loginPage.submitLogin();
    await expect(page.getByText('Your Feed')).toBeVisible();

    
    await page.context().storageState({ path: 'playwright/.auth/chromium.json' });
    await page.context().storageState({ path: 'playwright/.auth/firefox.json' });
    await page.context().storageState({ path: 'playwright/.auth/webkit.json' });
});