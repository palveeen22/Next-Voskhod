import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
	images: images[] | null;
}

type images = {
	id: string;
	image: string | StaticImport;
};
