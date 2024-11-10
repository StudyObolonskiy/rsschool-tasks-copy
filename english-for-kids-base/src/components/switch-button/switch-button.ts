import { BaseComponent } from '../base-component';
import { Input } from '../input';
import './switch-button.scss';

export class SwitchButton extends BaseComponent {
  private readonly switchInput: Input;

  private readonly switchSlider: BaseComponent;

  constructor() {
    super('label', ['switch-btn']);
    this.switchInput = new Input(['switch-input'], [['type', 'checkbox']]);
    this.switchSlider = new BaseComponent('div', ['switch-slider']);
    this.element.append(this.switchInput.element, this.switchSlider.element);
  }

  public onInput(cb: () => void): void {
    this.switchInput.element.addEventListener('input', cb);
  }
}
