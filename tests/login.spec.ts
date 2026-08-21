// 1. IMPORT HARUS DARI FIXTURE, BUKAN DARI @playwright/test
import { test, expect } from '../fixtures/test-base';
import loginData from '../data/users.json'; 

//clear cache
test.use({ storageState: { cookies: [], origins: [] } });

for (const data of loginData) {
    test(`Scenario: ${data.scenario}`, async ({ page, loginPage }) => {
        await page.goto('/'); 
        await loginPage.navigasiKeLogin();
        
        //sendkeys
        await loginPage.login(data.email, data.password);

        //validation 
        if (data.validationType === 'button_disabled') {
            await expect(page.getByRole('button', { name: 'Sign in' })).toBeDisabled();
        
        } else if (data.validationType === 'success') {
            await loginPage.submitLogin();
            await expect(page.getByText('Your Feed')).toBeVisible({timeout: 20000});
            
        } else {
            await loginPage.submitLogin();
            await expect(page.locator('.error-messages')).toBeVisible();
        }
    });
}