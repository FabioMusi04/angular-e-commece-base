import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { deleteCategory, loadCategories } from '../../../state/categories/categories.actions';
import { ICategory } from '../categories.model';
import { selectCategoryError, selectCategoryLoading, selectCategories } from '../../../state/categories/categories.selector';
import { Observable, Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    MatIcon,
    MatToolbarModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'description', 'createdBy', 'actions'];
  dataSource = new MatTableDataSource<ICategory>();
  categories$: Observable<ICategory[]>;
  loading$ = this.store.select(selectCategoryLoading);
  error$ = this.store.select(selectCategoryError);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private categoriesSubscription!: Subscription;

  constructor(private store: Store, private router: Router) {
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit() {
    this.categoriesSubscription = this.categories$.subscribe((categories) => {
      this.dataSource.data = categories;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.store.dispatch(loadCategories({ page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));

    this.paginator.page.subscribe(() => {
      this.store.dispatch(loadCategories({ page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));
    });
  }

  ngOnDestroy() {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  onCreateCategory() {
    this.router.navigate(['/categories/create']);
  }

  onDeleteCategory(category: ICategory) {
    this.store.dispatch(deleteCategory({ id: category.id, page: this.paginator.pageIndex + 1, limit: this.paginator.pageSize }));
  }
}
