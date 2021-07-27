export enum RoutesName {
  GARAGE = 'garage',
  WINNERS = 'winners',
}

export interface Route {
  path: RoutesName;
  getComponent: () => HTMLElement;
}

export type Routes = Route[];
