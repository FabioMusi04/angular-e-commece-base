import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectCategories, selectCategoryLoading } from '../../../state/categories/categories.selector';
import { ICategory } from '../../categories/categories.model';
import { loadCategories } from '../../../state/categories/categories.actions';

@Component({
  selector: 'app-header-categories',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButton],
  templateUrl: './header-categories.component.html',
  styleUrls: ['./header-categories.component.scss'],
})
export class HeaderCategoriesComponent implements OnInit {
  categories$: Observable<ICategory[]>;
  loading$ = this.store.select(selectCategoryLoading);
  categories: ICategory[] = [];

  isDropdownOpen = false;
  showAllCategories = false;

  private categoriesSubscription!: Subscription;

  constructor(private store: Store) {
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit() {
    this.categoriesSubscription = this.categories$.subscribe((categories) => {
      this.categories = categories;
      if (this.categories.length > 5) {
        this.showAllCategories = true;
        this.categories = this.categories.slice(0, 5);
      } else {
        this.showAllCategories = false;
      }
    });
  }

  ngAfterViewInit() {

    this.store.dispatch(loadCategories({ page: 1, limit: 6 }));
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onCategorySelect(category: ICategory) {
    console.log('Selected category:', category.name);
    this.isDropdownOpen = false;
  }
}
