import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email address');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto(path = '/login') {
    await this.page.goto(path);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoggedIn() {
    await expect(this.page).toHaveURL('/dashboard');
    const homeLink = this.page.getByTestId('sideBar').getByRole('link', { name: 'Home' });
    const logoutLink = this.page.getByRole('link', { name: 'Logout' });
    await expect(homeLink).toBeVisible();
    await expect(logoutLink).toBeVisible();
  }
}
