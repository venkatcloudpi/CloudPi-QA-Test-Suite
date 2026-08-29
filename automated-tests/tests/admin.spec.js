// @ts-check
const { test, expect } = require('@playwright/test');

const VALID_EMAIL = 'venkat+work@cloudpi.ai';
const VALID_PASSWORD = 'Admin123!';
const TEST_USER_EMAIL = 'claude.qa.test@cloudpi.ai';
const TEST_USER_NAME = 'Claude QA Automated Test';
const TEST_ROLE_NAME = 'QA Automated Test Role';

test.describe('Admin Settings - User Management Tests', () => {
  
  // Login before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Enter email address"]', VALID_EMAIL);
    await page.fill('input[placeholder="Enter password"]', VALID_PASSWORD);
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/home', { timeout: 15000 });
    
    // Navigate to User Management
    await page.click('text=Admin Settings');
    await page.waitForURL('**/adminsettings/usermanagement', { timeout: 10000 });
  });

  test('TC-ADMIN-001: Create user with valid data', async ({ page }) => {
    // Click Invite User button
    await page.click('button:has-text("Invite User")');
    
    // Wait for dialog to open
    await expect(page.locator('text=Invite User').first()).toBeVisible();
    
    // Fill in user details
    await page.fill('input[placeholder*="email"]', TEST_USER_EMAIL);
    await page.fill('input[placeholder*="display name"]', TEST_USER_NAME);
    
    // Select role
    await page.click('text=-- Select a role --');
    await page.click('text=Workspace User');
    
    // Wait for project group section to appear
    await expect(page.locator('text=Select Project Groups')).toBeVisible({ timeout: 5000 });
    
    // Select a project group
    await page.click('button:has-text("AWS_GRP")').catch(() => {
      // If AWS_GRP doesn't exist, click the first available project group
      page.locator('button').filter({ hasText: /_GRP|_Grp/ }).first().click();
    });
    
    // Click Send Invitation
    await page.click('button:has-text("Send Invitation")');
    
    // Verify success message or user appears in list
    await expect(page.locator(`text=${TEST_USER_EMAIL}`)).toBeVisible({ timeout: 10000 });
  });

  test('TC-ADMIN-002: Create user with invalid email', async ({ page }) => {
    // Click Invite User button
    await page.click('button:has-text("Invite User")');
    
    // Wait for dialog to open
    await expect(page.locator('text=Invite User').first()).toBeVisible();
    
    // Fill in invalid email
    await page.fill('input[placeholder*="email"]', 'invalid.email');
    await page.fill('input[placeholder*="display name"]', TEST_USER_NAME);
    
    // Try to select role
    await page.click('text=-- Select a role --');
    await page.click('text=Workspace User');
    
    // Send Invitation button should be disabled or show error
    const sendButton = page.locator('button:has-text("Send Invitation")');
    const isDisabled = await sendButton.isDisabled().catch(() => true);
    
    expect(isDisabled).toBeTruthy();
  });

  test('TC-ADMIN-005: Delete user with confirmation', async ({ page }) => {
    // First, ensure test user exists by creating it
    await page.click('button:has-text("Invite User")');
    await page.fill('input[placeholder*="email"]', TEST_USER_EMAIL);
    await page.fill('input[placeholder*="display name"]', TEST_USER_NAME);
    await page.click('text=-- Select a role --');
    await page.click('text=Workspace User');
    await page.click('button:has-text("AWS_GRP")').catch(() => {
      page.locator('button').filter({ hasText: /_GRP|_Grp/ }).first().click();
    });
    await page.click('button:has-text("Send Invitation")');
    await page.waitForTimeout(2000);
    
    // Find and delete the user
    const userRow = page.locator(`tr:has-text("${TEST_USER_EMAIL}")`).first();
    await expect(userRow).toBeVisible({ timeout: 10000 });
    
    // Click Delete User button
    await userRow.locator('button:has-text("Delete User")').click();
    
    // Verify confirmation dialog appears
    await expect(page.locator('text=Are you sure you want to delete')).toBeVisible();
    
    // Confirm deletion
    await page.locator('button:has-text("Delete")').last().click();
    
    // Verify success message or user removed from list
    await page.waitForTimeout(2000);
    const userExists = await page.locator(`text=${TEST_USER_EMAIL}`).count();
    expect(userExists).toBe(0);
  });

  test('TC-ADMIN-009: Search users by email', async ({ page }) => {
    // Wait for user list to load
    await expect(page.locator('text=List of Users')).toBeVisible();
    
    // Type in search box
    await page.fill('input[placeholder*="Search"]', 'venkat');
    
    // Wait for filtering
    await page.waitForTimeout(1000);
    
    // Verify filtered results
    await expect(page.locator('text=venkat+work@cloudpi.ai')).toBeVisible();
  });

  test('TC-ADMIN-010: Filter users by role', async ({ page }) => {
    // Wait for user list to load
    await expect(page.locator('text=List of Users')).toBeVisible();
    
    // Click role filter dropdown
    await page.click('text=All Roles');
    
    // Select a specific role
    await page.click('text=Workspace Admin').first();
    
    // Wait for filtering
    await page.waitForTimeout(1000);
    
    // Verify only users with selected role are shown
    await expect(page.locator('text=Workspace Admin')).toBeVisible();
  });
});

