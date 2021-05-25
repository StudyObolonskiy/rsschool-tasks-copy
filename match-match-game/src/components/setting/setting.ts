import { BaseComponent } from '../base-component';
import { SettingField } from '../setting-field/setting-field';
import './setting.scss';

export class Setting extends BaseComponent {
  private readonly settingField: SettingField;

  constructor() {
    super('main', ['setting']);
    this.settingField = new SettingField();
    this.settingField.add();
    this.element.appendChild(this.settingField.element);
  }
}
