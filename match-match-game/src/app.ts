import { About } from './components/about/about';
import { BestScore } from './components/best-score/best-score';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { RegisterForm } from './components/register-form/register-form';
import { Setting } from './components/setting/setting';
import { ImageCategoryModel } from './models/image-category-model';
import { User } from "./models/user";

export class App {
  private readonly about: About;

  private readonly game: Game;

  private readonly header: Header;

  private readonly setting: Setting;

  private readonly registerForm: RegisterForm;

  private readonly bestScore: BestScore;

  private CATEGORY_NUMBER = 0;

  private CARDS_NUMBERS = 2;

  private readonly usersArray: User[] = [
    {
      firstName: 'John',
      lastName: 'Smith',
      email: 'j.s@example.com',
      score: 1700,
      avatar: './images/animals/32.png',
    },
    {
      firstName: 'Kevin',
      lastName: 'Johnson',
      email: 'k.j@example.com',
      score: 1700,
      avatar: './images/animals/28.png',
    },
    {
      firstName: 'Adam',
      lastName: 'Williams',
      email: 'a.w@example.com',
      score: 1700,
      avatar: './images/animals/25.png',
    },
    {
      firstName: 'Ben',
      lastName: 'Jones',
      email: 'b.j@example.com',
      score: 1700,
      avatar: './images/animals/26.png',
    },
    {
      firstName: 'Andrew',
      lastName: 'Brown',
      email: 'a.b@example.com',
      score: 1700,
      avatar: './images/animals/27.png',
    },
    {
      firstName: 'Samuel',
      lastName: 'Davis',
      email: 's.d@example.com',
      score: 1700,
      avatar: './images/animals/29.png',
    },
    {
      firstName: 'Fred',
      lastName: 'Miller',
      email: 'f.m@example.com',
      score: 1700,
      avatar: './images/animals/30.png',
    },
    {
      firstName: 'Martin',
      lastName: 'Wilson',
      email: 'm.w@example.com',
      score: 1700,
      avatar: './images/animals/31.png',
    },
    {
      firstName: 'Gordon',
      lastName: 'Moore',
      email: 'g.m@example.com',
      score: 1700,
      avatar: './images/animals/24.png',
    },
    {
      firstName: 'Bill',
      lastName: 'Taylor',
      email: 'b.t@example.com',
      score: 1700,
      avatar: './images/animals/22.png',
    },
  ]

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.header = new Header();
    this.setting = new Setting();
    this.about = new About();
    this.registerForm = new RegisterForm();
    this.bestScore = new BestScore();
  }

  public start(): void {
    this.header.add(this.registerForm.imgSrc);
    this.rootElement.appendChild(this.header.element);
    const registerBtn = this.header.element.querySelector('.register-btn');
    const startBtn = this.header.element.querySelector('.start-btn');
    this.routing();
    registerBtn?.addEventListener('click', () => {
      this.rootElement.appendChild(this.registerForm.element);
      this.registerForm.showForm();
    });
    startBtn?.addEventListener('click', () => {
      startBtn.classList.toggle('start');

      if (!startBtn.classList.contains('start')) {
        startBtn.innerHTML = '<a href="#game">start game</a>';
        this.game.endGame();
      }
      if (startBtn.classList.contains('start')) {
        startBtn.innerHTML = 'stop';
        this.game.endGame();
      }
    });
  }

  private sendSettings(): void {
    const selects = Array.from(this.setting.element.getElementsByTagName('select'));
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

  private async startGame(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[this.CATEGORY_NUMBER];
    const cardsPairNumber = Math.ceil(this.CARDS_NUMBERS / 2);
    const imagesCollectiom = cat.images.map((name) => `${cat.category}/${name}`);
    const images = imagesCollectiom.slice(0, cardsPairNumber);
    this.game.newGame(images);
    this.game.gameFieldSize(this.CARDS_NUMBERS);
    this.rootElement.appendChild(this.game.element);
  }

  private routing(): void {
    let prevEl = this.about.element;
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
          name: 'best-score',
          component: () => {
            prevEl.remove();
            prevEl = this.bestScore.element;
            this.bestScore.clear();
            this.bestScore.showPage(this.usersArray);
            this.rootElement.appendChild(this.bestScore.element);
          },
        },

        {
          name: 'about',
          component: () => {
            const startBtn = this.header.element.querySelector('.start-btn');
            if (startBtn) {
              startBtn.innerHTML = '<a href="#game">start game</a>';
              startBtn.classList.remove('start');
            }
            prevEl.remove();
            prevEl = this.about.element;
            this.rootElement.appendChild(this.about.element);
          },
        },

        {
          name: 'settings',
          component: () => {
            const startBtn = this.header.element.querySelector('.start-btn');
            if (startBtn) {
              startBtn.innerHTML = '<a href="#game">start game</a>';
              startBtn.classList.remove('start');
            }
            prevEl.remove();
            prevEl = this.setting.element;
            this.rootElement.appendChild(this.setting.element);
            this.sendSettings();
          },
        },
      ];
      const defaultRoute = {
        name: 'defailt',
        component: () => {
          this.rootElement.appendChild(this.about.element);
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
