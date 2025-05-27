import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { loadCategories, createCategory } from '../../../state/categories/categories.actions';
import { Observable } from 'rxjs';
import { ICategory } from '../categories.model';
import { selectCategories } from '../../../state/categories/categories.selector';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent implements OnInit {

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  categories$: Observable<ICategory[]>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit() {
    this.categories$.subscribe();
    this.store.dispatch(loadCategories({ page: 1, limit: 10 }));
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.categoryForm.valid) {
        const category = this.categoryForm.value as ICategory;
        this.store.dispatch(createCategory({ category }));
      }
    }
  }

  goBack() {
    window.history.back();
  }

}
