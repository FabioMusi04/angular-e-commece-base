import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IProductState } from "./products.reducer";

export const selectProductState = createFeatureSelector<IProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state: IProductState) => state.products
);


export const selectProduct = createSelector(
  selectProductState,
  (state: IProductState) => state.product
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state: IProductState) => state.loading
);

export const selectProductError = createSelector(
  selectProductState,
  (state: IProductState) => state.error
);
