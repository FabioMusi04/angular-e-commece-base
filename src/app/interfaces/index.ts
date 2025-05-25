export interface IOrder {
  orderNumber?: string;
  userId: string;
  totalAmount: number;
  status?: 'pending' | 'completed' | 'cancelled';
  orderItems?: object[];
  createdBy?: number;
  _id?: string;
}

export interface IUser{
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
  lastLogin?: Date;
  device: string[]
  preLastLogin?: Date;
  isConfirmed?: boolean;
  isEnabled?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
