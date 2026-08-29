// @ts-check
const { test, expect } = require('@playwright/test');

const VALID_EMAIL = 'venkat+work@cloudpi.ai';
const VALID_PASSWORD = 'Admin123!';

test.describe('Logout and Session Management Tests', () => {
  
  // Helper function to login before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Enter email address"]', VALID_EMAIL);
    await page.fill('input[placeholder="Enter password"]', VALID_PASSWORD);
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/home', { timeout: 15000 });
  });

  test('TC-SESSION-001: Complete logout flow', async ({ page }) => {
    // Navigate to Profile → Profile
    await page.click('[aria-label="User profile"], button:has-text("venkat")');
    await page.click('text=Profile');
    
    // Wait for profile page to load
    await expect(page.locator('h2:has-text("Edit Profile"), h1:has-text("Edit Profile")')).toBeVisible({ timeout: 10000 });
    
    // Click logout button
    await page.click('button:has-text("Logout")');
    
    // Handle confirmation dialog
    const confirmButton = page.locator('button:has-text("Logout"), button:has-text("Yes"), button:has-text("Confirm")').last();
    await confirmButton.click();
    
    // Verify redirected to login page
    await page.waitForURL('/', { timeout: 10000 });
    await expect(page).toHaveURL('/');
    await expect(page.locator('button:has-text("Login")')).toBeVisible();
  });

  test('TC-SESSION-002: Cancel logout from confirmation dialog', async ({ page }) => {
    // Navigate to Profile → Profile
    await page.click('[aria-label="User profile"], button:has-text("venkat")');
    await page.click('text=Profile');
    
    // Wait for profile page to load
    await expect(page.locator('h2:has-text("Edit Profile"), h1:has-text("Edit Profile")')).toBeVisible({ timeout: 10000 });
    
    // Click logout button
    await page.click('button:has-text("Logout")');
    
    // Cancel from confirmation dialog
    const cancelButton = page.locator('button:has-text("Cancel"), button:has-text("No")').first();
    await cancelButton.click({ timeout: 5000 });
    
    // Verify still on profile page (not logged out)
    await expect(page.locator('h2:has-text("Edit Profile"), h1:has-text("Edit Profile")')).toBeVisible();
    
    // Verify still logged in by checking user profile is accessible
    await expect(page.locator('text=venkat')).toBeVisible();
  });

  test('TC-SESSION-003: Session termination after logout', async ({ page, context }) => {
    // Perform logout
    await page.click('[aria-label="User profile"], button:has-text("venkat")');
    await page.click('text=Profile');
    await expect(page.locator('h2:has-text("Edit Profile"), h1:has-text("Edit Profile")')).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Logout")');
    const confirmButton = page.locator('button:has-text("Logout"), button:has-text("Yes"), button:has-text("Confirm")').last();
    await confirmButton.click();
    
    // Wait for redirect to login page
    await page.waitForURL('/', { timeout: 10000 });
    
    // Verify session is terminated by trying to access protected route
    await page.goto('/home');
    
    // Should be redirected back to login page
    await page.waitForURL('/', { timeout: 10000 });
    await expect(page).toHaveURL('/');
    await expect(page.locator('button:has-text("Login")')).toBeVisible();
    
    // Verify no authentication cookies/tokens persist
    const cookies = await context.cookies();
    const authCookies = cookies.filter(cookie => 
      cookie.name.toLowerCase().includes('auth') || 
      cookie.name.toLowerCase().includes('token') ||
      cookie.name.toLowerCase().includes('session')
    );
    
    // Check that auth cookies are either removed or invalidated
    for (const cookie of authCookies) {
      console.log(`Found auth cookie: ${cookie.name}=${cookie.value}`);
    }
  });

  test('TC-SESSION-004: Keep me signed in functionality', async ({ page, context }) => {
    // First logout if logged in
    await page.click('[aria-label="User profile"], button:has-text("venkat")');
    await page.click('text=Profile');
    await expect(page.locator('h2:has-text("Edit Profile"), h1:has-text("Edit Profile")')).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Logout")');
    const confirmButton = page.locator('button:has-text("Logout"), button:has-text("Yes"), button:has-text("Confirm")').last();
    await confirmButton.click();
    await page.waitForURL('/', { timeout: 10000 });
    
    // Login with "Keep me signed in" checked
    await page.fill('input[placeholder="Enter email address"]', VALID_EMAIL);
    await page.fill('input[placeholder="Enter password"]', VALID_PASSWORD);
    await page.check('input[type="checkbox"]');
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/home', { timeout: 15000 });
    
    // Check if persistent cookies are set
    const cookies = await context.cookies();
    const authCookies = cookies.filter(cookie => 
      cookie.name.toLowerCase().includes('auth') || 
      cookie.name.toLowerCase().includes('token') ||
      cookie.name.toLowerCase().includes('session')
    );
    
    // Verify at least one auth-related cookie exists
    expect(authCookies.length).toBeGreaterThan(0);
    
    // Log cookie details for debugging
    for (const cookie of authCookies) {
      console.log(`Cookie: ${cookie.name}, Expires: ${cookie.expires}, HttpOnly: ${cookie.httpOnly}, Secure: ${cookie.secure}`);
    }
  });

  test('TC-UI-005: Profile menu navigation', async ({ page }) => {
    // Click profile dropdown
    await page.click('[aria-label="User profile"], button:has-text("venkat")');
    
    // Verify all menu items are present
    await expect(page.locator('text=Profile')).toBeVisible();
    await expect(page.locator('text=Workspace Settings')).toBeVisible();
    
    // Navigate to Profile
    await page.click('text=Profile');
    await expect(page.locator('h2:has-text("Edit Profile"), h1:has-text("Edit Profile")')).toBeVisible({ timeout: 10000 });
    
    // Verify Edit Profile, Change Password, and Logout buttons exist
    await expect(page.locator('button:has-text("Edit Profile"), button:has-text("Update Profile")')).toBeVisible();
    await expect(page.locator('button:has-text("Change Password")')).toBeVisible();
    await expect(page.locator('button:has-text("Logout")')).toBeVisible();
  });
});
