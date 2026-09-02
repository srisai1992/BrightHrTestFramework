# Playwright Framework - BrightHR Employee Tests

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Run tests

```bash
npm test              # headless
npm run test:headed   # see the browser
npm run test:ui       # Playwright's interactive UI mode (great for debugging live)
npm run report        # open the last HTML report
```

```bash
npm run codegen
```

This opens a real browser against the sandbox app. Log in manually, click
through "Add employee," fill every field (including optional ones), and
Playwright will print out the exact working locator for each element as you
interact with it. Swap those into the page objects.

Things to double check once you're in the real app:
- Exact labels/placeholders on the Add Employee form (job title, start date
  format, department dropdown vs. searchable combo, phone number field name)
- What confirms a successful login (dashboard heading? URL change? nav item?)
  — update `LoginPage.assertLoggedIn()`
- What confirms a successful "Save" on the employee form (toast message?
  redirect to employee list? modal closing?)
- Whether "Employees" is a direct link/tab or nested under a menu

## Structure

```
playwright-framework/
├── config/
│   └── environments.ts      # baseURL per environment
├── data/
│   └── testData.ts          # credentials + employee test data
├── fixtures/
│   └── test.ts              # custom fixtures (page objects, auto-login)
├── github/workflows
│   └── playwright.yml       # pipeline configuration
├── pages/
│   ├── LoginPage.ts
│   └── EmployeePage.ts
│   └── SidebarComponent.ts   #For sidebar navigation those can accessed from any page
├── types/
│   └── employee.types.ts
├── tests/
│   └── employee.spec.ts     # the 3 required scenarios
├── playwright.config.ts
└── tsconfig.json
```

## Design notes (useful talking points in the interview)

- **Fixtures over manual instantiation**: `loggedInPage` fixture handles
  login once, so each test starts already authenticated and stays focused
  on employee behaviour rather than repeating login steps.
- **Test data separated from test logic**: `data/testData.ts` +
  `types/employee.types.ts` give type safety and a single place to adjust
  data, rather than hardcoding values inside tests.
- **Conditional field filling**: `fillEmployeeForm()` fills optional fields
  only when present in the data object, so the same method serves both
  "mandatory only" and "mandatory + optional" scenarios without duplication.
- **Unique emails per run**: employee emails are suffixed with `Date.now()`
  to avoid duplicate-record conflicts on repeated test runs against the
  same sandbox environment.
