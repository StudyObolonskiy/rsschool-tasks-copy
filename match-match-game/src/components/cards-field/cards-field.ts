import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const SHOW_TIME = 5000;

export class CardField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards.forEach((card) => {
      card.element.remove();
    });
    this.cards = [];
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => {
      this.element.appendChild(card.element);
    });
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME);
  }
}
