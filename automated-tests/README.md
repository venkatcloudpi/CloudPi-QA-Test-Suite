# Automated Test Suite

This directory contains automated end-to-end tests for the CloudPi login and authentication system using Playwright.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Navigate to the automated-tests directory:
```bash
cd automated-tests
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers (first time only):
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests on specific browser
```bash
npm run test:chrome
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run specific test file
```bash
npx playwright test tests/login.spec.js
npx playwright test tests/logout.spec.js
```

### Run tests on mobile devices
```bash
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
npx playwright test --project="iPad"
```

## Test Files

### tests/login.spec.js
Tests login functionality and input validation:
- TC-AUTH-001: Login with empty credentials
- TC-AUTH-002: Login with empty email
- TC-AUTH-003: Login with empty password
- TC-AUTH-004: Login with invalid email format
- TC-AUTH-005: Login with invalid credentials
- TC-AUTH-006: Login with valid credentials
- TC-UI-001: Login page visual validation
- TC-UI-002: Password visibility toggle
- TC-UI-003: Forgot password link
- TC-SESSION-004: Keep me signed in checkbox

### tests/logout.spec.js
Tests logout and session management:
- TC-SESSION-001: Complete logout flow
- TC-SESSION-002: Cancel logout from confirmation dialog
- TC-SESSION-003: Session termination after logout
- TC-SESSION-004: Keep me signed in functionality
- TC-UI-005: Profile menu navigation

## Test Reports

After running tests, Playwright generates reports in the following locations:

- **HTML Report**: `playwright-report/index.html`
- **Test Results**: `test-results/`
- **Screenshots**: Captured on failure in `test-results/`
- **Videos**: Recorded on failure in `test-results/`

To view the HTML report:
```bash
npx playwright show-report
```

## Configuration

The test configuration is in `playwright.config.js`. You can modify:

- **Base URL**: Currently set to `https://vk4aws.cloudpi.ai`
- **Timeout**: Default timeout for operations
- **Screenshots**: Capture behavior (only-on-failure, always, off)
- **Videos**: Recording behavior (retain-on-failure, on, off)
- **Browsers**: Add or remove browser configurations

## Credentials

Tests use the following credentials (configured in test files):

```javascript
const VALID_EMAIL = 'venkat+work@cloudpi.ai';
const VALID_PASSWORD = 'Admin123!';
```

⚠️ **Important**: Update credentials in test files if they change in production.

## Debugging Tests

### View test trace
If a test fails, you can view the trace:
```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

### Run with Playwright Inspector
```bash
npx playwright test --debug
```

### Console logging
Add `console.log()` statements in tests or use:
```javascript
await page.pause(); // Pause test execution
```

## CI/CD Integration

These tests can be integrated into CI/CD pipelines:

### GitHub Actions Example
```yaml
- name: Install dependencies
  run: cd automated-tests && npm ci

- name: Install Playwright browsers
  run: cd automated-tests && npx playwright install --with-deps

- name: Run tests
  run: cd automated-tests && npm test
```

## Troubleshooting

### Tests timing out
- Increase timeout in `playwright.config.js`
- Check if application is accessible
- Verify network connectivity

### Browser installation issues
```bash
npx playwright install --with-deps
```

### Selector not found errors
- Verify application UI hasn't changed
- Update selectors in test files
- Use Playwright Inspector to find correct selectors

## Best Practices

1. **Keep tests independent**: Each test should be able to run independently
2. **Use beforeEach/afterEach**: Set up and tear down test state properly
3. **Add meaningful assertions**: Verify expected behavior explicitly
4. **Handle async properly**: Always await async operations
5. **Use unique selectors**: Prefer data-testid over text content when possible
6. **Keep tests maintainable**: Avoid hardcoding values, use constants

## Contributing

When adding new tests:
1. Follow existing test structure and naming conventions
2. Add test case ID in test description (e.g., TC-AUTH-007)
3. Update this README with new test descriptions
4. Ensure tests pass on all browsers before committing

## Support

For issues with tests, verify:
1. Application is accessible at base URL
2. Credentials are valid
3. All dependencies are installed
4. Playwright browsers are installed

For additional help, contact the QA team.
