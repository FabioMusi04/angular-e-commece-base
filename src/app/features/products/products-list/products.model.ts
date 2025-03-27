export interface ICategory {
    id: string;
    description: string;
}

export interface IProductBase {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

export interface IProductRes extends IProductBase {

    category: string;

}

export interface IProduct extends IProductBase {
    category: ICategory;
}