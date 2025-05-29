export interface IUser{
  _id: string;
  id: string;
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
