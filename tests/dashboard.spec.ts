import { test, expect } from '../fixtures/test-base';

test('Tes langsung memuat halaman rahasia tanpa login', async ({ page }) => {
    
    // 1. NETWORK INTERCEPTION (MOCKING)
    await page.route('**/api/user', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                user: {
                    email: "admin@test.com",
                    username: "admin",
                    bio: "QA Engineer",
                    image: "",
                    token: "fake-token-bypass"
                }
            })
        });
    });

    //Navigaion
    await page.goto('/');

    //Validation
    await expect(page.getByText('Your Feed')).toBeVisible({ timeout: 10000 });
});