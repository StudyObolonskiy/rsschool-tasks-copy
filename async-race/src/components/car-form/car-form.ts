import { CarModel } from '../../models/car';
import { BaseComponent } from '../base-component';
import { Button } from '../common/button/button';
import { Input } from '../common/input/input';

export class CarForm extends BaseComponent {
  private nameInput: Input;

  private colorInput: Input;

  private submitBtn: Button;

  constructor(classList: string[], btnContent: string) {
    super('form', classList);
    this.nameInput = new Input(['name-input'], [['type', 'text']]);
    this.colorInput = new Input(['color-input'], [['type', 'color']]);
    this.submitBtn = new Button(['submit-btn'], btnContent);

    this.element.appendChild(this.nameInput.element);
    this.element.appendChild(this.colorInput.element);
    this.element.appendChild(this.submitBtn.element);
  }

  public onSubmit(cb: (carData: CarModel) => void): void {
    this.element.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const formData = this.formCollector();
      cb(formData);
    });
  }

  private formCollector(): CarModel {
    return {
      name: this.nameInput.getValue(),
      color: this.colorInput.getValue(),
    };
  }

  public setFormData(carData: CarModel): void {
    this.colorInput.setValue(carData.color);
    this.nameInput.setValue(carData.name);
  }
}
