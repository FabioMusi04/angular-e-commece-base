import { createReducer, on } from '@ngrx/store';
import * as ProductsAction from './products.actions';
import { IProduct } from '../features/products/products-list/products.model';

export const initialState: IProduct[] = [];

export const productsReducer = createReducer(
    initialState,
    on(ProductsAction.loadProducts, (state) => [...state]),
)