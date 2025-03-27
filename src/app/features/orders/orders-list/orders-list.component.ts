import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

interface Order {
  orderNumber: string;
  userId: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  orderItems: [];
  createdBy: string;
}

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  imports: [MatTableModule, MatSelectModule, MatPaginatorModule],
  standalone: true
})
export class OrdersListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['orderNumber', 'userId', 'totalAmount', 'status'];
  dataSource = new MatTableDataSource<Order>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  orders: Order[] = [
    { orderNumber: 'ORD12345', userId: 'User1', totalAmount: 120, status: 'pending', orderItems: [], createdBy: 'Admin1' },
    { orderNumber: 'ORD67890', userId: 'User2', totalAmount: 75, status: 'completed', orderItems: [], createdBy: 'Admin2' },
    { orderNumber: 'ORD11111', userId: 'User3', totalAmount: 90, status: 'pending', orderItems: [], createdBy: 'Admin3' },
    { orderNumber: 'ORD22222', userId: 'User4', totalAmount: 150, status: 'cancelled', orderItems: [], createdBy: 'Admin4' },
    { orderNumber: 'ORD33333', userId: 'User5', totalAmount: 200, status: 'completed', orderItems: [], createdBy: 'Admin5' },
    { orderNumber: 'ORD44444', userId: 'User6', totalAmount: 300, status: 'pending', orderItems: [], createdBy: 'Admin6' },
    { orderNumber: 'ORD55555', userId: 'User7', totalAmount: 80, status: 'cancelled', orderItems: [], createdBy: 'Admin7' },
    { orderNumber: 'ORD66666', userId: 'User8', totalAmount: 110, status: 'completed', orderItems: [], createdBy: 'Admin8' }
  ];

  statusFilter = '';

  ngOnInit() {
    this.dataSource.data = this.orders;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // ✅ This enables pagination
  }

  applyFilter() {
    this.dataSource.filterPredicate = (data: Order, filter: string) => 
      !filter || data.status === filter;
    
    this.dataSource.filter = this.statusFilter;
  }

  updateStatus(order: Order, event: MatSelectChange) {
    order.status = event.value;
  }
}
