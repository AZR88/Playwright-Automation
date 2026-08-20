// 1. IMPORT HARUS DARI FIXTURE, BUKAN DARI @playwright/test
import { test, expect } from '../fixtures/test-base';
import loginData from '../data/users.json'; 

for (const data of loginData) {
    
    // 2. INJEKSI: Minta 'loginPage' langsung di dalam parameter
    test(`Skenario: ${data.scenario}`, async ({ page, loginPage }) => {
        
        await page.goto('/'); 
        
        // 3. EKSEKUSI LANGSUNG. Tidak ada lagi 'const loginPage = new...'
        await loginPage.navigasiKeLogin();
        await loginPage.login(data.email, data.password);

        if (data.isValid) {
            await expect(page.getByText('Your Feed')).toBeVisible();
        } else {
            await expect(page.locator('.error-messages')).toBeVisible();
        }
    });
}