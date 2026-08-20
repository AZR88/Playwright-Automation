import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type EnterpriseFixtures = {
    loginPage: LoginPage;
};

export const test = baseTest.extend<EnterpriseFixtures>({
    
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});

export { expect };