import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as OrdersActions from "./orders.actions";
import { OrdersService } from "../../core/services/orders/orders.service";

@Injectable()
export class OrdersEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap(action =>
        this.ordersService.getOrders(action.page, action.limit).pipe(
          map(orders => OrdersActions.loadOrdersSuccess({ orders })),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrder),
      mergeMap(action =>
        this.ordersService.getOrderById(action.id).pipe(
          map(order => OrdersActions.loadOrderSuccess({ order })),
          catchError(error => of(OrdersActions.loadOrderFailure({ error })))
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      mergeMap(action =>
        this.ordersService.createOrder(action.order).pipe(
          map(order => OrdersActions.loadOrdersSuccess({ orders: [order] })),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.updateOrder),
      mergeMap(action =>
        this.ordersService.updateOrder(action.id, action.order).pipe(
          map(order => OrdersActions.loadOrderSuccess({ order })),
          catchError(error => of(OrdersActions.loadOrderFailure({ error })))
        )
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.deleteOrder),
      mergeMap(action =>
        this.ordersService.deleteOrder(action.id).pipe(
          map(() => OrdersActions.loadOrders({ page: action.page, limit: action.limit })),
          catchError(error => of(OrdersActions.loadOrderFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) { }
}
