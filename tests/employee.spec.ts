import { test, expect } from '../fixtures/test';
import { employees } from '../data/testData';

test.describe('BrightHR - Employee Management', () => {

  test('add first employee with all fields including optional', async ({ loggedInPage, employeePage }) => {
    await loggedInPage.goToEmployeesTab();
    await employeePage.addEmployee(employees[0]);
    await employeePage.searchAndVerifyEmployeeExists(employees[0].lastName);
  });

  test('add second employee', async ({ loggedInPage, employeePage }) => {
    await loggedInPage.goToEmployeesTab();
    await employeePage.addEmployee(employees[1]);
    await employeePage.searchAndVerifyEmployeeExists(employees[1].lastName);
  });

  test('verify both employees are displayed in the employee list', async ({ loggedInPage, employeePage }) => {
    await loggedInPage.goToEmployeesTab();
    await employeePage.searchAndVerifyEmployeeExists(`${employees[0].lastName}`);
    await employeePage.searchAndVerifyEmployeeExists(`${employees[1].jobTitle}`);
  });

/**Filtering and verifying employees
 * 
 * VerifyEmployeeExists(): for better verification for filtered employees, if there are no duplicate
 * 
 * Check the count of employee before and after new employee adding
 * 
 * more robust e2e process can be capture uid of employee using 
 *  >'Go To Profile' from add employee>success message modal
 *  > capture employee uid for future reference
 * 
 * /
 

/* Observations:
 *  Employee filter doesnt work full name: 'firstName lastName'
 *  Duplicate employees
 *  StartDate validation when creating employee
 *  
 */

});
