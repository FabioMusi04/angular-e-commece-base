export interface IOrder {
  orderNumber?: string;
  userId: string;
  totalAmount: number;
  status?: 'pending' | 'completed' | 'cancelled';
  orderItems?: object[];
  createdBy?: number;
  _id?: string;
}
