// @ts-check
const { test, expect } = require('@playwright/test');

const VALID_EMAIL = 'venkat+work@cloudpi.ai';
const VALID_PASSWORD = 'Admin123!';

// Baseline numbers for validation (captured 2026-08-29)
const BASELINE_CURRENT_MONTH = {
  totalSpend: 276.45,
  aws: 164.55,
  azure: 71.62,
  databricks: 40.28,
  ai: 0,
  tolerance: 0.02 // 2% tolerance for ongoing month
};

const BASELINE_PREVIOUS_MONTH = {
  totalSpend: 440.08,
  aws: 284.03,
  azure: 136.95,
  databricks: 19.11,
  ai: 0,
  tolerance: 0.001 // 0.1% tolerance for completed month
};

test.describe('Home Page - Period Selection Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Enter email address"]', VALID_EMAIL);
    await page.fill('input[placeholder="Enter password"]', VALID_PASSWORD);
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/home', { timeout: 15000 });
  });

  test('TC-HOME-001: Current Month is selected by default', async ({ page }) => {
    // Wait for home page to load
    await expect(page.locator('text=Good evening')).toBeVisible({ timeout: 10000 });
    
    // Verify dropdown shows Current Month
    const periodDropdown = page.locator('text=Select Period').locator('..').locator('[role="combobox"]');
    await expect(periodDropdown).toHaveValue('Current Month');
    
    // Verify header shows CURRENT MONTH
    await expect(page.locator('text=CURRENT MONTH')).toBeVisible();
    
    // Verify Total Cloud Spend is displayed
    await expect(page.locator('text=TOTAL CLOUD SPEND')).toBeVisible();
  });

  test('TC-HOME-002: Change to Previous Month updates data', async ({ page }) => {
    // Wait for page load
    await expect(page.locator('text=CURRENT MONTH')).toBeVisible({ timeout: 10000 });
    
    // Click period dropdown
    await page.click('text=Select Period');
    
    // Verify dropdown options
    await expect(page.locator('text=Current Month').first()).toBeVisible();
    await expect(page.locator('text=Previous Month').first()).toBeVisible();
    await expect(page.locator('text=Last 3 Months').first()).toBeVisible();
    
    // Select Previous Month
    await page.locator('[role="option"]:has-text("Previous Month")').click();
    
    // Verify header changed
    await expect(page.locator('text=PREVIOUS MONTH')).toBeVisible({ timeout: 5000 });
    
    // Verify period status changed to "Period Complete"
    await expect(page.locator('text=Period Complete')).toBeVisible();
    
    // Verify total spend changed (should be different from current month)
    const totalSpendText = await page.locator('text=TOTAL CLOUD SPEND').locator('..').locator('heading').filter({ hasText: /^\$/ }).textContent();
    expect(totalSpendText).toBeTruthy();
  });

  test('TC-HOME-002: Validate Previous Month baseline numbers', async ({ page }) => {
    // Wait for page load
    await expect(page.locator('text=CURRENT MONTH')).toBeVisible({ timeout: 10000 });
    
    // Switch to Previous Month
    await page.click('text=Select Period');
    await page.locator('[role="option"]:has-text("Previous Month")').click();
    await expect(page.locator('text=PREVIOUS MONTH')).toBeVisible({ timeout: 5000 });
    
    // Extract total spend
    const totalSpendText = await page.locator('text=TOTAL CLOUD SPEND').locator('..').locator('heading').filter({ hasText: /^\$/ }).textContent();
    const totalSpend = parseFloat(totalSpendText.replace('$', '').replace(',', ''));
    
    // Validate against baseline (completed month should be exact)
    const expectedMin = BASELINE_PREVIOUS_MONTH.totalSpend * (1 - BASELINE_PREVIOUS_MONTH.tolerance);
    const expectedMax = BASELINE_PREVIOUS_MONTH.totalSpend * (1 + BASELINE_PREVIOUS_MONTH.tolerance);
    
    expect(totalSpend).toBeGreaterThanOrEqual(expectedMin);
    expect(totalSpend).toBeLessThanOrEqual(expectedMax);
    
    console.log(`Previous Month Total Spend: $${totalSpend} (Baseline: $${BASELINE_PREVIOUS_MONTH.totalSpend})`);
  });

  test('TC-HOME-004: Period selection persists across navigation', async ({ page }) => {
    // Switch to Previous Month
    await page.click('text=Select Period');
    await page.locator('[role="option"]:has-text("Previous Month")').click();
    await expect(page.locator('text=PREVIOUS MONTH')).toBeVisible();
    
    // Navigate to Dashboard
    await page.click('text=Dashboard');
    await page.waitForURL('**/dashboard', { timeout: 5000 });
    
    // Navigate back to Home
    await page.click('text=Home');
    await page.waitForURL('**/home', { timeout: 5000 });
    
    // Verify Previous Month is still selected
    await expect(page.locator('text=PREVIOUS MONTH')).toBeVisible({ timeout: 5000 });
    
    const periodDropdown = page.locator('text=Select Period').locator('..').locator('[role="combobox"]');
    await expect(periodDropdown).toHaveValue('Previous Month');
  });
});

