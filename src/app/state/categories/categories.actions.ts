import { createAction, props } from "@ngrx/store";
import { ICategory } from "../../features/products/products.model";

export const loadCategories = createAction(
  '[Categories] Load Categories',
  props<{ page: number; limit: number }>(),
);

export const loadCategoriesWithoutPagination = createAction(
  '[Categories] Load Categories Without Pagination',
);

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: ICategory[] }>(),
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: unknown }>(),
);

export const createCategory = createAction(
  '[Categories] Create Category',
  props<{ category: ICategory }>(),
);

export const updateCategory = createAction(
  '[Categories] Update Category',
  props<{ id: string; category: ICategory }>(),
);

export const deleteCategory = createAction(
  '[Categories] Delete Category',
  props<{ id: string; page: number; limit: number }>(),
);
