export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IBasket {
	items: string[];
	total: number;
}

export type PaymentMethod = 'cash' | 'card';

export interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	items: string[];
	total: number;
}

export type OrderForm = Omit<IOrder, 'total' | 'items'>;

export interface IOrderResult {
	id: string;
	total: number;
}

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};
