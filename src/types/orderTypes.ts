export interface Order {
  id: string;
  date: string;
  amount: string;
  status: string;
  items: number;
  statusColor: string;
}

export interface OrderHistoryData {
  current: Order[];
  past: Order[];
  cancelled: Order[];
}
export interface OrderItem {
  id: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: string;
  quantity: number;
}

export interface OrderDetailsType {
  orderId: string;
  orderDate: string;
  totalPrice: string;
  items: OrderItem[];
}