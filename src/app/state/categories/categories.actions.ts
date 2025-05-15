import { createAction, props } from "@ngrx/store";
import { ICategory } from "../../features/products/products-list/products.model";

export const loadCategories = createAction(
  '[Categories] Load Categories',
)

export const loadCategoriesSuccess = createAction(
    '[Categories] Load Categories Success',
    props<{ categories: ICategory[] }>(),
)

export const loadCategoriesFailure = createAction(
    '[Categories] Load Categories Failure',
    props<{ error: unknown }>(),
)
