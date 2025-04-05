import { AfterViewInit, Component, ViewChild, OnInit  } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../../state/products.actions';
import { IProduct } from './products.model';
import { selectProductError, selectProductLoading, selectProducts } from '../../../state/products.selectors';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'price'];
  dataSource = new MatTableDataSource<unknown>();
  products$: Observable<IProduct[]>;

  loading$ = this.store.select(selectProductLoading);
  error$ = this.store.select(selectProductError);

  constructor(private store: Store){
    this.products$ = this.store.select(selectProducts);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.store.dispatch(loadProducts({ page: 1, limit: 10 }));

    this.products$.subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page.subscribe(() => {
      this.store.dispatch(loadProducts({ page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));
    })

  }


}
