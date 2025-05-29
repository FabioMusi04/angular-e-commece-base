import { Component, OnInit, inject } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/alert/alert.component';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent implements OnInit {
  dialog = inject(MatDialog);

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
      const category = this.categoryForm.value as ICategory;
      this.store.dispatch(createCategory({ category }));

      this.showAlert('Success', 'Category created successfully!', 'success');

      setTimeout(() => {
        this.goBack();
      }, 1000);
    }
  }

  goBack() {
    window.history.back();
  }

  showAlert(
    title: string,
    message: string,
    status: 'warn' | 'error' | 'info' | 'success'
  ): void {
    this.dialog.open(AlertComponent, {
      data: {
        title,
        message,
        status,
        buttons: 'ok',
        autoClose: true,
      },
    });
  }
}
