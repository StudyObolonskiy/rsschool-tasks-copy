import { Routes, RoutesName } from '../../models/routes';
import { BaseComponent } from '../base-component';
import { GaragePage } from '../pages/garage-page/garage-page';
import { WinnersPage } from '../pages/winners-page/winners-page';
import './router-container.scss';

export class Router extends BaseComponent {
  private routes: Routes;

  private garagePage: GaragePage;

  constructor() {
    super('div', ['router-container']);
    this.garagePage = new GaragePage();
    this.routes = this.getRoutes();
    window.onpopstate = this.onChangeRoute;
    this.onChangeRoute();
  }

  private getRoutes(): Routes {
    return [
      {
        path: RoutesName.GARAGE,
        getComponent: () => this.garagePage.element,
      },
      {
        path: RoutesName.WINNERS,
        getComponent: () => new WinnersPage().element,
      },
    ];
  }

  private onChangeRoute = () => {
    const route = this.routes.find(
      (routeItem) => routeItem.path === window.location.hash.split('/')[1],
    );

    if (route) {
      this.renderComponent(route.getComponent());
    } else {
      this.renderComponent(this.routes[0].getComponent());
    }
  };

  private renderComponent(component: HTMLElement): void {
    this.element.innerHTML = '';
    this.element.appendChild(component);
  }
}
