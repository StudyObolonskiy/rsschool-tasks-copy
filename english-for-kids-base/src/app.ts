import { BaseComponent } from './components/base-component';
import { Card } from './components/card/card';
import { Footer } from './components/footer/footer';
import { GameField } from './components/game-field/game-field';
import { Header } from './components/header/header';
import { MainCard } from './components/main-card/main-card';
import { SideNavigation } from './components/side-navigation/side-navigation';
import { CardModel } from './model/card-model';

export class App {
  private readonly footer: Footer;

  private readonly header: Header;

  private readonly main: BaseComponent;

  private readonly sideNavigation: SideNavigation;

  private readonly gameField: GameField;

  private isGame = false;

  private categoryNumber = 0;

  constructor(private readonly rootElement: HTMLElement) {
    this.footer = new Footer();
    this.sideNavigation = new SideNavigation();
    this.main = new BaseComponent('main', ['main']);
    this.header = new Header();
    this.gameField = new GameField();
  }

  public renderStartPage(): void {
    document.body.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (this.sideNavigation.element.matches('.show') && !target.closest('.side-navigation') && !target.closest('.burger-btn')) {
        this.toggleMenu();
      }
    });
    this.header.burgerButton.onClick(() => {
      this.toggleMenu();
    });
    this.header.switchButton.onInput(() => {
      document.body.classList.toggle('game');
      if (this.isGame === false) {
        this.isGame = true;
        if (this.main.element.firstElementChild?.matches('.train')) {
          this.startGame();
        }
      } else {
        this.isGame = false;
        if (this.main.element.firstElementChild?.matches('.game-field')) {
          this.renderTrainField(this.categoryNumber);
        }
      }
    });
    this.sideNavigation.createCategoryList((event) => {
      const listItem = event.target as HTMLElement;
      const categoryNumber = listItem.getAttribute('data-category');
      this.categoryNumber = categoryNumber ? +categoryNumber : 1;
      this.toggleMenu();
      if (categoryNumber) {
        this.showActiveLink(categoryNumber);
        if (+categoryNumber === 0) {
          this.renderMain();
        }
        if (+categoryNumber > 0 && this.isGame === false) {
          this.renderTrainField(this.categoryNumber);
        }

        if (+categoryNumber > 0 && this.isGame === true) {
          this.startGame();
        }
      }
    });
    this.renderMain();
    this.rootElement.append(this.sideNavigation.element, this.header.element, this.main.element, this.footer.element);
  }

  private async renderMain(): Promise<void> {
    const res = await fetch('./cards.json');
    const data = await res.json();
    const categories: string[] = data[0];
    this.main.element.innerHTML = '';
    this.showActiveLink(`${categories.indexOf('Main-page')}`);
    for (let i = 1; i < data.length; i++) {
      const card: CardModel[] = data[i];
      const mainCard = new MainCard();
      mainCard.element.setAttribute('data-category', `${i}`);
      mainCard.renderCard(card[0].image, categories[i]);
      mainCard.onClick(() => {
        this.categoryNumber = i;
        if (this.isGame === false) {
          this.renderTrainField(i);
        }
        if (this.isGame === true) {
          this.startGame();
        }
        this.showActiveLink(`${i}`);
      });
      this.main.element.append(mainCard.element);
    }
  }

  private toggleMenu(): void {
    this.header.burgerButton.element.classList.toggle('active');
    this.sideNavigation.element.classList.toggle('show');
  }

  private async renderTrainField(categoryNumber: number): Promise<void> {
    const res = await fetch('./cards.json');
    const data = await res.json();
    const cards: CardModel[] = data[categoryNumber];
    const trainField = new BaseComponent('div', ['train']);
    this.main.element.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
      const imageSource = cards[i].image;
      const englishWord = cards[i].word;
      const translationWord = cards[i].translation;
      const audioCource = cards[i].audioSrc;
      const card = new Card();
      card.element.setAttribute('data-word', englishWord);
      card.renderCard(imageSource, englishWord, translationWord);
      card.cardOnclick(() => {
        const audio = new Audio(audioCource);
        const cardElement = card.element.firstChild as HTMLElement;
        if (!cardElement.classList.contains('turn')) {
          audio.play();
        }
      });
      trainField.element.append(card.element);
    }
    this.main.element.append(trainField.element);
  }

  private startGame(): void {
    this.main.element.innerHTML = '';
    this.gameField.renderGameField(this.categoryNumber, () => this.renderMain());
    this.main.element.append(this.gameField.element);
  }

  private showActiveLink(category: string) {
    const listItems = this.sideNavigation.element.querySelectorAll('li');
    listItems.forEach((item) => {
      item.classList.remove('active-link');
      if (item.getAttribute('data-category') === category) {
        item.classList.add('active-link');
      }
    });
  }
}
