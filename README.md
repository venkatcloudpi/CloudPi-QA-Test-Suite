# CloudPi QA Test Suite

**Application:** CloudPi Multi-Cloud Cost Workspace  
**Base URL:** https://vk4aws.cloudpi.ai  
**Last Updated:** 2026-08-29  
**Version:** 1.1

---

## Overview

This test suite provides comprehensive testing documentation for the CloudPi application, covering authentication, session management, and admin settings (user management and roles & permissions). It includes manual test cases, automated test scripts, and templates for regression testing across releases.

## Contents

1. **TEST_PLAN.md** - Test strategy, scope, and approach
2. **TEST_CASES.md** - Authentication & session test cases (15 test cases)
3. **TEST_CASES_ADMIN.md** - Admin settings test cases (20 test cases)
4. **TEST_EXECUTION_REPORT_TEMPLATE.md** - Template for recording test results
5. **automated-tests/** - Automated test scripts (Playwright)
   - login.spec.js - Authentication tests
   - logout.spec.js - Session management tests
   - admin.spec.js - Admin settings tests
6. **BUG_REPORT_TEMPLATE.md** - Standardized bug reporting template

## Quick Start

### Manual Testing
1. Review `TEST_PLAN.md` for test strategy
2. Execute authentication tests from `TEST_CASES.md`
3. Execute admin tests from `TEST_CASES_ADMIN.md`
4. Record results using `TEST_EXECUTION_REPORT_TEMPLATE.md`
5. Report any bugs using `BUG_REPORT_TEMPLATE.md`

### Automated Testing
```bash
cd automated-tests
npm install
npx playwright install
npx playwright test
```

Run specific test suites:
```bash
npx playwright test tests/login.spec.js      # Authentication tests
npx playwright test tests/logout.spec.js     # Session management tests
npx playwright test tests/admin.spec.js      # Admin settings tests
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

### Authentication & Session Management
- **Authentication Tests** - Login, logout, validation
- **Session Management Tests** - Session persistence, timeout, logout flow
- **Security Tests** - Input validation, error handling
- **UI/UX Tests** - Visual validation, accessibility

### Admin Settings
- **User Management Tests** - Create, edit, delete users; assign roles and permissions
- **Roles & Permissions Tests** - Create, edit, delete custom roles; configure menu permissions
- **System Role Protection** - Verify system roles cannot be modified or deleted
- **Access Control** - Role-based access and scope management

## Test Coverage Summary

| Module | Manual Tests | Automated Tests | Status |
|--------|--------------|-----------------|--------|
| Authentication | 15 test cases | 11 automated | ✅ Complete |
| Session Management | Included above | 6 automated | ✅ Complete |
| User Management | 10 test cases | 6 automated | ✅ Complete |
| Roles & Permissions | 10 test cases | 8 automated | ✅ Complete |
| **Total** | **35 test cases** | **31 automated** | **88% automation** |

## Regression Testing Checklist

Before each release, execute:
- [ ] All authentication test cases (TC-AUTH-001 through TC-UI-005)
- [ ] All admin settings test cases (TC-ADMIN-001 through TC-ROLE-010)
- [ ] Full automated test suite (`npx playwright test`)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit

## Repository Structure

```
CloudPi-QA-Test-Suite/
├── README.md
├── TEST_PLAN.md
├── TEST_CASES.md                    # Authentication & session tests
├── TEST_CASES_ADMIN.md              # Admin settings tests
├── TEST_EXECUTION_REPORT_TEMPLATE.md
├── BUG_REPORT_TEMPLATE.md
└── automated-tests/
    ├── README.md
    ├── package.json
    ├── playwright.config.js
    ├── .gitignore
    └── tests/
        ├── login.spec.js            # 11 authentication tests
        ├── logout.spec.js           # 6 session management tests
        └── admin.spec.js            # 14 admin settings tests
```

## Key Features

✅ **35 Manual Test Cases** - Comprehensive step-by-step test procedures  
✅ **31 Automated Tests** - 88% test automation coverage using Playwright  
✅ **Cross-Browser Support** - Chrome, Firefox, Safari, Edge, Mobile devices  
✅ **Regression Ready** - Execute full test suite before each release  
✅ **Documentation Templates** - Standardized test execution and bug reporting  
✅ **CI/CD Ready** - Automated tests can be integrated into deployment pipelines  

## Reporting Issues

1. Verify the issue is reproducible
2. Check if it's a known issue
3. Create bug report using `BUG_REPORT_TEMPLATE.md`
4. Include screenshots/videos
5. Specify environment details

## Support

For questions about this test suite, contact the QA team.

## License

This test suite is proprietary to CloudPi/PurpleData Inc.
