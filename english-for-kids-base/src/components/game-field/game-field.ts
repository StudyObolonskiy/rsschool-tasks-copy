import { CardModel } from '../../model/card-model';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import './game-field.scss';

export class GameField extends BaseComponent {
  private readonly cardField: BaseComponent;

  private readonly progressBlock: BaseComponent;

  private readonly errorSound: HTMLAudioElement;

  private readonly correctSound: HTMLAudioElement;

  private readonly successSound: HTMLAudioElement;

  private readonly failSound: HTMLAudioElement;

  private readonly currentWordSound: HTMLAudioElement;

  private isGameStart = false;

  private cardsNumber = 0;

  private guessedCardsNumber = 0;

  private mistakeNumber = 0;

  constructor() {
    super('div', ['game-field']);
    this.cardField = new BaseComponent('div', ['card-field']);
    this.progressBlock = new BaseComponent('div', ['progress-block']);
    this.errorSound = new Audio('audio/error.mp3');
    this.correctSound = new Audio('audio/correct.mp3');
    this.successSound = new Audio('audio/success.mp3');
    this.failSound = new Audio('audio/failure.mp3');
    this.currentWordSound = new Audio();
  }

  public async renderGameField(categoryNumber: number, cb: () => void): Promise<void> {
    const res = await fetch('./cards.json');
    const data = await res.json();
    const cards: CardModel[] = data[categoryNumber];
    const randomWords = cards.map((item) => item.word).sort(() => Math.random() - 0.5);
    const firstWordIndex = 0;

    this.clean();
    this.cardsNumber = cards.length;
    for (let i = 0; i < cards.length; i++) {
      const englishWord = cards[i].word;
      const card = new Card();

      card.element.setAttribute('data-word', englishWord);
      card.renderCard(cards[i].image, englishWord, cards[i].translation);
      card.cardOnclick(async () => {
        if (randomWords.length > 0 && this.isGameStart) {
          if (card.element.getAttribute('data-word') !== randomWords[firstWordIndex]) {
            this.errorSound.play();
            this.addMissStar();
            this.mistakeNumber += 1;
          }
          if (card.element.getAttribute('data-word') === randomWords[firstWordIndex]) {
            card.element.classList.add('guess');
            this.correctSound.play();
            this.addGuessStar();
            this.guessedCardsNumber += 1;
            randomWords.shift();
            if (randomWords.length > 0) {
              this.currentWordSound.src = `audio/${randomWords[firstWordIndex]}.mp3`;
              this.currentWordSound.play();
            }
          }
        }
        if (this.cardsNumber === this.guessedCardsNumber) {
          if (this.mistakeNumber === 0) this.renderWinPopup(cb);
          if (this.mistakeNumber > 0) this.renderFailPopup(cb);
        }
      });
      this.cardField.element.append(card.element);
    }
    this.currentWordSound.src = `audio/${randomWords[firstWordIndex]}.mp3`;
    this.element.append(this.progressBlock.element, this.cardField.element);
    this.addStartGameBotton();
  }

  private addStartGameBotton(): void {
    const startGameBtn = new BaseComponent('button', ['start-game-btn']);

    startGameBtn.element.textContent = 'Start Game';
    startGameBtn.element.addEventListener('click', () => {
      if (!startGameBtn.element.matches('.started')) {
        startGameBtn.element.classList.add('started');
        startGameBtn.element.textContent = '';
        this.isGameStart = true;
      }
      this.currentWordSound.play();
    });
    this.element.append(startGameBtn.element);
  }

  private addGuessStar() {
    const star = document.createElement('div');

    star.classList.add('star-guess');
    this.progressBlock.element.prepend(star);
  }

  private addMissStar() {
    const star = document.createElement('div');

    star.classList.add('star-miss');
    this.progressBlock.element.prepend(star);
  }

  private clean() {
    this.cardField.element.innerHTML = '';
    this.element.innerHTML = '';
    this.progressBlock.element.innerHTML = '';
    this.cardsNumber = 0;
    this.guessedCardsNumber = 0;
    this.mistakeNumber = 0;
    this.isGameStart = false;
  }

  private renderWinPopup(cb: () => void) {
    const winPopup = new BaseComponent('div', ['win-popup']);

    this.successSound.play();
    winPopup.element.textContent = 'You did a great job! Not a single mistake. Well done, congratulations!';
    this.element.append(winPopup.element);
    setTimeout(() => {
      winPopup.element.remove();
      cb();
    }, 5000);
  }

  private renderFailPopup(cb: () => void) {
    const failPopup = new BaseComponent('div', ['fail-popup']);

    this.failSound.play();
    failPopup.element.textContent = `
      Don't be upset you made only ${this.mistakeNumber} mistake(s).
      Next time you will definitely succeed!
    `;
    this.element.append(failPopup.element);
    setTimeout(() => {
      failPopup.element.remove();
      cb();
    }, 5000);
  }
}
