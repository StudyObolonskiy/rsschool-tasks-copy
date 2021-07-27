export interface CarModel {
  name: string;
  color: string;
}

export interface CarModelWithId extends CarModel{
  id: number;
}
