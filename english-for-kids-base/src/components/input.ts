export class Input {
  public readonly element: HTMLInputElement;

  constructor(classList: string[], attr: [string, string][]) {
    this.element = document.createElement('input');
    this.element.classList.add(...classList);
    attr.forEach((attribut) => {
      const [name, value] = attribut;
      this.element.setAttribute(name, value);
    });
  }
}
