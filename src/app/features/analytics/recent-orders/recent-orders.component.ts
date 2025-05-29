import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../analytics.service';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class RecentOrdersComponent implements OnInit {
  recentOrders: Order[] = [];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getRecentOrders().subscribe((orders) => {
      this.recentOrders = orders.map((order) => ({
        id: `#${order.id}`,
        customer: order.customer,
        amount: order.total,
        status: order.status || 'pending', // Use the status from the service or default to 'pending'
      }));
    });
  }
}