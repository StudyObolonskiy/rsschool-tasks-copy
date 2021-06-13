import { BaseComponent } from '../base-component';
import { Router } from '../router/router';

export class Main extends BaseComponent {
  private router: Router;

  constructor() {
    super('main', ['app']);
    this.router = new Router();
    this.element.appendChild(this.router.element);
  }
}
