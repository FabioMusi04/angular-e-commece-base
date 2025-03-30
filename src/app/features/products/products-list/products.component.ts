import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../../state/products.actions';
import { IProduct } from './products.model';
import { selectProductError, selectProductLoading } from '../../../state/products.selectors';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'price'];
  dataSource = new MatTableDataSource<unknown>(ELEMENT_DATA);
  products: IProduct[] = [];

  loading$ = this.store.select(selectProductLoading);
  error$ = this.store.select(selectProductError);

  constructor(private store: Store){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadProducts() {
    this.store.dispatch(loadProducts());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}

const ELEMENT_DATA: unknown[] = [
  {name: 'Product 1', price: 100},
  {name: 'Product 2', price: 200},
  {name: 'Product 3', price: 300},
]
