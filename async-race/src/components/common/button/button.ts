import { BaseComponent } from '../../base-component';

export class Button extends BaseComponent {
  constructor(classList: string[], title: string, attr?: [string, string][]) {
    super('button', classList);
    if (attr) {
      attr.forEach((attribut) => {
        const [name, value] = attribut;
        this.element.setAttribute(name, value);
      });
    }
    this.element.textContent = title;
  }

  public onClick(cb: () => void): void {
    this.element.addEventListener('click', (event: Event) => {
      event.preventDefault();
      cb();
    });
  }
}
