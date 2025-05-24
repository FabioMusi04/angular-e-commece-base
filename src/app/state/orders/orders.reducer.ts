import { createReducer, on } from "@ngrx/store";
import * as OrdersAction from "./orders.actions";
import { IOrder } from "../../interfaces";


export interface IOrderState {
  orders: IOrder[];
  order: IOrder | null;
  count: number | null;
  loading: boolean;
  error: null | unknown;
}

export const initialState: IOrderState = {
  orders: [],
  order: null,
  count: null,
  loading: false,
  error: null,
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersAction.loadOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrdersAction.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
    error: null,
  })),
  on(OrdersAction.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrdersAction.loadOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrdersAction.loadOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    order,
    error: null,
  })),
  on(OrdersAction.loadOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
)
