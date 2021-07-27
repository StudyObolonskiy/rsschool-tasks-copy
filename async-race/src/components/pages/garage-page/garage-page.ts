import { CarModelWithId } from '../../../models/car';
import { garageService } from '../../../services/GarageService';
import { state } from '../../../state/state';
import { BaseComponent } from '../../base-component';
import { CarForm } from '../../car-form/car-form';
import { Car } from '../../car/car';
import { Button } from '../../common/button/button';
import './garage.scss';

export class GaragePage extends BaseComponent {
  private cars: CarModelWithId[] = [];

  private pageTitle: BaseComponent;

  private carsNumberTitle: BaseComponent;

  private createCarForm: CarForm;

  private updateCarForm: CarForm;

  private generateButton: Button;

  private carsList: BaseComponent;

  private nextButton: Button;

  private prevButton: Button;

  private allCarsNumber = 0;

  private pageNumber = 1;

  private maxPageNumber = 1;

  private readonly generateCarsNumber = 100;

  constructor() {
    super('div', ['garage']);
    this.element.innerHTML = '<h1>GARAGE PAGE</h1>';
    this.pageTitle = new BaseComponent('h2', ['page-title']);
    this.carsNumberTitle = new BaseComponent('h3', ['cars-number-title']);
    this.element.append(this.pageTitle.element, this.carsNumberTitle.element);
    this.createCarForm = new CarForm(['create-car-form'], 'CREATE CAR');
    this.generateButton = new Button(['generate-btn'], 'GENERATE CARS');
    this.generateButton.onClick(() => {
      for (let i = 1; i <= this.generateCarsNumber; i++) {
        this.generateRandomCars();
      }
    });
    this.createCarForm.onSubmit(async (carData) => {
      await garageService.createCar(carData);
      this.init();
    });
    this.element.appendChild(this.createCarForm.element);

    this.updateCarForm = new CarForm(['create-car-form'], 'UPDATE CAR');
    this.updateCarForm.onSubmit(async (carData) => {
      const updatedCarId = state.getSelectedCar()?.id;
      if (updatedCarId && updatedCarId >= 1) {
        await garageService.updateCar(updatedCarId, carData);
        this.init();
      }
    });
    this.carsList = new BaseComponent('ul', ['cars-list']);
    this.nextButton = new Button(['next-btn', 'page-btn'], 'NEXT');
    this.prevButton = new Button(['prev-btn', 'page-btn'], 'PREV');
    this.element.appendChild(this.updateCarForm.element);
    this.element.append(this.generateButton.element, this.carsList.element);
    this.init();

    state.subscribe(() => {
      const selectedCar = state.getSelectedCar();
      if (selectedCar) {
        this.updateCarForm.setFormData(selectedCar);
      }
    });
    this.pagination();
    this.removeCarFromPage();
  }

  private async init(): Promise<void> {
    this.cars = await garageService.getCars(this.pageNumber);
    this.renderCars(this.cars);
    await this.getMaxPages();
    this.showPageNumber();
    this.showCarsNumbers();
  }

  private renderCars(cars: CarModelWithId[]): void {
    this.carsList.element.innerHTML = '';
    cars.forEach((car:CarModelWithId) => {
      const li = document.createElement('li');
      li.appendChild(new Car(car).element);
      this.carsList.element.appendChild(li);
    });
    this.element.appendChild(this.carsList.element);
    this.element.append(this.prevButton.element, this.nextButton.element);
  }

  private showPageNumber() {
    this.pageTitle.element.textContent = `Page #${this.pageNumber}`;
  }

  private showCarsNumbers() {
    this.carsNumberTitle.element.textContent = `Cars in garage (${this.allCarsNumber})`;
  }

  private async getMaxPages(): Promise<void> {
    this.allCarsNumber = await garageService.getTotalCarsNumber();
    this.maxPageNumber = Math.ceil(this.allCarsNumber / garageService.carsLimit);
  }

  private pagination() {
    this.nextButton.onClick(() => {
      if (this.pageNumber >= this.maxPageNumber) return;
      this.pageNumber += 1;
      this.init();
    });
    this.prevButton.onClick(() => {
      if (this.pageNumber === 1) return;
      this.pageNumber -= 1;
      this.init();
    });
  }

  private removeCarFromPage() {
    this.carsList.element.addEventListener('click', async (event: Event) => {
      const target = event.target as HTMLLIElement;
      if (target.matches('.remove-car-btn')) {
        await garageService.getCars(this.pageNumber);
        this.init();
      }
    });
  }

  private async generateRandomCars() {
    const hexSymbolsNumber = 6;
    const hexSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    const concernsArray = ['Scoda', 'Honda', 'Hyundai', 'BMW', 'Lada', 'WV', 'Porsche', 'Toyota'];
    const modelsArray = ['Karoq', 'Civic', 'Elantra', '5-Series', 'Granta', 'Passat', 'Cayman', 'Camry'];
    const concern = concernsArray[Math.floor(Math.random() * concernsArray.length)];
    const model = modelsArray[Math.floor(Math.random() * modelsArray.length)];
    let color = '#';

    for (let i = 0; i < hexSymbolsNumber; i++) {
      color += hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
    }
    await garageService.createCar({ name: `${concern} ${model}`, color: `${color}` });
    this.init();
  }
}
