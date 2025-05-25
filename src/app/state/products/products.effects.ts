import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsActions from './products.actions';
import { ProductsService } from '../../core/services/products/products.service';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(action =>
        this.productsService.getProducts(action.page, action.limit).pipe(
          map(products => ProductsActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductsActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProduct),
      mergeMap(action =>
        this.productsService.getProductById(action.id).pipe(
          map(product => ProductsActions.loadProductSuccess({ product })),
          catchError(error => of(ProductsActions.loadProductFailure({ error })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.createProduct),
    mergeMap(action =>
      this.productsService.createProduct(action.product).pipe(
        map(product => ProductsActions.loadProductsSuccess({ products: [product] })),
        catchError(error => of(ProductsActions.loadProductsFailure({ error })))
      )

    )
  ));

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      mergeMap(action =>
        this.productsService.updateProduct(action.id, action.product).pipe(
          map(product => ProductsActions.loadProductSuccess({ product })),
          catchError(error => of(ProductsActions.loadProductFailure({ error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      mergeMap(action =>
        this.productsService.deleteProduct(action.id).pipe(
          map(() => ProductsActions.loadProducts({ page: action.page, limit: action.limit })),
          catchError(error => of(ProductsActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
