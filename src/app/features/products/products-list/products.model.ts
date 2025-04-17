export interface ICategory {
    id: string;
    name: string;
    description: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: ICategory;
    stock: number;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}