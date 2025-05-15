import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as CategoriesActions from "./categories.actions";
import { CategoriesService } from "../../core/services/categories/categories.service";

@Injectable()
export class CategoriesEffects{
  loadCategories$ = createEffect(() => this.action$.pipe(
    ofType(CategoriesActions.loadCategories),
    mergeMap(() => this.categoriesService.getCategories().pipe(
      map(categories => CategoriesActions.loadCategoriesSuccess({ categories })),
      catchError(error => of(CategoriesActions.loadCategoriesFailure({ error })
    ))
  ))
));

  constructor(
    private action$: Actions,
    private categoriesService: CategoriesService
  ) {}
}
