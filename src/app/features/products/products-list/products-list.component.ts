import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../../state/products/products.actions';
import { IProduct } from '../products.model';
import { selectProductError, selectProductLoading, selectProducts } from '../../../state/products/products.selectors';
import { Observable, Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

interface ICategory {
  id: string;
  name: string;
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    MatIcon,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['imageUrl', 'name', 'categoryName', 'stock', 'price'];
  dataSource = new MatTableDataSource<IProduct>();
  products$: Observable<IProduct[]>;
  loading$ = this.store.select(selectProductLoading);
  error$ = this.store.select(selectProductError);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categoryFilter = '';
  categories: ICategory[] = [];
  private productsSubscription!: Subscription;

  constructor(private store: Store, private router: Router) {
    this.products$ = this.store.select(selectProducts);
  }

  ngOnInit() {
    this.productsSubscription = this.products$.subscribe((products) => {
      this.dataSource.data = products;
      this.extractCategories(products);
      this.applyCategoryFilter();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.store.dispatch(loadProducts({ page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));

    this.paginator.page.subscribe(() => {
      this.store.dispatch(loadProducts({ page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));
    });
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onButtonCLick() {
    this.router.navigate(['/products/create']);
  }

  onProductClick(product: IProduct) {
    this.router.navigate(['/products', product.id]);
  }

  applyCategoryFilter() {
    if (!this.categoryFilter) {
      this.dataSource.filter = '';
      return;
    }
    this.dataSource.filterPredicate = (data: IProduct, filter: string) =>
      data.category && data.category.id === filter;
    this.dataSource.filter = this.categoryFilter;
  }

  private extractCategories(products: IProduct[]) {
    const map = new Map<string, string>();
    products.forEach(p => {
      if (p.category && !map.has(p.category.id)) {
        map.set(p.category.id, p.category.name);
      }
    });
    this.categories = Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }
}
