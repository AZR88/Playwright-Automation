import { Page, Locator } from '@playwright/test';

export class SignUpPage {
    private readonly page: Page;
    private readonly SignUpNavButton: Locator; 
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.SignUpNavButton = page.getByRole('link', { name: 'Sign up' });
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.submitButton = page.getByRole('button', { name: 'Sign in' });
    }

    async login(email: string, password: string): Promise<void> {
        await this.SignUpNavButton.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    } 
}