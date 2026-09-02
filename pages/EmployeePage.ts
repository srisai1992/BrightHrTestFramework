import { Page, Locator, expect } from '@playwright/test';
import { Employee } from '../types/employee.types';

export class EmployeePage {
  readonly page: Page;
  readonly addEmployeeButton: Locator;
  readonly searchEmployeeInput: Locator;


  //Employee hub tabs
  readonly employeesTab: Locator;
  readonly permissionsTab: Locator;

  //Add Employee modal elements
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly sendRegistrationEmailCheckBox: Locator;
  readonly phoneNumberInput: Locator;
  readonly startDateInput: Locator;
  readonly jobTitleInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly successHeading:Locator;

  constructor(page: Page) {
    this.page = page;

    this.addEmployeeButton = page.getByRole('button', { name: 'Add employee' });
    this.searchEmployeeInput = page.getByPlaceholder('Name or job title...');
    
    //Employee hub tabs
    this.employeesTab = page.locator('a[href="/employee-hub/manage-employees"]');
    this.permissionsTab = page.getByRole('link', { name: 'Permissions' });
    
    //Add Employee modal locators
    this.firstNameInput = page.getByLabel('First name');
    this.lastNameInput = page.getByLabel('Last name');
    this.emailInput = page.getByLabel('Email address');
    this.sendRegistrationEmailCheckBox = page.getByRole('checkbox', { name: 'Send registration email' });
    this.jobTitleInput = page.getByLabel('Job title');
    this.startDateInput = page.getByLabel('Start date');
    this.phoneNumberInput = page.getByLabel('phone number');
    this.saveButton = page.getByRole('button', { name: 'Save new employee' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.successHeading = page.getByRole('heading', { name: 'Success! New employee added' });
  }

  /*async goToEmployeesTab() {
    await this.employeesNavLink.click();
  }*/

  async goToEmployeesTab(path = '/employee-hub') {
    await this.page.goto(path);
  }

  async openAddEmployeeForm() {
    await this.addEmployeeButton.click();
  }

  /*
   *Fills add employee form including optional fields if they are provided 
   *
  */
  async fillAddEmployeeForm(employee: Employee) {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.emailInput.fill(employee.email);

    if (employee.jobTitle) {
      await this.jobTitleInput.fill(employee.jobTitle);
    }
    if (employee.startDate) {
       if (!/^\d{2}\/\d{2}\/\d{4}$/.test(employee.startDate)) {
        throw new Error(
          `Invalid startDate format: "${employee.startDate}". Expected dd/mm/yyyy`
        );
      }
      await this.startDateInput.fill(employee.startDate);
    }
    if (employee.phoneNumber) {
      await this.phoneNumberInput.fill(employee.phoneNumber);
    }
  }

  async submitForm() {
    await this.saveButton.click();
  }

  async addEmployee(employee: Employee) {
    await this.openAddEmployeeForm();
    await this.fillAddEmployeeForm(employee);
    await this.submitForm();
    await expect(this.successHeading).toBeVisible();
    await expect(this.page.getByText(`${employee.firstName} added to BrightHR Lite`)).toBeVisible();
    /*
    await this.page.getByRole('button', { name: 'Go to profile' }).click();
    await this.page.waitForURL(/\/employee-profile\/.+/);

    const currentUrl = this.page.url();
    const uid = currentUrl.split('/employee-profile/')[1];

    return uid;*/
    this.page.locator('button[aria-label="Close modal"]').click();
  }

  async searchEmployee(fullName: string): Promise<void> {
    await this.searchEmployeeInput.fill(fullName);
    await this.page.waitForLoadState('networkidle'); 
  }

  async searchAndVerifyEmployeeExists(fullName: string): Promise<Locator> {
    await this.searchEmployee(fullName);
    const employeeCard = this.page.getByText(fullName, { exact: false }).first(); //getting first element as it returns multiple elements
    await expect(employeeCard).toBeVisible();
    return employeeCard;
  }

  async VerifyEmployeeExists(employee: Employee): Promise<void> {
    await this.searchEmployee(employee.firstName);

    const employeeCard = this.page
      .locator('div.flex.items-center.justify-between.rounded-lg.shadow-md')
      .filter({ hasText: employee.firstName })
      .filter({ hasText: employee.lastName });

    
    const scopedCard = employee.jobTitle
      ? employeeCard.filter({ hasText: employee.jobTitle })
      : employeeCard;

    await expect(employeeCard).toBeVisible();
    await expect(scopedCard).toBeVisible();
  }

  async searchAndGoToEmployee(fullName: string): Promise<void> {
    const employeeCard = await this.searchAndVerifyEmployeeExists(fullName);
    await expect(employeeCard).toBeVisible();
  }

  async getCountOfEmployees(fullName: string): Promise<Number> {
    await this.searchEmployee(fullName);
    const employeeCard = this.page.getByText(fullName, { exact: false });
    return await employeeCard.count();;
  }

}
