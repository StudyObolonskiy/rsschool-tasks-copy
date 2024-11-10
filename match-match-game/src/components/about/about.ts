import { BaseComponent } from '../base-component';
import './about.scss';

export class About extends BaseComponent {
  constructor() {
    super('main', ['about-game']);

    this.element.innerHTML = `
      <div class="instruction-wrapper">
        <h1>How to play?</h1>
        <div class="register-descr rule">
          <p><span class="number-marker">1</span>Register new player in game</p>
          <img src="./images/form.png" alt="">
        </div>
        <div class="configure rule">
          <p><span class="number-marker">2</span>Configure you game setting</p>
          <img src="./images/game-settig.png" alt="">
        </div>
        <div class="game-descr rule">
          <p>
            <span class="number-marker">3</span>
            Start you new game! You will have 30 seconds to remember card positions, then you need to find all the matches.</p>
          <img src="./images/game-descr.png" alt="">
        </div>
      </div>
    `;
  }
}
