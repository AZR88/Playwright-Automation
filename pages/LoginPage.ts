import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly loginButton: Locator;
    private readonly emailInput: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByText("Sign in")
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.submitButton = page.getByRole('button', { name: 'Sign in' });
    }


    async login(email: string, password: string): Promise<void> {
        await this.loginButton.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    } 
}


