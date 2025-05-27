import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../../features/products/products.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  getCategories(page: number, limit: number): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`/categories?count=true&page=${page}&limit=${limit}`);
  }

  getCategoriesWithoutPagination(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`/categories?count=false`);
  }

  getCategoryById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`/categories/${id}`);
  }

  createCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`/categories`, category);
  }

  updateCategory(id: string, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`/categories/${id}`);
  }
}
