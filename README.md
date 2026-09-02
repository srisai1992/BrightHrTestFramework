# Playwright Framework - BrightHR Tech Tests

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Run tests

```bash
npm test              # headless
npm run test:headed   # see the browser
npm run report        # open the last HTML report
npm run codegen       # Recod and playback session
```


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

