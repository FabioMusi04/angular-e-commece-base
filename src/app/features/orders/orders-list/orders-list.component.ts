import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectOrderError, selectOrders, selectOrderState } from '../../../state/orders/orders.selector';
import { Observable, Subscription } from 'rxjs';
import { deleteOrder, loadOrders } from '../../../state/orders/orders.actions';
import { Router } from '@angular/router';
import { IOrder } from '../orders.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  imports: [CommonModule, MatTableModule, MatSelectModule, MatPaginatorModule, MatToolbarModule, MatIcon, MatButtonModule],
  standalone: true
})
export class OrdersListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['orderNumber', 'userId', 'totalAmount', 'status', 'actions'];
  dataSource = new MatTableDataSource<IOrder>([]);
  orders$: Observable<IOrder[]>;
  loading$ = this.store.select(selectOrderState);
  error$ = this.store.select(selectOrderError);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private ordersSubscription!: Subscription;

  constructor(private store: Store, private router: Router) {
    this.orders$ = this.store.select(selectOrders);
  }

  statusFilter = '';

  ngOnInit() {
    this.ordersSubscription = this.orders$.subscribe(orders => {
      this.dataSource.data = orders;
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.store.dispatch(loadOrders({ page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));

    this.paginator.page.subscribe(() => {
      this.store.dispatch(loadOrders({ page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));
    });
  }

  applyFilter() {
    this.dataSource.filterPredicate = (data: IOrder, filter: string) =>
      !filter || data.status === filter;

    this.dataSource.filter = this.statusFilter;
  }

  updateStatus(order: IOrder, event: MatSelectChange) {
    order.status = event.value;
  }

  onOrderClick(order: IOrder): void {
    this.router.navigate(['/orders', order.id]);
  }

  onButtonClick(): void {
    this.router.navigate(['/orders/create']);
  }

  onDeleteOrder(order: IOrder): void {
    this.store.dispatch(deleteOrder({ id: order.id, page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));
  }
}
