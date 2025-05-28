import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { loadCategories, loadCategoriesWithoutPagination } from '../../../state/categories/categories.actions';
import { Observable } from 'rxjs';
import { ICategory, IProduct } from '../products.model';
import { selectCategories } from '../../../state/categories/categories.selector';
import { CommonModule } from '@angular/common';
import { createProduct } from '../../../state/products/products.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/alert/alert.component';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatInputModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {
  dialog = inject(MatDialog);
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    categoryId: ['', Validators.required],
    stock: [0, Validators.required],
    price: [0, Validators.required],
    imageUrl: ['', Validators.required],
  })

  categories$: Observable<ICategory[]>;
  error$: Observable<unknown | null> = this.store.select(selectCategories);
  error: unknown | null = null;

  constructor(private fb: FormBuilder, private store: Store) {
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit() {
    this.categories$.subscribe();
    this.store.dispatch(loadCategoriesWithoutPagination());
    this.error$.subscribe((error) => {
      this.error = error;
    });

  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value as IProduct;

      this.store.dispatch(createProduct({ product }));
        this.productForm.reset();
        this.showAlert('Success', 'Product created successfully!', 'success');
        this.goBack();


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
