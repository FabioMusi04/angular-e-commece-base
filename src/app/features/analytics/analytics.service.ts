import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface SummaryMetrics {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
}

interface Order {
  id: number;
  customer: string;
  total: number;
  date: string;
  status?: 'completed' | 'pending' | 'cancelled';
}

interface SalesData {
  date: string;
  sales: number;
}


@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {}

  // Mock data for summary metrics
  getSummaryMetrics(): Observable<SummaryMetrics> {
    return of({
      totalSales: 15000,
      totalOrders: 320,
      totalProducts: 120,
    });
  }

  // Mock data for recent orders
  getRecentOrders(): Observable<Order[]> {
    return of([
      { id: 1, customer: 'John Doe', total: 250, date: '2025-05-07', status: 'completed' },
      { id: 2, customer: 'Jane Smith', total: 150, date: '2025-05-06', status: 'pending' },
      { id: 3, customer: 'Alice Johnson', total: 300, date: '2025-05-05', status: 'completed' },
      { id: 4, customer: 'Bob Brown', total: 100, date: '2025-05-04', status: 'cancelled' },
    ]);
  }

  // Mock data for sales visualization
  getSalesData(): Observable<SalesData[]> {
    return of([
      { date: '2025-05-01', sales: 500 },
      { date: '2025-05-02', sales: 700 },
      { date: '2025-05-03', sales: 600 },
      { date: '2025-05-04', sales: 800 },
    ]);
  }
}