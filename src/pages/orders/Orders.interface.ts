interface IOrderItem {
  id: number;
  price: number;
  product_title: string;
  quantity: number;
}

export interface IOrder {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  total: number;
  created_at: string;
  order_items: IOrderItem[];
}
