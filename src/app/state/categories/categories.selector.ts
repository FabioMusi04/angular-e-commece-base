import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ICategoryState } from "./categories.reducer";

export const selectCategoryState = createFeatureSelector<ICategoryState>('categories');

export const selectCategories = createSelector(
  selectCategoryState,
  (state: ICategoryState) => state.categories
)

export const selectCategoryLoading = createSelector(
  selectCategoryState,
  (state: ICategoryState) => state.loading
)

export const selectCategoryError = createSelector(
  selectCategoryState,
  (state: ICategoryState) => state.error
)
