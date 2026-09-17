class HomePage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.productDropdown = this.page.getByRole('combobox');
    this.menuItem = this.page.locator("//a[normalize-space()='Platform']");
    this.acceptTab = this.page.locator('#droppableExample-tab-accept');
    this.dragitem = this.page.locator("#acceptable");
    this.dropitem = this.page.locator("#acceptDropContainer");
  }

  // Action Methods
  async navigateToSauceDemo() {
    await this.page.goto('https://sauce-demo.myshopify.com/collections/frontpage/products/grey-jacket');
  }

  async selectOption() {
    await this.productDropdown.selectOption({ label: 'Grey jacket' });
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

  
}

// Single class default export
module.exports = HomePage;