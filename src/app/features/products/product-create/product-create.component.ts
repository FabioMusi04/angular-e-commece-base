import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { loadCategories } from '../../../state/categories/categories.actions';
import { Observable } from 'rxjs';
import { ICategory, IProduct } from '../products.model';
import { selectCategories } from '../../../state/categories/categories.selector';
import { CommonModule } from '@angular/common';
import { createProduct } from '../../../state/products/products.actions';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatInputModule, CommonModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    categoryId: ['', Validators.required],
    stock: [0, Validators.required],
    price: [0, Validators.required],
    imageUrl: ['', Validators.required],
  })

  categories$: Observable<ICategory[]>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit() {
    this.categories$.subscribe();
    this.store.dispatch(loadCategories());
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value as IProduct;

      this.store.dispatch(createProduct({ product }));

    }
  }

}
