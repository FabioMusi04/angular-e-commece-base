import { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProduct, selectProductError } from '../../../state/products/products.selectors';
import { loadProduct, updateProduct } from '../../../state/products/products.actions';
import { ActivatedRoute } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ICategory, IProduct } from '../products.model';
import { selectCategories } from '../../../state/categories/categories.selector';
import { loadCategoriesWithoutPagination } from '../../../state/categories/categories.actions';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/alert/alert.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatButton, MatIcon, CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatLabel],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  dialog = inject(MatDialog);

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    categoryId: ['', Validators.required],
    stock: [0, Validators.required],
    price: [0, Validators.required],
    imageUrl: ['', Validators.required],
  })


  update = false;
  product$: Observable<IProduct | null>;
  error$: Observable<unknown | null> = this.store.select(selectProductError);
  product: IProduct | null = null;
  error: unknown | null = null;
  categories$: Observable<ICategory[]>;

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder) {
    this.product$ = this.store.select(selectProduct);
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit() {
    this.product$.subscribe((product) => {
      this.product = product;
       this.productForm.patchValue({
          name: product?.name || '',
          description: product?.description || '',
          categoryId: product?.category.id  || '',
          stock: product?.stock  || 0,
          price: product?.price || 0,
          imageUrl: product?.imageUrl  || '',
        });

      this.error$.subscribe((error) => {
        this.error = error;
      });
    });
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.store.dispatch(loadProduct({ id }));
        this.categories$.subscribe();
        this.store.dispatch(loadCategoriesWithoutPagination());

    }
  }

  onButtonClick() {
    this.update = !this.update;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value as IProduct;
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.store.dispatch(updateProduct({ id, product }));
        if (this.error == null) {
          this.update = false;
          this.showAlert('Success', 'Product updated successfully!', 'success');
        }else {
          this.showAlert('Error', 'Failed to update product. Please try again.', 'error');
        }
      }

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

