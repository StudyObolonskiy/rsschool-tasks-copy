import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Setting } from './components/setting/setting';
import { ImageCategoryModel } from './models/image-category-model';

export class App {
  private readonly game: Game;

  private readonly header: Header;

  private readonly setting: Setting;

  CATEGORY_NUMBER = 0;

  CARDS_NUMBERS = 4;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.header = new Header();
    this.setting = new Setting();
    this.header.add('./images/avatar.png');
    this.rootElement.appendChild(this.header.element);
  }

  start(): void {
    const red = document.createElement('div');
    red.classList.add('red');
    this.rootElement.appendChild(red);
    this.routing();
  }

  sendsettings(): void {
    const selects = Array.from(
      this.setting.element.getElementsByTagName('select'),
    );
    selects.forEach((select) => {
      select.addEventListener('change', () => {
        if (select.matches('.category')) {
          this.CATEGORY_NUMBER = +select.value;
        }
        if (select.matches('.difficulty')) {
          this.CARDS_NUMBERS = +select.value;
        }
      });
    });
  }

  async startGame(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[this.CATEGORY_NUMBER];
    const cardsPairNumber = Math.ceil(this.CARDS_NUMBERS / 2);
    const imagesCollectiom = cat.images.map(
      (name) => `${cat.category}/${name}`,
    );
    const images = imagesCollectiom.slice(0, cardsPairNumber);
    this.game.newGame(images);
    this.game.gameFieldSize(this.CARDS_NUMBERS);
    this.rootElement.appendChild(this.game.element);
  }

  routing(): void {
    let prevEl = this.game.element;
    const container = this.rootElement;
    const navigationItems = this.header.element.getElementsByClassName('navigation-item');
    (window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const routing = [
        {
          name: 'game',
          component: () => {
            prevEl.remove();
            prevEl = this.game.element;
            this.startGame();
          },
        },

        {
          name: 'about',
          component: () => {
            const red = document.createElement('div');
            prevEl.remove();
            prevEl = red;
            red.classList.add('red');
            container.appendChild(red);
          },
        },

        {
          name: 'settings',
          component: () => {
            prevEl.remove();
            prevEl = this.setting.element;
            this.rootElement.appendChild(this.setting.element);
            this.sendsettings();
          },
        },
      ];
      const defaultRoute = {
        name: 'defailt',
        component: () => {
          this.startGame();
        },
      };
      const currentRoute = routing.find((p) => p.name === currentRouteName);

      (currentRoute || defaultRoute).component();

      Array.from(navigationItems).forEach((item) => {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
        if (item.matches(`.${currentRoute?.name}`)) {
          item.classList.add('active');
        }
      });
    })();
  }
}
