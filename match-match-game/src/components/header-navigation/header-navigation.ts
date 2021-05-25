import { BaseComponent } from '../base-component';
import './header-navigation.scss';

export class HeaderNavigation extends BaseComponent {
  constructor() {
    super('nav', ['header__navigation']);
  }

  create(): void {
    const navigationItems = document.createElement('ul');
    const navigationItemAbout = document.createElement('li');
    const navigationItemBest = document.createElement('li');
    const navigationItemSetting = document.createElement('li');
    navigationItems.classList.add('navigation-items');
    navigationItemAbout.classList.add('navigation-item', 'active', 'about');
    navigationItemAbout.innerHTML = `
      <a href="#about">
      <div class="navigation-item__icon about-game-icon"></div>
      <p class="navigation-item__notation">About Game</p>
      </a>
    `;
    navigationItemBest.classList.add('navigation-item', 'score');
    navigationItemBest.innerHTML = `
      <a href="#game">
      <div class="navigation-item__icon best-score-icon"></div>
      <p class="navigation-item__notation">Best Score</p>
      </a>
    `;
    navigationItemSetting.classList.add('navigation-item', 'settings');
    navigationItemSetting.innerHTML = `
      <a href="#settings">
      <div class="navigation-item__icon game-setting-icon"></div>
      <p class="navigation-item__notation">Game Setting</p>
      </a>
    `;
    navigationItems.appendChild(navigationItemAbout);
    navigationItems.appendChild(navigationItemBest);
    navigationItems.appendChild(navigationItemSetting);
    this.element.appendChild(navigationItems);
  }
}
