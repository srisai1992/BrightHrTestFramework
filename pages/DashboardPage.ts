import { Page, Locator, expect } from '@playwright/test';
import { Employee } from '../types/employee.types';
import { SidebarComponent } from './SidebarComponent';

export class DashboardPage {
  readonly page: Page;
   readonly sidebar: SidebarComponent;
  readonly logoutButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarComponent(page);
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
  }

  async goToEmployeesTab(path = '/employee-hub') {
    await this.page.goto(path);
  }

}
