# CloudPi Login & Authentication - Test Cases

**Version:** 1.0
**Last Updated:** 2026-08-29
**Total Test Cases:** 15

---

## Test Case Index

### Authentication Tests
- [TC-AUTH-001](#tc-auth-001-login-with-empty-credentials)
- [TC-AUTH-002](#tc-auth-002-login-with-empty-email)
- [TC-AUTH-003](#tc-auth-003-login-with-empty-password)
- [TC-AUTH-004](#tc-auth-004-login-with-invalid-email-format)
- [TC-AUTH-005](#tc-auth-005-login-with-invalid-credentials)
- [TC-AUTH-006](#tc-auth-006-login-with-valid-credentials)

### Session Management Tests
- [TC-SESSION-001](#tc-session-001-logout-functionality)
- [TC-SESSION-002](#tc-session-002-logout-confirmation-dialog)
- [TC-SESSION-003](#tc-session-003-session-termination-after-logout)
- [TC-SESSION-004](#tc-session-004-keep-me-signed-in-checkbox)

### UI/UX Tests
- [TC-UI-001](#tc-ui-001-login-page-visual-validation)
- [TC-UI-002](#tc-ui-002-password-visibility-toggle)
- [TC-UI-003](#tc-ui-003-forgot-password-link)
- [TC-UI-004](#tc-ui-004-sso-buttons-present)
- [TC-UI-005](#tc-ui-005-profile-menu-access)

---

## Detailed Test Cases

### TC-AUTH-001: Login with Empty Credentials

**Priority:** High  
**Category:** Authentication  
**Test Type:** Negative Testing

**Pre-conditions:**
- User is on the login page (https://vk4aws.cloudpi.ai)
- User is logged out (no active session)

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Leave EMAIL ADDRESS field empty
3. Leave PASSWORD field empty
4. Click the "Login" button

**Expected Result:**
- Login form is NOT submitted
- Email field displays red border
- Error message "Email is required" appears below email field in red text
- Password field displays red border
- Error message "Password is required" appears below password field in red text
- User remains on login page

**Post-conditions:**
- User is NOT logged in
- No session created

---

### TC-AUTH-002: Login with Empty Email

**Priority:** High  
**Category:** Authentication  
**Test Type:** Negative Testing

**Pre-conditions:**
- User is on the login page
- User is logged out

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Leave EMAIL ADDRESS field empty
3. Enter any value in PASSWORD field (e.g., "Test123!")
4. Click the "Login" button

**Expected Result:**
- Login form is NOT submitted
- Email field displays red border
- Error message "Email is required" appears below email field
- User remains on login page

**Post-conditions:**
- User is NOT logged in

---

### TC-AUTH-003: Login with Empty Password

**Priority:** High  
**Category:** Authentication  
**Test Type:** Negative Testing

**Pre-conditions:**
- User is on the login page
- User is logged out

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Enter valid email in EMAIL ADDRESS field (e.g., "test@example.com")
3. Leave PASSWORD field empty
4. Click the "Login" button

**Expected Result:**
- Login form is NOT submitted
- Password field displays red border
- Error message "Password is required" appears below password field
- User remains on login page

**Post-conditions:**
- User is NOT logged in

---

### TC-AUTH-004: Login with Invalid Email Format

**Priority:** Medium  
**Category:** Authentication  
**Test Type:** Negative Testing

**Pre-conditions:**
- User is on the login page
- User is logged out

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Enter invalid email format in EMAIL ADDRESS field
   - Test cases: "notanemail", "test@", "@example.com", "test..test@example.com"
3. Enter any password in PASSWORD field
4. Click the "Login" button

**Expected Result:**
- Email field displays red border
- Error message "Must be a valid email" appears
- Form does not submit

**Post-conditions:**
- User is NOT logged in

---

### TC-AUTH-005: Login with Invalid Credentials

**Priority:** High  
**Category:** Authentication  
**Test Type:** Negative Testing

**Pre-conditions:**
- User is on the login page
- User is logged out

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Enter email that doesn't exist in system: "test@invalid.com"
3. Enter any password: "wrongpassword123"
4. Click the "Login" button

**Expected Result:**
- Login button becomes disabled briefly during submission
- Error message appears: "Invalid domain / subscription expired"
- Error message is displayed in red text
- User remains on login page
- Email and password fields retain their values

**Post-conditions:**
- User is NOT logged in
- No session created

---

### TC-AUTH-006: Login with Valid Credentials

**Priority:** Critical  
**Category:** Authentication  
**Test Type:** Positive Testing

**Pre-conditions:**
- User is on the login page
- User is logged out
- Valid credentials available (see README.md)

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Enter valid email: "venkat+work@cloudpi.ai"
3. Enter valid password: "Admin123!"
4. Click the "Login" button

**Expected Result:**
- Login button becomes disabled during submission
- Page redirects to https://vk4aws.cloudpi.ai/home
- Dashboard loads successfully
- Personalized greeting appears: "Good afternoon, venkat." (or Good morning/evening based on time)
- User profile icon appears in top-right corner
- Navigation menu is accessible

**Post-conditions:**
- User is logged in
- Active session created
- User can access all application features

---

### TC-SESSION-001: Logout Functionality

**Priority:** Critical  
**Category:** Session Management  
**Test Type:** Positive Testing

**Pre-conditions:**
- User is logged in to the application
- User is on any page within the application

**Test Steps:**
1. Click the profile icon in the top-right corner
2. Click the "Profile" tab in the dropdown menu
3. Click the "Logout" button
4. In the confirmation dialog, click "Logout" button

**Expected Result:**
- Profile dropdown opens when profile icon is clicked
- "Profile" tab shows: Edit Profile, Change Password, Logout buttons
- Confirmation dialog appears with message: "Are you sure you want to logout?"
- Dialog contains "Cancel" and "Logout" buttons
- After clicking "Logout", page redirects to https://vk4aws.cloudpi.ai/
- Login page is displayed
- User cannot access authenticated pages without logging in again

**Post-conditions:**
- User is logged out
- Session is terminated
- Cannot access /home or other authenticated pages

---

### TC-SESSION-002: Logout Confirmation Dialog

**Priority:** Medium  
**Category:** Session Management  
**Test Type:** Positive Testing

**Pre-conditions:**
- User is logged in
- User is on any page

**Test Steps:**
1. Click profile icon in top-right
2. Click "Profile" tab
3. Click "Logout" button
4. In confirmation dialog, click "Cancel" button

**Expected Result:**
- Confirmation dialog closes
- User remains logged in
- User stays on current page
- Session is not terminated

**Post-conditions:**
- User still logged in
- Active session continues

---

### TC-SESSION-003: Session Termination After Logout

**Priority:** High  
**Category:** Session Management  
**Test Type:** Security Testing

**Pre-conditions:**
- User is logged in
- User has completed logout process

**Test Steps:**
1. After logging out successfully, note the login page is displayed
2. Manually navigate to https://vk4aws.cloudpi.ai/home
3. Attempt to access any authenticated page

**Expected Result:**
- Attempting to access /home redirects to login page
- No cached content from previous session is displayed
- User must re-authenticate to access the application

**Post-conditions:**
- User remains logged out
- No session active

---

### TC-SESSION-004: Keep Me Signed In Checkbox

**Priority:** Medium  
**Category:** Session Management  
**Test Type:** Functional Testing

**Pre-conditions:**
- User is on login page
- User is logged out

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Enter valid credentials
3. Check the "Keep me signed in" checkbox
4. Click "Login"
5. Close browser completely
6. Reopen browser and navigate to https://vk4aws.cloudpi.ai

**Expected Result:**
- User is automatically logged in (session persisted)
- Dashboard loads without requiring credentials

**Note:** Test opposite scenario (unchecked) - session should not persist after browser close

---

### TC-UI-001: Login Page Visual Validation

**Priority:** Medium  
**Category:** UI/UX  
**Test Type:** Visual Testing

**Pre-conditions:**
- User navigates to login page

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Observe page layout and elements

**Expected Result:**
- CloudPi logo appears in top-left
- "Login" heading is centered
- EMAIL ADDRESS label and input field present
- PASSWORD label and input field present
- Password field shows masked characters (dots/bullets)
- Password visibility toggle button (eye icon) present
- "Keep me signed in" checkbox present with label
- "Forgot Password?" link present (blue, underlined)
- "Login" button present (blue, centered)
- "OR" separator line present
- "Sign in with Azure Entra ID" button present (white/blue border)
- "Sign in with Auth0" button present (white/red border)
- Footer text: "This site is protected by Privacy Policy"
- "Terms and Conditions" link present in footer
- Page is responsive and elements are properly aligned

**Post-conditions:**
- N/A

---

### TC-UI-002: Password Visibility Toggle

**Priority:** Low  
**Category:** UI/UX  
**Test Type:** Functional Testing

**Pre-conditions:**
- User is on login page

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Enter any text in PASSWORD field
3. Observe password is masked
4. Click the eye icon (password visibility toggle)
5. Observe password becomes visible
6. Click the eye icon again

**Expected Result:**
- Password initially displays as dots/bullets
- Clicking eye icon reveals password in plain text
- Clicking eye icon again masks password
- Toggle icon changes state (eye vs eye-slash)

**Post-conditions:**
- Password field returns to masked state

---

### TC-UI-003: Forgot Password Link

**Priority:** Medium  
**Category:** UI/UX  
**Test Type:** Functional Testing

**Pre-conditions:**
- User is on login page

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Locate "Forgot Password?" link (right-aligned, below password field)
3. Click "Forgot Password?" link

**Expected Result:**
- Link is clickable and styled in blue
- Clicking redirects to https://vk4aws.cloudpi.ai/forgot-password
- Password reset page loads

**Post-conditions:**
- User is on password reset page

---

### TC-UI-004: SSO Buttons Present

**Priority:** Medium  
**Category:** UI/UX  
**Test Type:** Visual Testing

**Pre-conditions:**
- User is on login page

**Test Steps:**
1. Navigate to https://vk4aws.cloudpi.ai
2. Scroll down below the email/password login section
3. Observe SSO buttons

**Expected Result:**
- "OR" separator is visible between login button and SSO options
- "Sign in with Azure Entra ID" button is present with Microsoft logo
- "Sign in with Auth0" button is present with Auth0 logo
- Both buttons are properly styled and aligned
- Buttons are clickable

**Post-conditions:**
- N/A

---

### TC-UI-005: Profile Menu Access

**Priority:** High  
**Category:** UI/UX  
**Test Type:** Functional Testing

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. After successful login, locate profile icon in top-right corner
2. Click profile icon
3. Observe dropdown menu
4. Click "Profile" tab
5. Observe profile menu options
6. Click "Settings" tab
7. Observe settings options

**Expected Result:**
- Profile dropdown opens showing:
  - User Name: venkat
  - Email: venkat+work@cloudpi.ai
  - Two tabs: "Profile" and "Settings"
- Profile tab contains:
  - Edit Profile button
  - Change Password button
  - Logout button
- Settings tab loads settings options
- Menu is properly styled and responsive
- Clicking outside menu closes it

**Post-conditions:**
- User remains logged in

---

## Test Data

### Valid Credentials
```
Email: venkat+work@cloudpi.ai
Password: Admin123!
```

```
Email: admin@cloudpi.ai
Password: admin123
(Limited functionality - initial setup user)
```

### Invalid Email Formats
```
- notanemail
- test@
- @example.com
- test..test@example.com
- test@domain
- test space@example.com
```

### Invalid Credentials
```
Email: test@invalid.com
Password: wrongpassword123
```

---

## Test Execution Notes

1. **Clear Browser State:** Before testing, ensure no cached sessions exist. Use incognito/private mode or clear cookies.

2. **Cross-Browser Testing:** Execute critical test cases (TC-AUTH-006, TC-SESSION-001) on all supported browsers.

3. **Mobile Testing:** Test on mobile devices for responsive design validation.

4. **Screenshot Evidence:** Capture screenshots of all error messages and successful flows.

5. **Timing:** Some error messages may appear briefly before redirecting. Ensure adequate time to observe.

---

## Traceability Matrix

| Test Case ID | Requirement | Priority | Status |
|-------------|-------------|----------|--------|
| TC-AUTH-001 | Validation - Empty fields | High | ✅ Passed |
| TC-AUTH-002 | Validation - Empty email | High | ✅ Passed |
| TC-AUTH-003 | Validation - Empty password | High | ✅ Passed |
| TC-AUTH-004 | Validation - Email format | Medium | ✅ Passed |
| TC-AUTH-005 | Authentication - Reject invalid | High | ✅ Passed |
| TC-AUTH-006 | Authentication - Accept valid | Critical | ✅ Passed |
| TC-SESSION-001 | Logout functionality | Critical | ✅ Passed |
| TC-SESSION-002 | Logout confirmation | Medium | ✅ Passed |
| TC-SESSION-003 | Session termination | High | ✅ Passed |
| TC-SESSION-004 | Session persistence | Medium | Not Tested |
| TC-UI-001 | UI visual validation | Medium | ✅ Passed |
| TC-UI-002 | Password toggle | Low | Not Tested |
| TC-UI-003 | Forgot password link | Medium | Not Tested |
| TC-UI-004 | SSO buttons | Medium | ✅ Passed |
| TC-UI-005 | Profile menu | High | ✅ Passed |

**Last Execution Date:** 2026-08-29  
**Test Coverage:** 80% (12/15 test cases executed)
