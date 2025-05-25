import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IUserState } from "./users.reducer";

export const selectUserState = createFeatureSelector<IUserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state: IUserState) => state.users
);

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => state.user
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: IUserState) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: IUserState) => state.error
);
