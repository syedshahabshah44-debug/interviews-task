class HomePage {
  constructor(page) {
    this.page = page;
 this.productDropdown = this.page.locator("//*[@role='combobox']");
this.menuItem = this.page.locator("//a[normalize-space()='Platform']");
this.acceptTab = this.page.locator("//*[@id='droppableExample-tab-accept']");
this.dragitem = this.page.locator("//*[@id='acceptable']");
this.dropitem = this.page.locator("//*[@id='acceptDropContainer']");
this.draggableItem = this.page.locator("//*[@id='draggable']");
this.simpleDropZone = this.page.locator("//div[@id='simpleDropContainer']//div[@id='droppable']");
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
 async navigateToDemoQA() {
    await this.page.goto('https://demoqa.com/droppable');
  }
  async performSimpleDragAndDrop() {
    await this.draggableItem.dragTo(this.simpleDropZone);
  }

  async performDragAndDropWithOffset() {
    const box = await this.simpleDropZone.boundingBox();
}
}
// Single class default export
module.exports = HomePage;