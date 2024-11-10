export class Input {
  public readonly element: HTMLInputElement;

  constructor(attr: [string, string][]) {
    this.element = document.createElement('input');
    this.addAttribut(attr);
  }

  private addAttribut(attr: [string, string][]): void {
    attr.forEach((attribut) => {
      const [name, value] = attribut;
      this.element.setAttribute(name, value);
    });
  }
}
