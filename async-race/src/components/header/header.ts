import { BaseComponent } from '../base-component';
import './header.scss';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);

    this.element.innerHTML = `
            <nav>
                <a href="#/garage">Garage</a>
                <a href="#/winners">Winners</a>
            </nav>`;
  }
}
