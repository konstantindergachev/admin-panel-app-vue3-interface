export interface IProduct {
  id?: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface IProductErrors {
  title: string;
  description: string;
  image: string;
  price: string;
  request: string;
}
