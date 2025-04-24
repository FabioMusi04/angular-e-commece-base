import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class RecentOrdersComponent {
  recentOrders: Order[] = [
    { id: '#1001', customer: 'John Doe', amount: 125.5, status: 'completed' },
    { id: '#1002', customer: 'Jane Smith', amount: 89.99, status: 'pending' },
    {
      id: '#1003',
      customer: 'Robert Johnson',
      amount: 210.0,
      status: 'completed',
    },
    {
      id: '#1004',
      customer: 'Emily Davis',
      amount: 55.75,
      status: 'cancelled',
    },
    {
      id: '#1005',
      customer: 'Michael Brown',
      amount: 199.99,
      status: 'completed',
    },
  ];
}
