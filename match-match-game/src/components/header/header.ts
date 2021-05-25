import { BaseComponent } from '../base-component';
import { ControlField } from '../header-control-field/header-control-field';
import { HeaderNavigation } from '../header-navigation/header-navigation';
import './header.scss';

export class Header extends BaseComponent {
  private headerNavigation: HeaderNavigation;

  private controlField: ControlField;

  constructor() {
    super('header', ['header']);
    this.headerNavigation = new HeaderNavigation();
    this.controlField = new ControlField();
  }

  add(avatarSrc: string): void {
    const logo = document.createElement('div');
    logo.classList.add('logo');
    logo.innerHTML = `
    <p class="logo__top-row">match</p>
    <p class="logo__bottom-row">match</p>
  `;
    this.element.appendChild(logo);
    this.headerNavigation.create();
    this.element.appendChild(this.headerNavigation.element);
    this.controlField.create(avatarSrc);
    this.element.appendChild(this.controlField.element);
  }
}
