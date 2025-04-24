import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../../features/products/products-list/products.model';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly API_URL = environment.apiUrl

  constructor(private http: HttpClient) { }

  getProducts(page: number, limit: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API_URL}/products?count=true&page=${page}&limit=${limit}`)
  }
}

