import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../../features/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) { }

  getOrders(page: number, limit: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`/orders?count=true&page=${page}&limit=${limit}`)
  }

  getOrderById(id: string): Observable<IOrder> {
    return this.http.get<IOrder>(`/orders/${id}`)
  }

  getSalesAnlytics(): Observable<unknown> {
    return this.http.get<unknown>(`/orders/analytics`)
  }

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`/orders`, order)
  }

  updateOrder(id: string, order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`/orders/${id}`, order)
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`/orders/${id}`);
  }
}