test.describe('Home Page - Widget Customization Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Enter email address"]', VALID_EMAIL);
    await page.fill('input[placeholder="Enter password"]', VALID_PASSWORD);
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/home', { timeout: 15000 });
    await expect(page.locator('text=Good evening')).toBeVisible({ timeout: 10000 });
  });

  test('TC-HOME-005: Open widget customization menu', async ({ page }) => {
    // Click Customize widgets button
    await page.click('button:has-text("Customize widgets")');
    
    // Verify menu options appear
    await expect(page.locator('text=Arrange Widgets')).toBeVisible();
    await expect(page.locator('text=Add Report Chart')).toBeVisible();
    await expect(page.locator('text=Save Layout')).toBeVisible();
    await expect(page.locator('text=Widget Visibility')).toBeVisible();
    await expect(page.locator('text=Reset to Default')).toBeVisible();
  });

  test('TC-HOME-006: Verify all widgets are visible by default', async ({ page }) => {
    // Click Customize widgets button
    await page.click('button:has-text("Customize widgets")');
    
    // Wait for menu
    await expect(page.locator('text=Widget Visibility')).toBeVisible();
    
    // Verify widget count shows 8 visible
    await expect(page.locator('text=8 visible')).toBeVisible();
    
    // Verify all default widgets are checked
    await expect(page.locator('input[type="checkbox"][aria-label="Spend at a Glance"]')).toBeChecked();
    await expect(page.locator('input[type="checkbox"][aria-label="Budget Health"]')).toBeChecked();
    await expect(page.locator('input[type="checkbox"][aria-label="Optimization Savings"]')).toBeChecked();
    await expect(page.locator('input[type="checkbox"][aria-label="Cost By Projects"]')).toBeChecked();
    await expect(page.locator('input[type="checkbox"][aria-label="Budget Summary"]')).toBeChecked();
    await expect(page.locator('input[type="checkbox"][aria-label="Cost By Category"]')).toBeChecked();
    await expect(page.locator('input[type="checkbox"][aria-label="Recommendations Summary"]')).toBeChecked();
    await expect(page.locator('input[type="checkbox"][aria-label="Alerts"]')).toBeChecked();
  });

  test('TC-HOME-007: Hide a widget from home page', async ({ page }) => {
    // Verify Alerts widget is visible
    await expect(page.locator('text=Alerts').first()).toBeVisible();
    
    // Open customization menu
    await page.click('button:has-text("Customize widgets")');
    await expect(page.locator('text=8 visible')).toBeVisible();
    
    // Uncheck Alerts widget
    await page.locator('input[type="checkbox"][aria-label="Alerts"]').uncheck();
    
    // Verify count decreased
    await expect(page.locator('text=7 visible')).toBeVisible({ timeout: 2000 });
    
    // Close menu (click outside or press Escape)
    await page.keyboard.press('Escape');
    
    // Verify Alerts widget is no longer visible on the page
    // Note: There might still be text "Alerts" in the menu, so we need to be specific
    const alertsWidgetCount = await page.locator('main >> text=Alerts').count();
    expect(alertsWidgetCount).toBe(0);
  });

  test('TC-HOME-008: Show a hidden widget', async ({ page }) => {
    // Hide Alerts widget first
    await page.click('button:has-text("Customize widgets")');
    await page.locator('input[type="checkbox"][aria-label="Alerts"]').uncheck();
    await expect(page.locator('text=7 visible')).toBeVisible();
    await page.keyboard.press('Escape');
    
    // Verify Alerts is hidden
    let alertsCount = await page.locator('main >> text=Alerts').count();
    expect(alertsCount).toBe(0);
    
    // Open menu again and re-enable Alerts
    await page.click('button:has-text("Customize widgets")');
    await page.locator('input[type="checkbox"][aria-label="Alerts"]').check();
    
    // Verify count increased back to 8
    await expect(page.locator('text=8 visible')).toBeVisible({ timeout: 2000 });
    
    await page.keyboard.press('Escape');
    
    // Verify Alerts widget is now visible again
    await expect(page.locator('main >> text=Alerts')).toBeVisible({ timeout: 2000 });
  });

  test('TC-HOME-009: Save custom layout', async ({ page }) => {
    // Customize layout (hide a widget)
    await page.click('button:has-text("Customize widgets")');
    await page.locator('input[type="checkbox"][aria-label="Alerts"]').uncheck();
    await expect(page.locator('text=7 visible')).toBeVisible();
    
    // Click Save Layout
    await page.click('text=Save Layout');
    
    // Verify success message
    await expect(page.locator('text=Layout saved successfully')).toBeVisible({ timeout: 5000 });
  });

  test('TC-HOME-010: Verify layout persistence after save', async ({ page }) => {
    // Customize and save layout
    await page.click('button:has-text("Customize widgets")');
    await page.locator('input[type="checkbox"][aria-label="Budget Summary"]').uncheck();
    await expect(page.locator('text=7 visible')).toBeVisible();
    await page.click('text=Save Layout');
    await expect(page.locator('text=Layout saved successfully')).toBeVisible({ timeout: 5000 });
    
    // Refresh the page
    await page.reload();
    await expect(page.locator('text=Good evening')).toBeVisible({ timeout: 10000 });
    
    // Verify Budget Summary is still hidden
    const budgetSummaryCount = await page.locator('main >> text=Budget Summary').count();
    expect(budgetSummaryCount).toBe(0);
    
    // Open menu to verify widget count
    await page.click('button:has-text("Customize widgets")');
    await expect(page.locator('text=7 visible')).toBeVisible();
    
    // Restore default layout for cleanup
    await page.locator('input[type="checkbox"][aria-label="Budget Summary"]').check();
    await page.click('text=Save Layout');
    await expect(page.locator('text=Layout saved successfully')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Home Page - Data Validation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Enter email address"]', VALID_EMAIL);
    await page.fill('input[placeholder="Enter password"]', VALID_PASSWORD);
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/home', { timeout: 15000 });
    await expect(page.locator('text=Good evening')).toBeVisible({ timeout: 10000 });
  });

  test('TC-HOME-014: Validate Total Cloud Spend equals sum of providers', async ({ page }) => {
    // Wait for data to load
    await expect(page.locator('text=TOTAL CLOUD SPEND')).toBeVisible();
    
    // Extract Total Cloud Spend
    const totalText = await page.locator('text=TOTAL CLOUD SPEND').locator('..').locator('heading').filter({ hasText: /^\$/ }).textContent();
    const total = parseFloat(totalText.replace('$', '').replace(',', ''));
    
    // Extract provider costs - using the "Spend at a Glance" section
    const awsText = await page.locator('text=AWS').locator('..').locator('heading').filter({ hasText: /^\$/ }).first().textContent();
    const azureText = await page.locator('text=Azure').locator('..').locator('heading').filter({ hasText: /^\$/ }).first().textContent();
    const databricksText = await page.locator('text=Databricks').locator('..').locator('heading').filter({ hasText: /^\$/ }).first().textContent();
    const aiText = await page.locator('text=AI').locator('..').locator('heading').filter({ hasText: /^\$/ }).first().textContent();
    
    const aws = parseFloat(awsText.replace('$', '').replace(',', ''));
    const azure = parseFloat(azureText.replace('$', '').replace(',', ''));
    const databricks = parseFloat(databricksText.replace('$', '').replace(',', ''));
    const ai = parseFloat(aiText.replace('$', '').replace(',', ''));
    
    const sum = aws + azure + databricks + ai;
    
    // Validate sum equals total (within $0.01 rounding tolerance)
    expect(Math.abs(total - sum)).toBeLessThan(0.01);
    
    console.log(`Total: $${total}, Sum: $${sum}, AWS: $${aws}, Azure: $${azure}, Databricks: $${databricks}, AI: $${ai}`);
  });

  test('TC-HOME-015: Validate Assigned + Unassigned equals Total', async ({ page }) => {
    // Wait for Spend at a Glance widget
    await expect(page.locator('text=Spend at a Glance')).toBeVisible();
    
    // Extract Total Cloud Spend
    const totalText = await page.locator('text=Total Cloud Spend').locator('..').locator('heading').filter({ hasText: /^\$/ }).textContent();
    const total = parseFloat(totalText.replace('$', '').replace(',', ''));
    
    // Extract Total Assigned and Total Unassigned
    const assignedText = await page.locator('text=Total Assigned').locator('..').textContent();
    const unassignedText = await page.locator('text=Total Unassigned').locator('..').textContent();
    
    const assignedMatch = assignedText.match(/\$([\d,]+\.?\d*)/);
    const unassignedMatch = unassignedText.match(/\$([\d,]+\.?\d*)/);
    
    const assigned = parseFloat(assignedMatch[1].replace(',', ''));
    const unassigned = parseFloat(unassignedMatch[1].replace(',', ''));
    
    const sum = assigned + unassigned;
    
    // Validate sum equals total (within $0.01 rounding tolerance)
    expect(Math.abs(total - sum)).toBeLessThan(0.01);
    
    console.log(`Total: $${total}, Assigned: $${assigned}, Unassigned: $${unassigned}, Sum: $${sum}`);
  });
});
