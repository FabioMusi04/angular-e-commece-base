import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../../features/products/products-list/products.model';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(page: number, limit: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/products?count=true&page=${page}&limit=${limit}`)
  }
}

