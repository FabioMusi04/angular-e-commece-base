import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as CategoriesActions from "./categories.actions";
import { CategoriesService } from "../../core/services/categories/categories.service";

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      mergeMap(action =>
        this.categoriesService.getCategories(action.page, action.limit).pipe(
          map(categories => CategoriesActions.loadCategoriesSuccess({ categories })),
          catchError(error => of(CategoriesActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );

  loadCategoriesWithoutPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategoriesWithoutPagination),
      mergeMap(() =>
        this.categoriesService.getCategoriesWithoutPagination().pipe(
          map(categories => CategoriesActions.loadCategoriesSuccess({ categories })),
          catchError(error => of(CategoriesActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.createCategory),
      mergeMap(action =>
        this.categoriesService.createCategory(action.category).pipe(
          map(category => CategoriesActions.loadCategories({ page: 1, limit: 10 })), // Adjust page/limit as needed
          catchError(error => of(CategoriesActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.updateCategory),
      mergeMap(action =>
        this.categoriesService.updateCategory(action.id, action.category).pipe(
          map(category => CategoriesActions.loadCategories({ page: 1, limit: 10 })), // Adjust page/limit as needed
          catchError(error => of(CategoriesActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.deleteCategory),
      mergeMap(action =>
        this.categoriesService.deleteCategory(action.id).pipe(
          map(() => CategoriesActions.loadCategories({ page: action.page, limit: action.limit })),
          catchError(error => of(CategoriesActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}
}
