import { createReducer, on } from '@ngrx/store';
import * as ProductsAction from './products.actions';
import { IProduct } from '../../features/products/products.model';


export interface IProductState {
    products: IProduct[];
    product: IProduct | null;
    loading: boolean;
    error: null | unknown;
}

export const initialState: IProductState = {
    products: [],
    product: null,
    loading: false,
    error: null,
}

export const productsReducer = createReducer(
    initialState,
    on(ProductsAction.loadProducts, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(ProductsAction.loadProductsSuccess, (state, { products}) => ({
      ...state,
      loading: false,
      products,
      error: null
    })),
    on(ProductsAction.loadProductsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),
    on(ProductsAction.loadProduct, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(ProductsAction.loadProductSuccess, (state, { product }) => ({
      ...state,
      loading: false,
      product,
      error: null
    })),
    on(ProductsAction.loadProductFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),
)
