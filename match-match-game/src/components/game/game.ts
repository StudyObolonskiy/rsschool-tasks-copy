import './game-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardField } from '../cards-field/cards-field';
import { delay } from '../../shared/delay';

const FLIP_DELAY = 3000;

const START_GAME_DELAY = 5000;

let timeoutId: null | number = null;

export class Game extends BaseComponent {
  private readonly cardsField: CardField;

  private timerField: BaseComponent;

  private stopGame: BaseComponent;

  private cangratulationWrapper: BaseComponent;

  private activeCard?: Card;

  private isAnimation = false;

  public gameRun = true;

  private gameTime = 0;

  private numberMatchingCards = 0;

  constructor() {
    super('main', ['game']);
    this.cardsField = new CardField();
    this.timerField = new BaseComponent('div', ['timer-field']);
    this.stopGame = new BaseComponent('div', ['stop-game']);
    this.cangratulationWrapper = new BaseComponent('div', ['cangratulation-wrapper']);
    this.element.appendChild(this.timerField.element);
    this.element.appendChild(this.cardsField.element);
  }

  private createTimer(): void {
    this.stopTimer();
    this.stopGame.element.remove();
    this.gameTime = 0;
    this.timerField.element.textContent = 'Minutes: 0 seconds: 0';
    setTimeout(() => {
      this.startTimer();
    }, START_GAME_DELAY);
  }

  private startTimer(): void {
    this.stopGame.element.innerHTML = '';
    this.stopGame.element.remove();
    if (timeoutId) {
      return;
    }
    const run = () => {
      const seconds = this.gameTime % 60;
      const minutes = (this.gameTime / 60) % 60;
      const strTimer = `Minutes: ${Math.trunc(minutes)} seconds: ${seconds}`;

      this.timerField.element.textContent = strTimer;
      ++this.gameTime;
      timeoutId = window.setTimeout(run, 1000);
    };
    run();
  }

  private stopTimer(): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      const cangratulation = document.createElement('div');
      const cangratulationNotation = document.createElement('p');
      const cangratulationLink = document.createElement('a');
      cangratulation.classList.add('cangratulation');
      cangratulationNotation.textContent = `Congratulations! You successfully found all matches on ${
        (this.gameTime / 60) % 60
      } minutes.`;
      cangratulationLink.textContent = 'Go to score';
      cangratulationLink.setAttribute('href', '#about');
      cangratulation.append(cangratulationNotation, cangratulationLink);
      this.cangratulationWrapper.element.appendChild(cangratulation);
      this.element.appendChild(this.cangratulationWrapper.element);
      this.gameRun = false;
    }
  }

  public newGame(images: string[]): void {
    this.numberMatchingCards = 0;
    this.gameRun = true;
    this.cangratulationWrapper.element.innerHTML = '';
    this.cangratulationWrapper.element.remove();
    this.createTimer();
    this.cardsField.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
      card.element.addEventListener('transitionend', () => {
        if (cards.length === this.numberMatchingCards && this.gameRun) {
          this.gameRun = false;
          this.endGame();
        }
      });
    });

    this.cardsField.addCards(cards);
  }

  public endGame(): void {
    this.stopTimer();
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;

    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      this.activeCard.element.classList.add('not-correct');
      card.element.classList.add('not-correct');
      await delay(FLIP_DELAY);
      this.activeCard.element.classList.remove('not-correct');
      card.element.classList.remove('not-correct');
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.activeCard.element.classList.add('correct');
      card.element.classList.add('correct');
      this.numberMatchingCards += 2;
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }

  public gameFieldSize(size: number): void {
    const cardField = this.cardsField.element;
    if (cardField.classList.contains('small')) {
      cardField.classList.remove('small');
    }
    if (cardField.classList.contains('middle')) {
      cardField.classList.remove('middle');
    }
    if (cardField.classList.contains('large')) {
      cardField.classList.remove('large');
    }
    if (size > 0 && size <= 16) {
      cardField.classList.add('small');
    }
    if (size > 16 && size <= 36) {
      cardField.classList.add('middle');
    }
    if (size > 36) {
      cardField.classList.add('large');
    }
  }

  public sendScore(): string {
    return String(this.numberMatchingCards * 100 - this.gameTime * 10);
  }
}
