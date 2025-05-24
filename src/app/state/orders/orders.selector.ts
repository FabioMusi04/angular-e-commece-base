import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IOrderState } from './orders.reducer';

export const selectOrderState = createFeatureSelector<IOrderState>('orders');

export const selectOrders = createSelector(
  selectOrderState,
  (state: IOrderState) => state.orders
)

export const selectProduct = createSelector(
  selectOrderState,
  (state: IOrderState) => state.order
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state: IOrderState) => state.loading
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: IOrderState) => state.error
);

export const selectOrderCount = createSelector(
  selectOrderState,
  (state: IOrderState) => state.count
);

