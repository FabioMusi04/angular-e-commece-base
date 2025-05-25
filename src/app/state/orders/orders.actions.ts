import { createAction, props } from "@ngrx/store";
import { IOrder } from "../../features/orders/orders.model";

export const loadOrders = createAction(
  '[Orders] Load Orders',
  props<{ page: number; limit: number }>(),
);

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: IOrder[]}>(),
);

export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: unknown }>(),
);

export const loadOrder = createAction(
  '[Orders] Load Order',
  props<{ id: string }>(),
);

export const loadOrderSuccess = createAction(
  '[Orders] Load Order Success',
  props<{ order: IOrder }>(),
);

export const loadOrderFailure = createAction(
  '[Orders] Load Order Failure',
  props<{ error: unknown }>(),
);

export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ order: IOrder }>(),
);

export const updateOrder = createAction(
  '[Orders] Update Order',
  props<{ id: string; order: IOrder }>(),
);

export const deleteOrder = createAction(
  '[Orders] Delete Order',
  props<{ id: string, page: number, limit: number }>(),
);
