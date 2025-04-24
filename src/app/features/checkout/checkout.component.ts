import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-billing-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  billing = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St',
    city: 'Anytown',
    zip: '12345',
    cardNumber: '4111111111111111',
    expiration: '12/25',
    cvv: '123'
  };

  submitBillingInfo(): void {
    if (Object.values(this.billing).some(field => field.trim() === '')) {
      alert('Please fill in all fields.');
    } else {
      alert('Billing info submitted!');
      console.log('Billing Info:', this.billing);
    }
  }
}