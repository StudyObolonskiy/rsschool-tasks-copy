import { CarModelWithId } from '../models/car';

interface StateModel {
  garage: GarageStateModel
}
interface GarageStateModel {
  selectedCar: CarModelWithId
}

class State {
  private subscribers: ((state: StateModel)=>void)[] = [];

  private state: StateModel = {
    garage: {
      selectedCar: {
        name: '',
        color: '',
        id: -1,
      },
    },
  };

  public subscribe(subscriber: (state: StateModel)=>void) {
    this.subscribers.push(subscriber);
  }

  private callSubscribers() {
    this.subscribers.forEach((subscriber) => subscriber(this.state));
  }

  public getSelectedCar(): CarModelWithId | null {
    return this.state.garage.selectedCar;
  }

  public setSelectedCar(selectedCar: CarModelWithId): void {
    this.state.garage.selectedCar = selectedCar;
    this.callSubscribers();
  }
}

export const state = new State();
