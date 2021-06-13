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

  public onInput(cb: (event: Event) => void): void {
    this.element.addEventListener('input', cb);
  }

  public getValue(): string {
    return this.element.value;
  }

  public setValue(value: string): void {
    this.element.value = value;
  }
}
