import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProduct } from '../../../state/products/products.selectors';
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
import { loadCategories } from '../../../state/categories/categories.actions';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatButton, MatIcon, CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatLabel],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {


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
  product: IProduct | null = null;
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
    });
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.store.dispatch(loadProduct({ id }));
        this.categories$.subscribe();
        this.store.dispatch(loadCategories());

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
      }

    }
  }

  goBack() {
    window.history.back();
  }
}
