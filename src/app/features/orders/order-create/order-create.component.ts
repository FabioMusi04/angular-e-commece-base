import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { loadCategories } from '../../../state/categories/categories.actions';
import { Observable } from 'rxjs';
import { selectCategories } from '../../../state/categories/categories.selector';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { createOrder } from '../../../state/orders/orders.actions';
import { IOrder, ICategory } from '../orders.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatInputModule, CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss'
})
export class OrderCreateComponent implements OnInit {

  orderForm = this.fb.group({
    orderNumber: ['', Validators.required],
    userId: ['', Validators.required],
    totalAmount: [0, [Validators.required, Validators.min(0)]],
    status: ['pending', Validators.required],
    orderItems: [[], Validators.required],
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
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const order: IOrder = {
        id: '',
        orderNumber: formValue.orderNumber ?? '',
        userId: formValue.userId ?? '',
        totalAmount: formValue.totalAmount ?? 0,
        status: (formValue.status as 'pending' | 'completed' | 'cancelled') ?? 'pending',
        orderItems: formValue.orderItems ?? [],
        createdBy: '', 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      };

      this.store.dispatch(createOrder({ order }));
    }
  }

  goBack() {
    window.history.back();
  }

}
