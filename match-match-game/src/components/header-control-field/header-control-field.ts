import { BaseComponent } from '../base-component';
import './control-field.scss';

export class ControlField extends BaseComponent {
  constructor() {
    super('div', ['control-field', 'register']);
  }

  create(avatarSrc: string): void {
    const registerBtn = document.createElement('button');
    const startBtn = document.createElement('button');
    const avatarField = document.createElement('div');
    const avatarImg = document.createElement('canvas');
    const ctx = avatarImg.getContext('2d');
    const image = new Image(40, 40);
    image.src = avatarSrc;
    const drawImageCanvas = () => {
      if (ctx) {
        avatarImg.width = 40;
        avatarImg.height = 40;
        ctx.drawImage(image, 0, 0, image.width, image.height);
      }
    };
    image.onload = drawImageCanvas;
    registerBtn.classList.add('control-field__btn', 'register-btn');
    registerBtn.textContent = 'register new player';
    startBtn.classList.add('control-field__btn', 'start-btn');
    startBtn.textContent = 'start game';
    avatarField.classList.add('control-field__avatar');
    avatarImg.classList.add('avatar');
    avatarField.appendChild(avatarImg);
    this.element.appendChild(registerBtn);
    this.element.appendChild(startBtn);
    this.element.appendChild(avatarField);
  }
}
