export class BaseComponent {
  public readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', classList: string[] = []) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classList);
  }
}
