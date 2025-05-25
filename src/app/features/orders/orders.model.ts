export interface ICategory {
    id: string;
    name: string;
    description: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IOrder {
    id: string;
    orderNumber: string;
    userId: string;
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    orderItems: object[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
