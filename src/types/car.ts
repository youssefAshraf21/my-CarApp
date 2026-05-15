export interface Car {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  description: string;
  year: number;
  makeId?: number;
  modelId?: number;
}

export interface NhtsaModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface CartItem {
  car: Car;
  quantity: number;
}
