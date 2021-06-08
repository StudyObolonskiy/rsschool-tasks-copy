import { myBase } from '../../data-base';
import { User } from '../../models/user';
import { BaseComponent } from '../base-component';
import './best-score.scss';

export class BestScore extends BaseComponent {
  constructor() {
    super('main', ['best-score']);
  }

  public showPage(usersArray: Array<User>): void {
    myBase.init();
    for (let i = 0; i < usersArray.length; i++) {
      const wrapper = document.createElement('div');
      const info = document.createElement('div');
      const score = document.createElement('div');
      const avatarImg = document.createElement('canvas');
      const ctx = avatarImg.getContext('2d');
      const image = new Image(40, 40);

      wrapper.classList.add('wrapper');
      image.src = usersArray[i].avatar;
      const drawImageCanvas = () => {
        if (ctx) {
          avatarImg.width = 40;
          avatarImg.height = 40;
          ctx.drawImage(image, 0, 0, image.width, image.height);
        }
      };
      image.onload = drawImageCanvas;
      info.innerHTML = `${usersArray[i].firstName} ${usersArray[i].lastName}<br> ${usersArray[i].email}`;
      score.textContent = `Score: ${usersArray[i].score}`;
      wrapper.append(avatarImg, info, score);
      this.element.append(wrapper);
    }
  }

  public clear(): void {
    this.element.innerHTML = '';
  }
}
