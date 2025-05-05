import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../features/products/products-list/products.model";

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
