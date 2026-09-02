import { Employee } from '../types/employee.types';

export const credentials = {
  email: 'qaAutomationTechTask@grr.la',
  password: 'A1234567890-',
};

export const employees: Employee[] = [
  createEmployee('Chandler', 'Bing', {
    jobTitle: 'Lead Sarcasm Coordinator',
    startDate: '01/09/2026',
    phoneNumber: '07700900123',
  }),
  createEmployee('Joey', 'Tribbiani', {
    jobTitle: 'Sandwich Sovereign',
    startDate: '01/09/2026',
    phoneNumber: '07700900124',
  })
];

function createEmployee(
  firstName: string,
  lastName: string,
  overrides: Partial<Employee> = {}
): Employee {
  return {
    firstName,
    lastName,
    email: `${firstName}.${lastName}@example.com`.toLowerCase(),
    ...overrides,
  };
}
