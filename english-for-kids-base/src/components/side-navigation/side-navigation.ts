import { BaseComponent } from '../base-component';
import './side-navigation.scss';

export class SideNavigation extends BaseComponent {
  private readonly navigationItems: BaseComponent;

  constructor() {
    super('nav', ['side-navigation']);
    this.navigationItems = new BaseComponent('ul', ['navigation-items']);
  }

  public async createCategoryList(cb: (event: Event) => void): Promise<void> {
    const res = await fetch('./cards.json');
    const data = await res.json();
    const categories: string[] = data[0];

    categories.forEach((category, index) => {
      const listItem = new BaseComponent('li', ['navigation-item']);

      listItem.element.setAttribute('data-category', `${index}`);
      listItem.element.textContent = `${category}`;
      listItem.element.addEventListener('click', cb);
      this.navigationItems.element.append(listItem.element);
      this.element.append(this.navigationItems.element);
    });
  }
}
