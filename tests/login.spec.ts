import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../data/users.json'; 


for (const data of loginData) {
    
    test(`Skenario: ${data.scenario}`, async ({ page }) => {
        
        const loginPage = new LoginPage(page);
        await page.goto('/');
        await loginPage.navigasiKeLogin();
        await loginPage.login(data.email, data.password);
       
        if (data.isValid) {
            await expect(page.getByText('Your Feed')).toBeVisible();
        } else {
            await expect(page.getByText('credentials invalid')).toBeVisible();
        }
    });
}