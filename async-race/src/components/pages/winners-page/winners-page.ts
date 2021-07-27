import { BaseComponent } from '../../base-component';

export class WinnersPage extends BaseComponent {
  constructor() {
    super('div', ['winners']);
    this.element.innerHTML = '<h1>Winners PAGE</h1>';
  }
}
