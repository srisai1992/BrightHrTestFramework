// SidebarComponent.ts
import { Page, Locator } from '@playwright/test';

export class SidebarComponent {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly employeesLink: Locator;
  

  constructor(page: Page) {
    this.page = page;
    const sidebar = page.getByTestId('sideBar');

    this.homeLink = sidebar.getByRole('link', { name: 'Home' });
    this.employeesLink = sidebar.locator('[data-e2e="employees"]');
    
  }

  async goToEmployees() {
    await this.employeesLink.click();
  }

  async goToHome() {
    await this.homeLink.click();
  }
}