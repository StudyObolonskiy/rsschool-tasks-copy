import { BaseComponent } from '../base-component';
import './setting-field.scss';

export class SettingField extends BaseComponent {
  private readonly categorySelect: BaseComponent;

  private readonly difficultySelect: BaseComponent;

  constructor() {
    super('div', ['setting__field']);
    this.categorySelect = new BaseComponent('select', ['category']);
    this.difficultySelect = new BaseComponent('select', ['difficulty']);
  }

  add(): void {
    const categorySelect = document.createElement('select');
    const cardsNotation = document.createElement('p');
    const difficultyNotation = document.createElement('p');
    const cardsTypeOption = document.createElement('option');
    const animalsOption = document.createElement('option');
    const mixOption = document.createElement('option');
    const gameTypeOption = document.createElement('option');
    const lowOption = document.createElement('option');
    const middleOption = document.createElement('option');
    const hightOption = document.createElement('option');

    categorySelect.classList.add('category');
    cardsNotation.textContent = 'Games cards';
    difficultyNotation.textContent = 'Difficulty level';
    cardsTypeOption.setAttribute('value', '0');
    cardsTypeOption.textContent = 'Select game cards type';
    animalsOption.setAttribute('value', '0');
    animalsOption.textContent = 'Animals';
    mixOption.setAttribute('value', '1');
    mixOption.textContent = 'Mix';
    gameTypeOption.setAttribute('value', '16');
    gameTypeOption.textContent = 'Select game type';
    lowOption.setAttribute('value', '16');
    lowOption.textContent = 'Find 8 card matches (low)';
    middleOption.setAttribute('value', '36');
    middleOption.textContent = 'Find 18 card matches (middle)';
    hightOption.setAttribute('value', '48');
    hightOption.textContent = 'Find 24 card matches (hight)';
    categorySelect.append(cardsTypeOption, animalsOption, mixOption);
    this.difficultySelect.element.append(gameTypeOption, lowOption, middleOption, hightOption);
    this.element.append(cardsNotation, categorySelect, difficultyNotation, this.difficultySelect.element);
  }
}
