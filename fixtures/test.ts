import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeePage } from '../pages/EmployeePage';
import { credentials } from '../data/testData';
import { DashboardPage } from '../pages/DashboardPage';

type Fixtures = {
  loginPage: LoginPage;
  employeePage: EmployeePage;
  dashboardPage: DashboardPage;
  loggedInPage: DashboardPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  employeePage: async ({ page }, use) => {
    await use(new EmployeePage(page));
  },

  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(credentials.email, credentials.password);
    await login.assertLoggedIn();

    await use(new DashboardPage(page));
  }



});

export { expect } from '@playwright/test';
