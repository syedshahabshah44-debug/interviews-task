class HomePage {
  constructor(page) {
    this.page = page;

    // Dropdown for Shopify (checking select, option dropdown, or fallback selectors)
    this.productDropdown = this.page.locator('select, [name="id"], .single-option-selector, [role="combobox"]').first();
    
    // Add to Cart locator (#add selector ya phir 'ADD TO CART' text/button ka fallback)
    this.addToCartButton = this.page.locator('#add')
      .or(this.page.getByRole('button', { name: /add to cart/i }))
      .or(this.page.locator('text=/add to cart/i'))
      .first();

    // Other page locators
    this.menuItem = this.page.locator("//a[normalize-space()='Platform']");
    this.acceptTab = this.page.locator("//*[@id='droppableExample-tab-accept']");
    this.dragitem = this.page.locator("//*[@id='acceptable']");
    this.dropitem = this.page.locator("//*[@id='acceptDropContainer']");
    this.draggableItem = this.page.locator("//*[@id='draggable']");
    this.simpleDropZone = this.page.locator("//div[@id='simpleDropContainer']//div[@id='droppable']");
  }

  // Action Methods
  async navigateToSauceDemo() {
    await this.page.goto('https://sauce-demo.myshopify.com/collections/frontpage/products/grey-jacket', {
      waitUntil: 'domcontentloaded'
    });
  }

  async selectOption() {
    // 1. Dropdown ya Option select karne ka logic
    const isDropdownVisible = await this.productDropdown.isVisible().catch(() => false);
    if (isDropdownVisible) {
      const tagName = await this.productDropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
      if (tagName === 'select') {
        await this.productDropdown.selectOption({ index: 0 }).catch(async () => {
          await this.productDropdown.selectOption({ label: 'Grey jacket' });
        });
      } else {
        await this.productDropdown.click();
      }
    } else {
      const optionText = this.page.locator('text="Grey jacket"').first();
      await optionText.click({ timeout: 5000 }).catch(() => {});
    }

    // 2. Add to Cart button click logic (#add pehle, warna ADD TO CART text)
    await this.addToCartButton.click({ timeout: 5000 }).catch(err => {
      console.error('Add to cart button click me masla aya:', err);
    });
  }

  async navigateToNorthflank() {
    await this.page.goto('https://northflank.com/heroku-alternative');
  }

  async hoverOnPlatformMenu() {
    await this.menuItem.hover();
  }

  async navigateToDemoQA() {
    await this.page.goto('https://demoqa.com/droppable');
  }

  async performDragAndDrop() {
    await this.acceptTab.click();
    await this.dragitem.dragTo(this.dropitem);
  }

  async performSimpleDragAndDrop() {
    await this.draggableItem.dragTo(this.simpleDropZone);
  }

  async performDragAndDropWithOffset() {
    const box = await this.simpleDropZone.boundingBox();
    if (box) {
      await this.draggableItem.dragTo(this.simpleDropZone, {
        targetPosition: { x: box.width / 2, y: box.height / 2 }
      });
    }
  }
}

// Single class default export
module.exports = HomePage;