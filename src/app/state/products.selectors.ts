import { createFeatureSelector } from "@ngrx/store";
import { IProduct } from "../features/products/products-list/products.model";

export const selectProducts = createFeatureSelector<ReadonlyArray<IProduct>>('products');