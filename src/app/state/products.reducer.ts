import { createReducer, on } from '@ngrx/store';
import * as ProductsAction from './products.actions';
import { IProduct } from '../features/products/products-list/products.model';


export interface IProductState {
    products: IProduct[];
    loading: boolean;
    error: null | unknown;
}

export const initialState: IProductState = {
    products: [],
    loading: false,
    error: null,
}

export const productsReducer = createReducer(
    initialState,
    on(ProductsAction.loadProducts, (state) => ({
      ...state,
      loading: true,
    })),
    on(ProductsAction.loadProductsSucess, (state, { products}) => ({
      ...state,
      loading: false,
      products
    })),
    on(ProductsAction.loadProductsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))
)
