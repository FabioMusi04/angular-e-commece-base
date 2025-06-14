import { createReducer, on } from "@ngrx/store";
import * as CategoriesAction from './categories.actions';
import { ICategory } from "../../features/products/products.model";

export interface ICategoryState {
    categories: ICategory[];
    loading: boolean;
    error: null | unknown;
}

export const initialState: ICategoryState = {
    categories: [],
    loading: false,
    error: null,
}

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesAction.loadCategoriesWithoutPagination, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CategoriesAction.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CategoriesAction.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    loading: false,
    categories,
    error: null,
  })),
  on(CategoriesAction.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
)
