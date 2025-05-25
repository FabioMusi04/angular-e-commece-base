import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UsersActions from './users.actions';
import { UsersService } from '../../core/services/users/users.service';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(action =>
        this.usersService.getUsers(action.page, action.limit).pipe(
          map(users => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUser),
      mergeMap(action =>
        this.usersService.getUserById(action.id).pipe(
          map(user => UsersActions.loadUserSuccess({ user })),
          catchError(error => of(UsersActions.loadUserFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }
}
