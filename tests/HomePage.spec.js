const { test, expect } = require('@playwright/test');
const HomePage = require('../PageObjects/HomePage'); 

test.describe('HomePage Automation Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('Step 1: Visit SauceDemo Home Screen', async () => {
    await test.step('Navigate to SauceDemo product page', async () => {
      await homePage.navigateToSauceDemo();
    });
  });

  test('Step 2: Select Option from Dropdown', async ({ page }) => {
    await homePage.navigateToSauceDemo();
    await page.waitForLoadState('domcontentloaded');
    await test.step('Select option in combobox', async () => {
      await homePage.selectOption();
    });
  });

  test('Step 3: Visit Northflank Website', async () => {
    await test.step('Navigate to Northflank website', async () => {
      await homePage.navigateToNorthflank();
    });
  });

  test('Step 4: Hover on Platform Menu', async () => {
    await homePage.navigateToNorthflank();
    await test.step('Hover on Platform navigation item', async () => {
      await homePage.hoverOnPlatformMenu();
    });
  });

  test('Step 5: Perform Accept Drag and Drop Action', async () => {
    await homePage.navigateToDemoQA();
    await test.step('Drag element to accept target container', async () => {
      await homePage.performDragAndDrop();
    });
  });

  test('Step 6: Perform Simple Drag and Drop Action', async () => {
    await homePage.navigateToDemoQA();
    await test.step('Drag simple element to target container', async () => {
      await homePage.performSimpleDragAndDrop();
    });
  });
});