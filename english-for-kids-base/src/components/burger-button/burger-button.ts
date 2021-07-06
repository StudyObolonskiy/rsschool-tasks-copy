import { BaseComponent } from '../base-component';
import './burger-button.scss';

export class BurgerButton extends BaseComponent {
  constructor() {
    super('div', ['burger-btn']);
    this.element.innerHTML = `
      <div class="top-line line"></div>
      <div class="middle-line line"></div>
      <div class="bottom-line line"></div>
    `;
  }

  public onClick(cb: () => void): void {
    this.element.addEventListener('click', cb);
  }
}
