import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ICategory, IProduct, IProductRes } from '../../../features/products/products-list/products.model';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(page: number, limit: number): Observable<IProduct[]> {
    return this.http.get<IProductRes[]>(`/products?count=true&page=${page}&limit=${limit}`).pipe(
      switchMap(products => {
        const categoryRequests = products.map(product =>
          this.getCategoryById(product.category).pipe(
            map(category => ({
              ...product,
              category
            }))
          )
        );
        return forkJoin(categoryRequests);
      })
    );
  }
  private getCategoryById(categoryId: string): Observable<ICategory> {
    return this.http.get<any[]>('/categories').pipe(
      map(categories => categories.find(category => category.id === categoryId) || null)
    );
  }
}

