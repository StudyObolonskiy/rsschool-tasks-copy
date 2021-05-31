import { myBase } from '../../data-base';
import { User } from '../../models/user';
import { BaseComponent } from '../base-component';
import './best-score.scss';

export class BestScore extends BaseComponent {
  constructor() {
    super('main', ['best-score']);
  }

  showPage(arr: Array<User>):void {
    myBase.init();
    for (let i = 0; i < arr.length; i++) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      const info = document.createElement('div');
      const score = document.createElement('div');
      const avatarImg = document.createElement('canvas');
      const ctx = avatarImg.getContext('2d');
      const image = new Image(40, 40);
      image.src = arr[i].avatar;
      const drawImageCanvas = () => {
        if (ctx) {
          avatarImg.width = 40;
          avatarImg.height = 40;
          ctx.drawImage(image, 0, 0, image.width, image.height);
        }
      };
      image.onload = drawImageCanvas;
      info.innerHTML = `${arr[i].firstName} ${arr[i].lastName}<br> ${arr[i].email}`;
      score.textContent = `Score: ${arr[i].score}`;
      wrapper.append(avatarImg, info, score);
      this.element.append(wrapper);
    }
  }

  clear():void {
    this.element.innerHTML = '';
  }
}
