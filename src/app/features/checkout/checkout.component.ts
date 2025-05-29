import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

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
    MatIcon,
    RouterLink
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class CheckoutComponent {
  orderItems = [
    { name: 'Item 1', price: 100, quantity: 1, image: 'assets/product1.jpg' },
    { name: 'Item 2', price: 200, quantity: 2, image: 'assets/product2.jpg' },
    { name: 'Item 3', price: 300, quantity: 1, image: 'assets/product3.jpg' }
  ];
  
  billing = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St',
    city: 'Anytown',
    zip: '12345',
    cardNumber: '4111111111111111',
    expiration: '12/25',
    cvv: '123'
  };  submitBillingInfo(): void {
    // Client-side validation handled by template bindings
    if (this.isFormValid()) {
      // Show success message
      this.showOrderConfirmation();
    }
  }
  
  isFormValid(): boolean {
    return Object.values(this.billing).every(field => {
      if (typeof field === 'string') {
        return field.trim() !== '';
      }
      return true;
    });
  }
  
  showOrderConfirmation(): void {
    alert('Order placed successfully! Thank you for your purchase.');
    console.log('Billing Info:', this.billing);
    console.log('Order Total:', this.getTotal());
    // In a real app, here you would:
    // 1. Send order to backend
    // 2. Process payment
    // 3. Redirect to success page
    // 4. Clear cart
  }

  getSubtotal(): number {
    return this.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  getShippingCost(): number {
    const subtotal = this.getSubtotal();
    // Free shipping for orders over $500
    return subtotal > 500 ? 0 : 15;
  }
  
  getTaxAmount(): number {
    // Calculate tax at 7%
    return this.getSubtotal() * 0.07;
  }
  
  getTotal(): number {
    return this.getSubtotal() + this.getShippingCost() + this.getTaxAmount();
  }
}