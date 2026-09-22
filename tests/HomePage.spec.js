const { test, expect } = require('@playwright/test');
const HomePage = require('../PageObjects/HomePage');

test.describe('User-friendly automation checks', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('User can open the Grey Jacket product page', async ({ page }) => {
    await test.step('Open SauceDemo product page', async () => {
      await homePage.openSauceDemoProductPage();
    });

    await expect(page).toHaveURL(/grey-jacket/i);
  });

  test('User can choose a size/variant and add the item to cart', async ({ page }) => {
    await homePage.openSauceDemoProductPage();

    await test.step('Select the product option and add it to cart', async () => {
      await homePage.selectGreyJacketAndAddToCart();
    });

    await expect(page).toHaveURL(/grey-jacket/i);
  });

  test('User can open Northflank and hover the Platform menu', async ({ page }) => {
    await homePage.openNorthflankSite();

    await test.step('Hover over the Platform menu item', async () => {
      await homePage.hoverPlatformMenu();
    });

    await expect(page).toHaveURL(/northflank/i);
  });

  test('User can open the DemoQA droppable page and complete accept drag and drop', async ({ page }) => {
    await homePage.openDroppablePage();

    await test.step('Drag the item into the accept target', async () => {
      await homePage.dragToAcceptDropZone();
    });

    await expect(page).toHaveURL(/droppable/i);
  });

  test('User can open the DemoQA droppable page and complete simple drag and drop', async ({ page }) => {
    await homePage.openDroppablePage();

    await test.step('Move the draggable item onto the drop zone', async () => {
      await homePage.dragSimpleItemToDropZone();
    });

    await expect(page).toHaveURL(/droppable/i);
  });
});