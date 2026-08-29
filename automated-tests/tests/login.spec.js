const { test, expect } = require('@playwright/test');

// Test data
const VALID_EMAIL = 'venkat+work@cloudpi.ai';
const VALID_PASSWORD = 'Admin123!';
const INVALID_EMAIL = 'test@invalid.com';
const INVALID_PASSWORD = 'wrongpassword123';

test.describe('CloudPi Login Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('/');
    await expect(page).toHaveTitle(/CloudPi/);
  });

  test('TC-AUTH-001: Login with empty credentials', async ({ page }) => {
    // Click login button with empty fields
    await page.click('button:has-text("Login")');
    
    // Verify error messages appear
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
    
    // Verify user stays on login page
    await expect(page).toHaveURL('/');
  });

  test('TC-AUTH-002: Login with empty email', async ({ page }) => {
    // Enter password only
    await page.fill('input[placeholder="Enter password"]', 'TestPassword123');
    await page.click('button:has-text("Login")');
    
    // Verify error message
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('TC-AUTH-003: Login with empty password', async ({ page }) => {
    // Enter email only
    await page.fill('input[placeholder="Enter email address"]', 'test@example.com');
    await page.click('button:has-text("Login")');
    
    // Verify error message
    await expect(page.locator('text=Password is required')).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('TC-AUTH-004: Login with invalid email format', async ({ page }) => {
    const invalidEmails = ['notanemail', 'test@', '@example.com'];
    
    for (const email of invalidEmails) {
      await page.fill('input[placeholder="Enter email address"]', email);
      await page.fill('input[placeholder="Enter password"]', 'TestPassword123');
      await page.click('button:has-text("Login")');
      
      // Verify validation error
      await expect(page.locator('text=Must be a valid email')).toBeVisible();
      
      // Clear fields for next iteration
      await page.fill('input[placeholder="Enter email address"]', '');
      await page.fill('input[placeholder="Enter password"]', '');
    }
  });

  test('TC-AUTH-005: Login with invalid credentials', async ({ page }) => {
    // Enter invalid credentials
    await page.fill('input[placeholder="Enter email address"]', INVALID_EMAIL);
    await page.fill('input[placeholder="Enter password"]', INVALID_PASSWORD);
    await page.click('button:has-text("Login")');
    
    // Wait for error message
    await expect(page.locator('text=Invalid domain / subscription expired')).toBeVisible({ timeout: 10000 });
    
    // Verify still on login page
    await expect(page).toHaveURL('/');
  });

  test('TC-AUTH-006: Login with valid credentials', async ({ page }) => {
    // Enter valid credentials
    await page.fill('input[placeholder="Enter email address"]', VALID_EMAIL);
    await page.fill('input[placeholder="Enter password"]', VALID_PASSWORD);
    await page.click('button:has-text("Login")');
    
    // Wait for navigation to home page
    await page.waitForURL('**/home', { timeout: 15000 });
    
    // Verify successful login
    await expect(page).toHaveURL(/.*\/home/);
    await expect(page.locator('text=Good')).toBeVisible(); // "Good afternoon/morning/evening"
    await expect(page.locator('text=venkat')).toBeVisible();
    
    // Verify user can access authenticated content
    const profileButton = page.locator('button[aria-label="open profile"], button:has-text("Profile")').first();
    await expect(profileButton).toBeVisible();
  });

  test('TC-UI-001: Login page visual validation', async ({ page }) => {
    // Verify all UI elements are present
    await expect(page.locator('h4:has-text("Login")')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter email address"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter password"]')).toBeVisible();
    await expect(page.locator('text=Keep me signed in')).toBeVisible();
    await expect(page.locator('a:has-text("Forgot Password?")')).toBeVisible();
    await expect(page.locator('button:has-text("Login")')).toBeVisible();
    await expect(page.locator('button:has-text("Sign in with Azure Entra ID")')).toBeVisible();
    await expect(page.locator('button:has-text("Sign in with Auth0")')).toBeVisible();
    await expect(page.locator('a:has-text("Privacy Policy")')).toBeVisible();
    await expect(page.locator('a:has-text("Terms and Conditions")')).toBeVisible();
  });

  test('TC-UI-002: Password visibility toggle', async ({ page }) => {
    const passwordInput = page.locator('input[placeholder="Enter password"]');
    const toggleButton = page.locator('button[aria-label="toggle password visibility"]');
    
    // Enter password
    await passwordInput.fill('TestPassword123');
    
    // Verify password is masked
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click toggle to show password
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Click toggle to hide password
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC-UI-003: Forgot password link', async ({ page }) => {
    const forgotPasswordLink = page.locator('a:has-text("Forgot Password?")');
    
    // Verify link is visible
    await expect(forgotPasswordLink).toBeVisible();
    
    // Click forgot password link
    await forgotPasswordLink.click();
    
    // Verify navigation to forgot password page
    await page.waitForURL('**/forgot-password');
    await expect(page).toHaveURL(/.*\/forgot-password/);
  });

  test('TC-SESSION-004: Keep me signed in checkbox', async ({ page }) => {
    const keepSignedInCheckbox = page.locator('input[type="checkbox"]').first();
    
    // Verify checkbox is present
    await expect(keepSignedInCheckbox).toBeVisible();
    
    // Check the checkbox
    await keepSignedInCheckbox.check();
    await expect(keepSignedInCheckbox).toBeChecked();
    
    // Uncheck the checkbox
    await keepSignedInCheckbox.uncheck();
    await expect(keepSignedInCheckbox).not.toBeChecked();
  });
});
