import { CarModel, CarModelWithId } from '../models/car';
import { RestService, restService } from './RestService';

export class GarageService {
  public carsLimit = 7;

  private readonly defaultCarsNumber = 4;

  constructor(private restfulService: RestService) {}

  public async getCars(page = 1): Promise<CarModelWithId[]> {
    const queryParams = {
      _page: page,
      _limit: this.carsLimit,
    };
    const response = await this.restfulService.get('/garage', queryParams);
    const result = await response.json();
    return result;
  }

  public async getTotalCarsNumber(): Promise<number> {
    const queryParams = {
      _page: 1,
      _limit: this.carsLimit,
    };
    const response = await this.restfulService.get('/garage', queryParams);
    const total = response.headers.get('X-Total-Count');
    if (total) {
      return +total;
    }
    return this.defaultCarsNumber;
  }

  public async createCar(car: CarModel): Promise<CarModelWithId> {
    const response = await this.restfulService.post<CarModel>('/garage', car);
    const result = await response.json();
    return result;
  }

  public async deleteCar(id: number): Promise<void> {
    await this.restfulService.delete(`/garage/${id}`);
  }

  public async updateCar(id: number, car: CarModel): Promise<CarModelWithId> {
    const response = await this.restfulService.put<CarModel>(`/garage/${id}`, car);
    const result = await response.json();
    return result;
  }
}

export const garageService = new GarageService(restService);
