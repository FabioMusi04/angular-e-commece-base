import { createAction, props } from "@ngrx/store";
import { IUser } from "../../interfaces";

export const loadUsers = createAction(
  '[Users] Load Users',
  props<{ page: number; limit: number }>(),
)

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: Omit<IUser, 'password'>[] }>(),
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: unknown }>(),
)

export const loadUser = createAction(
  '[Users] Load User',
  props<{ id: string }>(),
);

export const loadUserSuccess = createAction(
  '[Users] Load User Success',
  props<{ user: Omit<IUser, 'password'> }>(),
);

export const loadUserFailure = createAction(
  '[Users] Load User Failure',
  props<{ error: unknown }>(),
);
