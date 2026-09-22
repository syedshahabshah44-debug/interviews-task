class HomePage {
  constructor(page) {
    this.page = page;

    this.productSelector = this.page.locator('select, [name="id"], .single-option-selector, [role="combobox"]').first();
    this.addToCartButton = this.page
      .locator('#add')
      .or(this.page.getByRole('button', { name: /add to cart/i }))
      .or(this.page.locator('text=/add to cart/i'))
      .first();

    this.platformMenuItem = this.page.locator("//a[normalize-space()='Platform']");
    this.acceptTab = this.page.locator('#droppableExample-tab-accept');
    this.acceptableItem = this.page.locator('#acceptable');
    this.acceptDropTarget = this.page.locator('#acceptDropContainer');
    this.draggableItem = this.page.locator('#draggable');
    this.simpleDropZone = this.page.locator("//div[@id='simpleDropContainer']//div[@id='droppable']");
  }

  async openSauceDemoProductPage() {
    await this.page.goto('https://sauce-demo.myshopify.com/collections/frontpage/products/grey-jacket', {
      waitUntil: 'domcontentloaded',
    });
  }

  async selectGreyJacketAndAddToCart() {
    const dropdownVisible = await this.productSelector.isVisible().catch(() => false);

    if (dropdownVisible) {
      const tagName = await this.productSelector.evaluate(el => el.tagName.toLowerCase()).catch(() => '');

      if (tagName === 'select') {
        await this.productSelector.selectOption({ index: 0 }).catch(async () => {
          await this.productSelector.selectOption({ label: 'Grey jacket' }).catch(() => {});
        });
      } else {
        await this.productSelector.click();
      }
    } else {
      const greyJacketOption = this.page.locator('text="Grey jacket"').first();
      await greyJacketOption.click({ timeout: 5000 }).catch(() => {});
    }

    await this.addToCartButton.click({ timeout: 5000 }).catch(error => {
      console.warn('Unable to click the Add to Cart button:', error.message);
    });
  }

  async openNorthflankSite() {
    await this.page.goto('https://northflank.com/heroku-alternative');
  }

  async hoverPlatformMenu() {
    await this.platformMenuItem.hover();
  }

  async openDroppablePage() {
    await this.page.goto('https://demoqa.com/droppable');
  }

  async dragToAcceptDropZone() {
    await this.acceptTab.click();
    await this.acceptableItem.dragTo(this.acceptDropTarget);
  }

  async dragSimpleItemToDropZone() {
    await this.draggableItem.dragTo(this.simpleDropZone);
  }
}

module.exports = HomePage;