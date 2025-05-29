import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../../features/products/products.model';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(page: number, limit: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/products?count=true&page=${page}&limit=${limit}`)
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`)
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('/products', product);
  }

  updateProduct(id: string, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`/products/${id}`);
  }
}

