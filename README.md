# CloudPi QA Test Suite

**Application:** CloudPi Multi-Cloud Cost Workspace  
**Base URL:** https://vk4aws.cloudpi.ai  
**Last Updated:** 2026-08-29  
**Version:** 1.0

---

## Overview

This test suite provides comprehensive testing documentation for the CloudPi login and authentication system. It includes manual test cases, automated test scripts, and templates for regression testing across releases.

## Contents

1. **TEST_PLAN.md** - Test strategy, scope, and approach
2. **TEST_CASES.md** - Detailed step-by-step test cases
3. **TEST_EXECUTION_REPORT_TEMPLATE.md** - Template for recording test results
4. **automated-tests/** - Automated test scripts (Playwright)
5. **BUG_REPORT_TEMPLATE.md** - Standardized bug reporting template

## Quick Start

### Manual Testing
1. Review `TEST_PLAN.md` for test strategy
2. Execute tests from `TEST_CASES.md`
3. Record results using `TEST_EXECUTION_REPORT_TEMPLATE.md`
4. Report any bugs using `BUG_REPORT_TEMPLATE.md`

### Automated Testing
```bash
cd automated-tests
npm install
npx playwright test
```

## Test Credentials

**Full Admin User:**
- Email: `venkat+work@cloudpi.ai`
- Password: `Admin123!`

**Limited Admin User (Initial Setup):**
- Email: `admin@cloudpi.ai`
- Password: `admin123`

⚠️ **Note:** Update credentials if changed in production

## Test Categories

- **Authentication Tests** - Login, logout, validation
- **Session Management Tests** - Session persistence, timeout
- **Security Tests** - Input validation, error handling
- **UI/UX Tests** - Visual validation, accessibility
- **Integration Tests** - SSO providers (Azure, Auth0)

## Regression Testing Checklist

Before each release, execute:
- [ ] All authentication test cases
- [ ] Automated test suite
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit

## Reporting Issues

1. Verify the issue is reproducible
2. Check if it's a known issue
3. Create bug report using `BUG_REPORT_TEMPLATE.md`
4. Include screenshots/videos
5. Specify environment details

## Repository Structure

```
CloudPi-QA-Test-Suite/
├── README.md
├── TEST_PLAN.md
├── TEST_CASES.md
├── TEST_EXECUTION_REPORT_TEMPLATE.md
├── BUG_REPORT_TEMPLATE.md
├── automated-tests/
│   ├── package.json
│   ├── playwright.config.js
│   └── tests/
│       ├── login.spec.js
│       └── logout.spec.js
└── test-results/
    └── (execution reports go here)
```

## Support

For questions about this test suite, contact the QA team.

## License

This test suite is proprietary to CloudPi/PurpleData Inc.
