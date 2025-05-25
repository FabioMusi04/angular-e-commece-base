import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../features/products/products.model";

export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ page: number; limit: number}>(),
);

export const loadProductsSuccess = createAction(
    '[Products] Load Products Success',
    props<{ products: IProduct[] }>(),
);

export const loadProductsFailure = createAction(
    '[Products] Load Products Failure',
    props<{ error: unknown }>(),
)

export const loadProduct = createAction(
    '[Products] Load Product',
    props<{ id: string }>(),
);

export const loadProductSuccess = createAction(
    '[Products] Load Product Success',
    props<{ product: IProduct }>(),
);

export const loadProductFailure = createAction(
    '[Products] Load Product Failure',
    props<{ error: unknown }>(),
);

export const createProduct = createAction(
    '[Products] Create Product',
    props<{ product: IProduct }>(),
);

export const updateProduct = createAction(
    '[Products] Update Product',
    props<{ id: string; product: IProduct }>(),
);

export const deleteProduct = createAction(
    '[Products] Delete Product',
    props<{ id: string; page: number; limit: number }>()
);