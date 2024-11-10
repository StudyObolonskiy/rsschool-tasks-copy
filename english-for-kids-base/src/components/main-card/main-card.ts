import { BaseComponent } from '../base-component';
import './main-card.scss';

export class MainCard extends BaseComponent {
  constructor() {
    super('div', ['main-card']);
  }

  public renderCard(imageSrc: string, title: string): void {
    this.element.innerHTML = `
      <div class="main-card__image">
        <img src="${imageSrc}" alt="${title}">
      </div>
      <p>${title}</p>
    `;
  }

  public onClick(cb: () => void): void {
    this.element.addEventListener('click', cb);
  }
}
