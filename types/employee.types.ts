export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  startDate?: string; // format expected by the app's date picker, e.g. '01/09/2026'
  phoneNumber?: string;
}
