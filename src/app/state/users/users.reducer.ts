import { createReducer, on } from "@ngrx/store";
import * as UsersAction from "./users.actions";
import { IUser } from "../../interfaces";

export interface IUserState {
  users: IUser[];
  user: IUser | null;
  loading: boolean;
  error: null | unknown;
}

export const initialState: IUserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
}

export const usersReducer = createReducer(
  initialState,
  on(UsersAction.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersAction.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users,
    error: null
  })),
  on(UsersAction.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersAction.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersAction.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
    error: null
  })),
  on(UsersAction.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
)
