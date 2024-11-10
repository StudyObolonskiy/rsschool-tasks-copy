import { BaseComponent } from '../base-component';
import './footer.scss';

export class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);
    this.element.innerHTML = `
      <div class="git">
        <a href="https://github.com/StudyObolonskiy" target="_blank"></a>
      </div>
      <div class="year">2021</div>
      <div class="rss">
      <a href="https://rs.school/js/" target="_blank"></a>
      </div>
    `;
  }
}