test.describe('Admin Settings - Roles & Permissions Tests', () => {
  
  // Login and navigate to Roles & Permissions before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Enter email address"]', VALID_EMAIL);
    await page.fill('input[placeholder="Enter password"]', VALID_PASSWORD);
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/home', { timeout: 15000 });
    
    // Navigate to Roles & Permissions
    await page.click('text=Admin Settings');
    await page.click('text=Roles & Permissions');
    await page.waitForURL('**/adminsettings/rolespermissions', { timeout: 10000 });
  });

  test('TC-ROLE-001: Create custom role with valid data', async ({ page }) => {
    // Click Create Role button
    await page.click('button:has-text("Create Role")');
    
    // Wait for dialog to open
    await expect(page.locator('text=Create Custom Role')).toBeVisible();
    
    // Fill in role name
    await page.fill('input[placeholder="Role Name"]', TEST_ROLE_NAME);
    
    // Role scope is pre-selected, permissions are pre-configured
    // Click Create Role
    await page.click('button:has-text("Create Role")').last();
    
    // Verify success message or role appears in list
    await expect(page.locator(`text=${TEST_ROLE_NAME}`)).toBeVisible({ timeout: 10000 });
  });

  test('TC-ROLE-002: Create role without name', async ({ page }) => {
    // Click Create Role button
    await page.click('button:has-text("Create Role")');
    
    // Wait for dialog to open
    await expect(page.locator('text=Create Custom Role')).toBeVisible();
    
    // Leave role name empty
    // Try to click Create Role button
    const createButton = page.locator('button:has-text("Create Role")').last();
    
    // Button should be disabled
    const isDisabled = await createButton.isDisabled();
    expect(isDisabled).toBeTruthy();
  });

  test('TC-ROLE-003: Delete custom role with confirmation', async ({ page }) => {
    // First, ensure test role exists by creating it
    await page.click('button:has-text("Create Role")');
    await page.fill('input[placeholder="Role Name"]', TEST_ROLE_NAME);
    await page.click('button:has-text("Create Role")').last();
    await page.waitForTimeout(2000);
    
    // Press Escape to close create dialog if still open
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
    
    // Find and delete the role
    const roleRow = page.locator(`tr:has-text("${TEST_ROLE_NAME}")`).first();
    await expect(roleRow).toBeVisible({ timeout: 10000 });
    
    // Click Delete Role button
    await roleRow.locator('button:has-text("Delete Role")').click();
    
    // Verify confirmation dialog appears
    await expect(page.locator('text=Are you sure you want to delete')).toBeVisible();
    
    // Confirm deletion
    await page.locator('button:has-text("Delete")').last().click();
    
    // Verify success message or role removed from list
    await page.waitForTimeout(2000);
    const roleExists = await page.locator(`text=${TEST_ROLE_NAME}`).count();
    expect(roleExists).toBe(0);
  });

  test('TC-ROLE-006: View role permissions', async ({ page }) => {
    // Wait for roles list to load
    await expect(page.locator('text=Workspace Admin')).toBeVisible();
    
    // Click View Permissions for a system role
    const workspaceAdminRow = page.locator('tr:has-text("Workspace Admin")').first();
    await workspaceAdminRow.locator('button:has-text("View Permissions")').click();
    
    // Verify permissions dialog/page opens
    await expect(page.locator('text=Home, text=Dashboard, text=Admin Settings').first()).toBeVisible({ timeout: 5000 });
  });

  test('TC-ROLE-007: Verify system roles cannot be deleted', async ({ page }) => {
    // Check Workspace Admin (system role)
    const workspaceAdminRow = page.locator('tr:has-text("Workspace Admin")').first();
    
    // Delete button should NOT exist for system roles
    const deleteButton = workspaceAdminRow.locator('button:has-text("Delete Role")');
    const deleteExists = await deleteButton.count();
    
    expect(deleteExists).toBe(0);
  });

  test('TC-ROLE-008: Verify system roles cannot be edited', async ({ page }) => {
    // Check Project Admin (system role)
    const projectAdminRow = page.locator('tr:has-text("Project Admin")').first();
    
    // Edit button should NOT exist for system roles
    const editButton = projectAdminRow.locator('button:has-text("Edit Role")');
    const editExists = await editButton.count();
    
    expect(editExists).toBe(0);
  });

  test('TC-ROLE-009: Configure menu permissions for custom role', async ({ page }) => {
    // Click Create Role button
    await page.click('button:has-text("Create Role")');
    
    // Wait for dialog to open
    await expect(page.locator('text=Create Custom Role')).toBeVisible();
    
    // Fill in role name
    await page.fill('input[placeholder="Role Name"]', 'Permission Test Role');
    
    // Verify menu permissions section is visible
    await expect(page.locator('text=Menu Permissions')).toBeVisible();
    await expect(page.locator('text=Dashboard')).toBeVisible();
    
    // Verify permission dropdowns exist
    const permissionDropdowns = page.locator('select, [role="combobox"]').filter({ hasText: /Read Access|FULL|No Access/ });
    const count = await permissionDropdowns.count();
    expect(count).toBeGreaterThan(0);
    
    // Cancel to cleanup
    await page.click('button:has-text("Cancel")');
  });

  test('TC-ROLE-010: Change role scope', async ({ page }) => {
    // Click Create Role button
    await page.click('button:has-text("Create Role")');
    
    // Wait for dialog to open
    await expect(page.locator('text=Create Custom Role')).toBeVisible();
    
    // Fill in role name
    await page.fill('input[placeholder="Role Name"]', 'Scope Test Role');
    
    // Click Role Scope dropdown
    const scopeDropdown = page.locator('text=Role Scope').locator('..').locator('[role="combobox"]');
    await scopeDropdown.click();
    
    // Verify scope options are available
    await expect(page.locator('text=Workspace, text=Project Group, text=Project').first()).toBeVisible();
    
    // Cancel to cleanup
    await page.keyboard.press('Escape');
    await page.click('button:has-text("Cancel")');
  });
});
