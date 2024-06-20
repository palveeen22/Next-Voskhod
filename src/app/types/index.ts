import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface Car {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  tarif: string;
  image: string;
}

export interface CarDetail {
  result: number;
  item: CarItem;
}

export interface CarItem {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  tarif: string;
  images: Image[] | null;
}

export interface Image {
  id: string;
  image: string | StaticImport;
}

export interface TModel {
  brand: string;
  models: string[];
}

export type Tariff = {
  id: string;
  name: string;
};