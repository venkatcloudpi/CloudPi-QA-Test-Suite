# CloudPi Admin Settings - Test Cases

**Application:** CloudPi Multi-Cloud Cost Workspace  
**Base URL:** https://vk4aws.cloudpi.ai  
**Module:** Admin Settings (User Management & Roles/Permissions)  
**Date:** 2026-08-29  
**Version:** 1.0

---

## Table of Contents

1. [User Management Test Cases](#user-management-test-cases)
2. [Roles & Permissions Test Cases](#roles--permissions-test-cases)
3. [Traceability Matrix](#traceability-matrix)

---

## User Management Test Cases

### TC-ADMIN-001: Create User with Valid Data

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Click "Invite User" button
3. Fill in the following details:
   - Email: `test.user@cloudpi.ai`
   - Display Name: `Test User`
   - User Type: `Local User` (default)
4. Select Role: `Workspace User`
5. Select Project Group: `AWS_GRP`
6. Click "Send Invitation"

**Expected Result:**
- Success message appears: "User invited successfully" or similar
- User appears in the user list with correct details:
  - Email: test.user@cloudpi.ai
  - Role: Workspace User
  - Scope: Project Group
  - Projects: AWS_GRP
- User receives invitation email (if SMTP configured)

---

### TC-ADMIN-002: Create User with Invalid Email

**Priority:** High  
**Type:** Negative  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Click "Invite User" button
3. Enter invalid email format: `invalid.email` (no @ symbol)
4. Fill Display Name: `Test User`
5. Select Role: `Workspace User`
6. Attempt to click "Send Invitation"

**Expected Result:**
- Email field shows validation error
- "Send Invitation" button remains disabled or shows error
- User is not created
- No entry appears in user list

---

### TC-ADMIN-003: Create User Without Selecting Role

**Priority:** High  
**Type:** Negative  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Click "Invite User" button
3. Enter Email: `test.user@cloudpi.ai`
4. Enter Display Name: `Test User`
5. Leave Role dropdown at default "-- Select a role --"
6. Attempt to click "Send Invitation"

**Expected Result:**
- "Send Invitation" button is disabled
- Validation message appears: "Role is required"
- User cannot be created without selecting a role

---

### TC-ADMIN-004: Create User Without Selecting Project Group

**Priority:** Medium  
**Type:** Negative  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Click "Invite User" button
3. Enter Email: `test.user@cloudpi.ai`
4. Enter Display Name: `Test User`
5. Select Role: `Workspace User` (scope: Project Group)
6. Do NOT select any project group
7. Attempt to click "Send Invitation"

**Expected Result:**
- "Send Invitation" button is disabled or validation error appears
- Error message: "Please select at least one project group"
- User cannot be created without selecting project group for Project Group scoped roles

---

### TC-ADMIN-005: Delete User with Confirmation

**Priority:** High  
**Type:** Functional  
**Prerequisites:** 
- Logged in as Workspace Admin
- Test user exists in the system

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Locate the test user in the user list
3. Click "Delete User" button for the test user
4. Verify deletion confirmation dialog appears with:
   - User email
   - Warning message about permanent removal
   - Affected role and projects
5. Click "Delete User" in confirmation dialog

**Expected Result:**
- Success message appears: "User has been successfully deleted"
- User is removed from the user list
- User no longer appears in search results
- User's permissions and access are revoked

---

### TC-ADMIN-006: Cancel User Deletion

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:**
- Logged in as Workspace Admin
- Test user exists in the system

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Locate the test user in the user list
3. Click "Delete User" button
4. Verify deletion confirmation dialog appears
5. Click "Cancel" button

**Expected Result:**
- Deletion dialog closes
- User remains in the user list
- No changes made to user account
- User's access and permissions remain intact

---

### TC-ADMIN-007: Edit User Details

**Priority:** High  
**Type:** Functional  
**Prerequisites:**
- Logged in as Workspace Admin
- Test user exists in the system

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Locate the test user in the user list
3. Click "Edit User" button
4. Modify user details (e.g., change display name or role)
5. Click "Save" or "Update" button

**Expected Result:**
- Success message appears: "User updated successfully"
- Updated details reflect in the user list
- User's permissions updated if role changed
- Changes persist after page refresh

---

### TC-ADMIN-008: View User Details and Permissions

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:**
- Logged in as Workspace Admin
- Test user exists in the system

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Locate the test user in the user list
3. Click "View Details & Permissions" button

**Expected Result:**
- User details modal/page opens
- Displays complete user information:
  - Email address
  - Display name
  - User type (Local/SSO)
  - Assigned role
  - Scope (Workspace/Project Group/Project)
  - Assigned projects
  - Menu permissions based on role
- All information is accurate and matches user configuration

---

### TC-ADMIN-009: Search Users by Email

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:**
- Logged in as Workspace Admin
- Multiple users exist in the system

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Locate the search box
3. Enter partial or full email address (e.g., "venkat")
4. Observe user list filtering

**Expected Result:**
- User list filters in real-time
- Only users matching search query are displayed
- Clearing search box shows all users again
- Search is case-insensitive

---

### TC-ADMIN-010: Filter Users by Role

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:**
- Logged in as Workspace Admin
- Users with different roles exist

**Test Steps:**
1. Navigate to Admin Settings → User Management
2. Click "All Roles" dropdown filter
3. Select specific role (e.g., "Workspace User")
4. Observe user list filtering

**Expected Result:**
- User list shows only users with selected role
- Count of filtered users is accurate
- Selecting "All Roles" shows all users again
- Filter persists during pagination if applicable

---

## Roles & Permissions Test Cases

### TC-ROLE-001: Create Custom Role with Valid Data

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Click "Create Role" button
3. Enter Role Name: `QA Test Role`
4. Select Role Scope from dropdown (e.g., "Project")
5. Configure menu permissions as needed (default is "Read Access")
6. Click "Create Role" button

**Expected Result:**
- Success message appears: "Role 'QA Test Role' created successfully"
- New role appears in roles list with:
  - Role Name: QA Test Role
  - Type: Custom
  - Scope: Project
  - Number of menus configured
- Edit and Delete buttons are available for the custom role

---

### TC-ROLE-002: Create Role Without Name

**Priority:** High  
**Type:** Negative  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Click "Create Role" button
3. Leave Role Name field empty
4. Select Role Scope
5. Attempt to click "Create Role" button

**Expected Result:**
- "Create Role" button is disabled
- Validation message appears: "Role name is required"
- Role cannot be created without a name
- Form remains open for correction

---

### TC-ROLE-003: Delete Custom Role with Confirmation

**Priority:** High  
**Type:** Functional  
**Prerequisites:**
- Logged in as Workspace Admin
- Custom role exists (not assigned to any users)

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Locate the custom role in the list
3. Click "Delete Role" button
4. Verify deletion confirmation dialog appears with:
   - Role name
   - Warning about permanent deletion
5. Click "Delete" button in confirmation dialog

**Expected Result:**
- Success message appears: "Role 'QA Test Role' deleted successfully"
- Role is removed from the roles list
- Role is no longer available for user assignment
- If role was assigned to users, deletion should be blocked with appropriate message

---

### TC-ROLE-004: Cancel Role Deletion

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:**
- Logged in as Workspace Admin
- Custom role exists

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Locate the custom role in the list
3. Click "Delete Role" button
4. Verify deletion confirmation dialog appears
5. Click "Cancel" button

**Expected Result:**
- Deletion dialog closes
- Role remains in the roles list
- No changes made to the role
- Role is still available for user assignment

---

### TC-ROLE-005: Edit Custom Role

**Priority:** High  
**Type:** Functional  
**Prerequisites:**
- Logged in as Workspace Admin
- Custom role exists

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Locate the custom role in the list
3. Click "Edit Role" button
4. Modify role details (e.g., change permissions or scope)
5. Click "Save" or "Update" button

**Expected Result:**
- Success message appears: "Role updated successfully"
- Changes reflect in the roles list
- Users assigned to this role get updated permissions
- Changes persist after page refresh

---

### TC-ROLE-006: View Role Permissions

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:**
- Logged in as Workspace Admin
- Role exists (System or Custom)

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Locate any role in the list
3. Click "View Permissions" button

**Expected Result:**
- Permissions modal/page opens
- Displays complete list of menu permissions
- Shows permission level for each menu:
  - FULL (full access)
  - Read Access
  - No Access
- Sub-menus and their permissions are displayed
- Information is accurate and matches role configuration

---

### TC-ROLE-007: Verify System Roles Cannot Be Deleted

**Priority:** High  
**Type:** Negative  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Locate a system role (e.g., "Workspace Admin", "Project User")
3. Observe available actions

**Expected Result:**
- "Delete Role" button is NOT present for system roles
- Only "View Permissions" button is available
- System roles are clearly marked as "Type: System"
- Attempting to delete via API/direct manipulation should fail

---

### TC-ROLE-008: Verify System Roles Cannot Be Edited

**Priority:** High  
**Type:** Negative  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Locate a system role (e.g., "Workspace Admin")
3. Observe available actions

**Expected Result:**
- "Edit Role" button is NOT present for system roles
- Only "View Permissions" button is available
- System roles are read-only
- Attempting to edit via API/direct manipulation should fail

---

### TC-ROLE-009: Configure Menu Permissions for Custom Role

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Click "Create Role" or "Edit Role" for custom role
3. Enter/verify Role Name
4. For each menu in the list:
   - Set permission level (FULL / Read Access / No Access)
   - Verify sub-menus inherit or can be set independently
5. Click "Create Role" or "Update Role"

**Expected Result:**
- Each menu can have its permission level set independently
- Sub-menus can be configured separately or inherit parent permissions
- Permission changes are saved correctly
- Users assigned to this role see only menus with Read Access or above
- "No Access" menus are hidden from users with this role

---

### TC-ROLE-010: Change Role Scope

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:** Logged in as Workspace Admin

**Test Steps:**
1. Navigate to Admin Settings → Roles & Permissions
2. Click "Create Role" button
3. Enter Role Name: `Scope Test Role`
4. Click Role Scope dropdown
5. Try each scope option:
   - Workspace
   - Project Group
   - Project

**Expected Result:**
- Scope dropdown shows all available options:
  - "Workspace - User has access to all projects"
  - "Project Group - User selects project groups during invite"
  - "Project - User selects specific projects during invite"
- Selected scope is saved with the role
- Scope determines what projects users can be assigned during invitation
- Scope is displayed in the roles list

---

## Traceability Matrix

| Test Case ID | Feature | Status | Priority | Automated |
|--------------|---------|--------|----------|-----------|
| TC-ADMIN-001 | User Management - Create User | Not Executed | High | No |
| TC-ADMIN-002 | User Management - Invalid Email | Not Executed | High | No |
| TC-ADMIN-003 | User Management - No Role | Not Executed | High | No |
| TC-ADMIN-004 | User Management - No Project Group | Not Executed | Medium | No |
| TC-ADMIN-005 | User Management - Delete User | Not Executed | High | No |
| TC-ADMIN-006 | User Management - Cancel Delete | Not Executed | Medium | No |
| TC-ADMIN-007 | User Management - Edit User | Not Executed | High | No |
| TC-ADMIN-008 | User Management - View Details | Not Executed | Medium | No |
| TC-ADMIN-009 | User Management - Search | Not Executed | Medium | No |
| TC-ADMIN-010 | User Management - Filter by Role | Not Executed | Medium | No |
| TC-ROLE-001 | Roles - Create Custom Role | Not Executed | High | No |
| TC-ROLE-002 | Roles - No Name Validation | Not Executed | High | No |
| TC-ROLE-003 | Roles - Delete Custom Role | Not Executed | High | No |
| TC-ROLE-004 | Roles - Cancel Delete | Not Executed | Medium | No |
| TC-ROLE-005 | Roles - Edit Custom Role | Not Executed | High | No |
| TC-ROLE-006 | Roles - View Permissions | Not Executed | Medium | No |
| TC-ROLE-007 | Roles - Cannot Delete System | Not Executed | High | No |
| TC-ROLE-008 | Roles - Cannot Edit System | Not Executed | High | No |
| TC-ROLE-009 | Roles - Configure Permissions | Not Executed | High | No |
| TC-ROLE-010 | Roles - Change Scope | Not Executed | Medium | No |

**Test Coverage:** 20 test cases  
**Execution Status:** 0% (0/20 executed)

---

## Notes

- All test cases assume valid credentials and Workspace Admin permissions
- SMTP configuration may affect user invitation email delivery
- Some test cases may require cleanup after execution
- System roles (Workspace Admin, Workspace User, Project Admin, Project User) are protected and cannot be modified
- Custom roles can only be deleted if not assigned to any active users

---

## Test Data

### Valid Test Users
- Email: `test.user1@cloudpi.ai`, Display Name: `Test User One`
- Email: `test.user2@cloudpi.ai`, Display Name: `Test User Two`
- Email: `claude.qa@cloudpi.ai`, Display Name: `Claude QA Test`

### Invalid Test Emails
- `invalid.email` (missing @)
- `@cloudpi.ai` (missing username)
- `test@` (missing domain)
- `test user@cloudpi.ai` (contains space)

### Test Role Names
- `QA Test Role`
- `Custom Viewer Role`
- `Project Limited Role`

---

## References

- Main Test Plan: `TEST_PLAN.md`
- Authentication Test Cases: `TEST_CASES.md`
- Bug Report Template: `BUG_REPORT_TEMPLATE.md`
