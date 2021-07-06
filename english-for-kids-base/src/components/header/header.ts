import { BaseComponent } from '../base-component';
import { BurgerButton } from '../burger-button/burger-button';
import { SwitchButton } from '../switch-button/switch-button';
import './header.scss';

export class Header extends BaseComponent {
  public burgerButton: BurgerButton;

  public switchButton: SwitchButton;

  constructor() {
    super('header', ['header']);
    this.burgerButton = new BurgerButton();
    this.switchButton = new SwitchButton();
    this.element.append(this.burgerButton.element, this.switchButton.element);
  }
}
