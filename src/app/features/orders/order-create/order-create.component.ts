import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { createOrder } from '../../../state/orders/orders.actions';
import { IOrder } from '../orders.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IUser } from '../../../interfaces';
import { selectUsers } from '../../../state/users/users.selectors';
import { loadUsers } from '../../../state/users/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/alert/alert.component';
@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatInputModule, CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss'
})
export class OrderCreateComponent implements OnInit {
  dialog = inject(MatDialog);

  orderForm = this.fb.group({
    orderNumber: ['', Validators.required],
    userId: ['', Validators.required],
    totalAmount: [0, [Validators.required, Validators.min(0)]],
    status: ['pending', Validators.required],
    orderItems: [[], Validators.required],
  })

  users$: Observable<IUser[]>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.users$ = this.store.select(selectUsers);
  }

  ngOnInit() {
    this.users$.subscribe();
    this.store.dispatch(loadUsers());
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
      this.showAlert('Success', 'Order created successfully!', 'success');
      this.orderForm.reset();
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
