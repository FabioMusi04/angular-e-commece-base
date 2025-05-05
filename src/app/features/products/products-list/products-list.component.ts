import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../../state/products/products.actions';
import { IProduct } from './products.model';
import { selectProductError, selectProductLoading, selectProducts } from '../../../state/products/products.selectors';
import { Observable } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButton, MatIcon],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['imageUrl', 'name', 'categoryName', 'stock', 'price'];
  dataSource = new MatTableDataSource<IProduct>();
  products$: Observable<IProduct[]>;

  loading$ = this.store.select(selectProductLoading);
  error$ = this.store.select(selectProductError);

  constructor(private store: Store, private router: Router) {
    this.products$ = this.store.select(selectProducts);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.products$.subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.store.dispatch(loadProducts({ page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));

    this.paginator.page.subscribe(() => {
      this.store.dispatch(loadProducts({ page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));
    })

  }

  onButtonCLick() {
    this.router.navigate(['/products/create']);
  }

}
