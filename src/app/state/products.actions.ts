import { createAction, props } from "@ngrx/store";
import { IProduct } from "../features/products/products-list/products.model";

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSucess = createAction(
    '[Products] Load Products Sucess',
    props<{ products: IProduct[] }>(),
);

export const loadProductsFailure = createAction(
    '[Products] Load Products Failure',
    props<{ error: unknown }>(),
)
