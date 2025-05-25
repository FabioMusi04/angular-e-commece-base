import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ICategory, IOrder } from '../orders.model';
import { selectCategories } from '../../../state/categories/categories.selector';
import { loadCategories } from '../../../state/categories/categories.actions';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { loadOrder, updateOrder } from '../../../state/orders/orders.actions';
import { selectOrder } from '../../../state/orders/orders.selector';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [MatButton, MatIcon, CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatLabel],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  orderForm = this.fb.group({
    orderNumber: ['', { nonNullable: true, validators: [Validators.required] }],
    userId: ['', { nonNullable: true, validators: [Validators.required] }],
    totalAmount: [0, { nonNullable: true, validators: [Validators.required] }],
    status: ['', { nonNullable: true, validators: [Validators.required] }],
    orderItems: [[]],
  });

  update = false;
  order$: Observable<IOrder | null>;
  order: IOrder | null = null;
  categories$: Observable<ICategory[]>;

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder) {
    this.order$ = this.store.select(selectOrder);
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit() {
    this.order$.subscribe((product) => {
      this.order = product;
       this.orderForm.patchValue({
          orderNumber: product?.orderNumber || '',
          userId: product?.userId || '',
          totalAmount: product?.totalAmount || 0,
          status: product?.status || '',
        });
    });
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.store.dispatch(loadOrder({ id }));
        this.categories$.subscribe();
        this.store.dispatch(loadCategories());
    }
  }

  onButtonClick() {
    this.update = !this.update;
  }

  onSubmit() {
    if (this.orderForm.valid) {
      if (!this.order) return;
      const formValue = this.orderForm.value;
      const order: IOrder = {
        ...this.order,
        orderNumber: formValue.orderNumber ?? '',
        userId: formValue.userId ?? '',
        totalAmount: formValue.totalAmount ?? 0,
        status: (formValue.status as 'pending' | 'completed' | 'cancelled') ?? 'pending',
        orderItems: formValue.orderItems ?? [],
      };
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.store.dispatch(updateOrder({ id, order }));
      }

    }
  }

  goBack() {
    window.history.back();
  }
}
