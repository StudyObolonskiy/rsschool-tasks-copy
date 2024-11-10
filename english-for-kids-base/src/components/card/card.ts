import { BaseComponent } from '../base-component';
import './card.scss';

export class Card extends BaseComponent {
  private readonly card: BaseComponent;

  private readonly cardFront: BaseComponent;

  private readonly cardBack: BaseComponent;

  private readonly flipBtn: BaseComponent;

  constructor() {
    super('div', ['card-container']);
    this.card = new BaseComponent('div', ['card']);
    this.cardFront = new BaseComponent('div', ['card__front']);
    this.cardBack = new BaseComponent('div', ['card__back']);
    this.flipBtn = new BaseComponent('div', ['flip-btn']);
  }

  public renderCard(imageSource: string, word: string, translate: string): void {
    const frontDescription = new BaseComponent('div', ['description']);
    const backDescription = new BaseComponent('div', ['description']);

    this.cardFront.element.style.backgroundImage = `url(${imageSource})`;
    this.cardBack.element.style.backgroundImage = `url(${imageSource})`;
    frontDescription.element.textContent = `${word}`;
    backDescription.element.textContent = `${translate}`;
    this.flipBtn.element.addEventListener('click', (event: Event) => {
      this.turnCardBack();
      event.stopPropagation();
    });
    this.card.element.addEventListener('mouseleave', () => {
      this.turnCardFront();
    });
    this.cardFront.element.append(frontDescription.element);
    this.cardBack.element.append(backDescription.element);
    this.card.element.append(this.cardFront.element, this.cardBack.element, this.flipBtn.element);
    this.element.append(this.card.element);
  }

  public cardOnclick(cb: () => void): void {
    this.card.element.addEventListener('click', cb);
  }

  private turnCardBack(): void {
    this.card.element.classList.toggle('turn');
  }

  private turnCardFront(): void {
    if (this.card.element.classList.contains('turn')) {
      this.card.element.classList.remove('turn');
    }
  }
}
