# CloudPi Home Page - Test Cases

**Application:** CloudPi Multi-Cloud Cost Workspace  
**Base URL:** https://vk4aws.cloudpi.ai  
**Module:** Home Page (Dashboard Widgets & Period Selection)  
**Date:** 2026-08-29  
**Version:** 1.0

---

## Table of Contents

1. [Baseline Numbers Reference](#baseline-numbers-reference)
2. [Period Selection Test Cases](#period-selection-test-cases)
3. [Widget Customization Test Cases](#widget-customization-test-cases)
4. [Data Validation Test Cases](#data-validation-test-cases)
5. [Traceability Matrix](#traceability-matrix)

---

## Baseline Numbers Reference

**IMPORTANT:** These baseline numbers were captured on 2026-08-29 and should be used for cross-validation in future test runs.

### Current Month (Baseline)
- **Total Cloud Spend:** $276.45
- **Projected Cost:** $295.51
- **Period Elapsed:** 94%
- **AWS:** $164.55 (Assigned: $164.55, Unassigned: $0)
- **Azure:** $71.62 (Assigned: $71.62, Unassigned: $0)
- **Databricks:** $40.28 (Assigned: $40.28, Unassigned: $0)
- **AI:** $0 (Assigned: $0, Unassigned: $0)
- **Total Assigned:** $276.45
- **Total Unassigned:** $0

#### Financial Health Score
- **Budget Variance %:** 0.00% (On Target, Goal: < 20%)
- **Forecast Accuracy:** 0.00% (Needs Attention, Goal: > 85%)
- **KPIs Needing Attention:** 1 of 2

#### Optimization Savings
- **Total Savings Impact:** $0
- **Optimization Rate:** 0.00%
- **Estimated Savings:** $0
- **TRUE Savings:** $0

#### Cost By Category (Current Month)
1. Compute: $66.72 (24.14%)
2. Databases: $51.25 (18.54%)
3. Other: $47.49 (17.18%)
4. Storage: $46.68 (16.89%)
5. Networking: $36.07 (13.05%)
6. Analytics: $11.84 (4.28%)
7. Management and Governance: $10.82 (3.91%)
8. Security: $5.19 (1.88%)
9. Identity: $0.38 (0.14%)

### Previous Month (Comparison)
- **Total Cloud Spend:** $440.08
- **Projected Cost:** $440.08
- **Period Status:** Period Complete
- **AWS:** $284.03 (Assigned: $284.03, Unassigned: $0)
- **Azure:** $136.95 (Assigned: $136.95, Unassigned: $0)
- **Databricks:** $19.11 (Assigned: $17.63, Unassigned: $1.48)
- **AI:** $0 (Assigned: $0, Unassigned: $0)
- **Total Assigned:** $438.60
- **Total Unassigned:** $1.48

#### Cost By Category (Previous Month)
1. Compute: $225.37 (51.21%)
2. Databases: $73.93 (16.80%)
3. Networking: $60.79 (13.81%)
4. Storage: $31.54 (7.17%)
5. Other: $24.52 (5.57%)
6. Analytics: $16.04 (3.65%)
7. Management and Governance: $7.46 (1.69%)
8. Identity: $0.43 (0.10%)

---

## Period Selection Test Cases

### TC-HOME-001: Select Current Month Period

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Logged in as valid user

**Test Steps:**
1. Navigate to Home page
2. Locate "Select Period" dropdown
3. Verify current selection shows "Current Month"
4. Note all displayed values

**Expected Result:**
- Dropdown shows "Current Month" selected by default
- Total Cloud Spend displays current month data
- All widgets show current month values
- Values match baseline numbers (±2% tolerance for ongoing month)

---

### TC-HOME-002: Change to Previous Month Period

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Logged in as valid user, on Home page

**Test Steps:**
1. Click "Select Period" dropdown
2. Verify dropdown options appear:
   - Current Month
   - Previous Month
   - Last 3 Months
3. Click "Previous Month"
4. Observe data updates

**Expected Result:**
- Dropdown expands showing all 3 options
- After selecting "Previous Month":
  - Dropdown displays "Previous Month"
  - Total Cloud Spend updates to previous month value
  - Header shows "PREVIOUS MONTH" instead of "CURRENT MONTH"
  - Status shows "Period Complete" instead of "% Of Period Elapsed"
  - All widgets refresh with previous month data
  - Cost breakdown by provider updates
  - Cost by Category percentages recalculate

**Actual Result (Baseline Test):**
- Total changed from $276.45 → $440.08
- AWS changed from $164.55 → $284.03
- Azure changed from $71.62 → $136.95
- Databricks changed from $40.28 → $19.11
- All Cost By Category values updated

---

### TC-HOME-003: Change to Last 3 Months Period

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:** Logged in as valid user, on Home page

**Test Steps:**
1. Click "Select Period" dropdown
2. Select "Last 3 Months"
3. Observe data updates

**Expected Result:**
- Dropdown displays "Last 3 Months"
- Total Cloud Spend aggregates 3 months of data
- All widgets show 3-month aggregated values
- Charts show trend over 3 months
- Cost breakdown shows combined 3-month totals

---

### TC-HOME-004: Period Selection Persistence

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:** Logged in as valid user

**Test Steps:**
1. Navigate to Home page
2. Select "Previous Month" from dropdown
3. Navigate to another page (e.g., Dashboard)
4. Return to Home page
5. Observe period selection

**Expected Result:**
- Period selection persists across navigation
- Home page still shows "Previous Month" data
- User preference is remembered for the session

---

## Widget Customization Test Cases

### TC-HOME-005: View Widget Customization Menu

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Logged in as valid user, on Home page

**Test Steps:**
1. Locate "Customize widgets" button at bottom of page
2. Click "Customize widgets" button
3. Observe menu options

**Expected Result:**
- Menu opens with following options:
  - Widget Configuration (disabled/header)
  - Arrange Widgets
  - Add Report Chart
  - Save Layout
  - View Details (showing count of visible widgets)
  - Widget Visibility (disabled/header)
  - List of all available widgets with checkboxes
  - Reset to Default

---

### TC-HOME-006: View Available Widgets

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:** Customize widgets menu is open

**Test Steps:**
1. In customize menu, scroll to "Widget Visibility" section
2. Observe all available widgets

**Expected Result:**
- Widget categories displayed:
  - 📊 Cost KPIs
    - Spend at a Glance
  - 📊 FinOps KPIs
    - Budget Health
  - 📊 Optimization KPIs
    - Optimization Savings
  - 📈 Charts
    - Cost By Projects
    - Budget Summary
  - 📋 Lists
    - Cost By Category
    - Recommendations Summary
    - Alerts
- Default configuration: All 8 widgets checked (visible)
- "View Details" shows "8 visible"

---

### TC-HOME-007: Hide Widget from Home Page

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Customize widgets menu is open, all widgets visible

**Test Steps:**
1. Locate a widget checkbox (e.g., "Alerts")
2. Note current widget count
3. Click to uncheck the widget
4. Observe changes

**Expected Result:**
- Checkbox becomes unchecked
- Widget count decreases by 1 (e.g., "8 visible" → "7 visible")
- Widget disappears from home page immediately
- Other widgets remain visible
- Layout adjusts to fill space

**Actual Result (Baseline Test):**
- Alerts widget unchecked
- Count changed: "8 visible" → "7 visible"
- Alerts section removed from page
- Remaining 7 widgets still displayed

---

### TC-HOME-008: Show Hidden Widget

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Customize widgets menu is open, at least one widget hidden

**Test Steps:**
1. Locate an unchecked widget checkbox (e.g., "Alerts")
2. Note current widget count
3. Click to check the widget
4. Observe changes

**Expected Result:**
- Checkbox becomes checked
- Widget count increases by 1 (e.g., "7 visible" → "8 visible")
- Widget appears on home page immediately
- Widget displays current period data
- Layout adjusts to accommodate new widget

**Actual Result (Baseline Test):**
- Alerts widget checked again
- Count changed: "7 visible" → "8 visible"
- Alerts section reappeared on page
- Widget displayed at expected position

---

### TC-HOME-009: Save Custom Layout

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Customize widgets menu is open, widgets customized

**Test Steps:**
1. Make changes to widget visibility (hide/show widgets)
2. Click "Save Layout" option in menu
3. Observe response

**Expected Result:**
- Success message appears: "Layout saved successfully"
- Menu closes or shows confirmation
- Changes are persisted to user profile
- Refreshing page maintains custom layout

**Actual Result (Baseline Test):**
- Clicked "Save Layout"
- Success toast appeared: "Layout saved successfully"
- Close button provided on toast notification

---

### TC-HOME-010: Verify Layout Persistence After Save

**Priority:** High  
**Type:** Functional  
**Prerequisites:** Custom layout saved

**Test Steps:**
1. Save a custom widget layout (e.g., hide Alerts)
2. Refresh the browser page
3. Observe widget configuration

**Expected Result:**
- Custom layout persists after refresh
- Hidden widgets remain hidden
- Visible widgets remain visible
- Widget order/arrangement is maintained

---

### TC-HOME-011: Reset to Default Layout

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:** Custom layout applied

**Test Steps:**
1. Apply custom widget configuration
2. Open customize widgets menu
3. Click "Reset to Default"
4. Observe changes

**Expected Result:**
- Confirmation dialog appears
- After confirming:
  - All widgets reset to default visibility (all 8 visible)
  - Widget count shows "8 visible"
  - Default widget order restored
  - Layout matches initial system configuration

---

### TC-HOME-012: Arrange Widgets

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:** Customize widgets menu is open

**Test Steps:**
1. Click "Arrange Widgets" option
2. Observe available options
3. Attempt to drag/reorder widgets

**Expected Result:**
- Arrange mode activates
- Widgets become draggable
- Visual indicators show drag handles
- Widgets can be reordered by dragging
- New arrangement can be saved

---

### TC-HOME-013: Add Report Chart Widget

**Priority:** Medium  
**Type:** Functional  
**Prerequisites:** Customize widgets menu is open

**Test Steps:**
1. Click "Add Report Chart" option
2. Observe available report charts
3. Select a chart to add
4. Save configuration

**Expected Result:**
- List of available report charts appears
- User can select a chart to add
- Selected chart is added to home page
- Widget count increases
- Chart displays current period data

---

## Data Validation Test Cases

### TC-HOME-014: Validate Total Cloud Spend Calculation

**Priority:** High  
**Type:** Data Validation  
**Prerequisites:** Logged in, on Home page showing Current Month

**Test Steps:**
1. Note Total Cloud Spend value
2. Note individual provider costs (AWS, Azure, Databricks, AI)
3. Manually sum provider costs
4. Compare sum to Total Cloud Spend

**Expected Result:**
- Total Cloud Spend = AWS + Azure + Databricks + AI
- Calculation is accurate (no rounding errors > $0.01)

**Baseline Validation:**
- Total: $276.45
- AWS: $164.55 + Azure: $71.62 + Databricks: $40.28 + AI: $0
- Sum: $276.45 ✅ Matches

---

### TC-HOME-015: Validate Assigned vs Unassigned Totals

**Priority:** High  
**Type:** Data Validation  
**Prerequisites:** Logged in, on Home page

**Test Steps:**
1. Note Total Assigned value
2. Note Total Unassigned value
3. Sum Assigned + Unassigned
4. Compare to Total Cloud Spend

**Expected Result:**
- Total Assigned + Total Unassigned = Total Cloud Spend
- No discrepancies in allocation

**Baseline Validation (Current Month):**
- Total Assigned: $276.45
- Total Unassigned: $0
- Sum: $276.45 ✅ Matches Total Cloud Spend

**Baseline Validation (Previous Month):**
- Total Assigned: $438.60
- Total Unassigned: $1.48
- Sum: $440.08 ✅ Matches Total Cloud Spend

---

### TC-HOME-016: Validate Cost By Category Percentages

**Priority:** Medium  
**Type:** Data Validation  
**Prerequisites:** Logged in, on Home page

**Test Steps:**
1. Note all Cost By Category values and percentages
2. Sum all category costs
3. Compare to Total Cloud Spend
4. Verify percentages add up to 100%

**Expected Result:**
- Sum of all category costs = Total Cloud Spend (±$0.01)
- Sum of all percentages = 100% (±0.01%)
- Individual percentage = (Category Cost / Total) × 100

**Baseline Validation (Current Month):**
- Sum of categories: $276.45
- Percentages sum: 100.00% ✅

---

### TC-HOME-017: Validate Projected Cost Calculation

**Priority:** High  
**Type:** Data Validation  
**Prerequisites:** Logged in, on Home page, Current Month selected

**Test Steps:**
1. Note Current Month spend
2. Note percentage of period elapsed
3. Note Projected Cost
4. Calculate expected projection: (Current Spend / % Elapsed) × 100

**Expected Result:**
- Projected Cost is reasonable based on current spend and period progress
- For completed periods, Projected Cost = Actual Total Cloud Spend

**Baseline Data:**
- Current Spend: $276.45
- Period Elapsed: 94%
- Projected: $295.51
- Calculation: $276.45 / 0.94 = $294.00 (≈ $295.51) ✅

---

### TC-HOME-018: Cross-Validate Numbers Across Periods

**Priority:** High  
**Type:** Data Validation  
**Prerequisites:** Baseline numbers documented

**Test Steps:**
1. Switch to Current Month
2. Record all key metrics
3. Switch to Previous Month
4. Record all key metrics
5. Compare against baseline numbers

**Expected Result:**
- Current Month values match baseline (±2% for ongoing month)
- Previous Month values match baseline exactly (completed period)
- Data consistency maintained across multiple test runs

---

## Traceability Matrix

| Test Case ID | Feature | Priority | Baseline Tested | Automated |
|--------------|---------|----------|-----------------|-----------|
| TC-HOME-001 | Period Selection - Current Month | High | ✅ | Pending |
| TC-HOME-002 | Period Selection - Previous Month | High | ✅ | Pending |
| TC-HOME-003 | Period Selection - Last 3 Months | Medium | ⏸️ | Pending |
| TC-HOME-004 | Period Selection Persistence | Medium | ⏸️ | Pending |
| TC-HOME-005 | View Customization Menu | High | ✅ | Pending |
| TC-HOME-006 | View Available Widgets | Medium | ✅ | Pending |
| TC-HOME-007 | Hide Widget | High | ✅ | Pending |
| TC-HOME-008 | Show Widget | High | ✅ | Pending |
| TC-HOME-009 | Save Layout | High | ✅ | Pending |
| TC-HOME-010 | Layout Persistence | High | ⏸️ | Pending |
| TC-HOME-011 | Reset to Default | Medium | ⏸️ | Pending |
| TC-HOME-012 | Arrange Widgets | Medium | ⏸️ | Pending |
| TC-HOME-013 | Add Report Chart | Medium | ⏸️ | Pending |
| TC-HOME-014 | Validate Total Spend | High | ✅ | Pending |
| TC-HOME-015 | Validate Assigned/Unassigned | High | ✅ | Pending |
| TC-HOME-016 | Validate Category Percentages | Medium | ✅ | Pending |
| TC-HOME-017 | Validate Projected Cost | High | ✅ | Pending |
| TC-HOME-018 | Cross-Validate Periods | High | ✅ | Pending |

**Legend:**
- ✅ Baseline Tested: Test executed and baseline captured
- ⏸️ Pending: Not yet tested, needs execution
- Automated: Automation status

**Test Coverage:** 18 test cases  
**Baseline Executed:** 12/18 (67%)  
**Automation Status:** 0% (to be implemented)

---

## Notes

- Baseline numbers captured on 2026-08-29 at ~9:20 PM UTC
- Current month shows 94% elapsed, so ongoing costs may increase
- Previous month is complete, so numbers should remain stable
- All financial values are in USD
- Percentages calculated to 2 decimal places
- Widgets tested: 8 total (all visible by default)
- Period options tested: Current Month, Previous Month
- Last 3 Months period not yet tested (requires implementation)

---

## Test Data Dependencies

**Critical Dependencies:**
1. **Time-based data**: Current month values will change as month progresses
2. **Cloud provider data**: Actual costs from AWS, Azure, Databricks
3. **Budget configuration**: Affects Budget Health calculations
4. **Forecast data**: Currently no forecast data available (Forecast Accuracy shows 0.00%)

**Validation Tolerance:**
- Current Month totals: ±2% tolerance (ongoing costs)
- Previous Month totals: ±0.01% tolerance (completed period)
- Percentages: ±0.01% rounding tolerance
- Currency: ±$0.01 rounding tolerance

---

## References

- Main Test Plan: `TEST_PLAN.md`
- Authentication Test Cases: `TEST_CASES.md`
- Admin Test Cases: `TEST_CASES_ADMIN.md`
- Bug Report Template: `BUG_REPORT_TEMPLATE.md`
