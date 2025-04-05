import { Routes } from '@angular/router';
import { canMatchAuthGuard } from './core/guards/guard.guard';

export const routes: Routes = [
  {
      path: 'orders',
      canMatch: [canMatchAuthGuard],
      loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersRoutingModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsRoutingModule)
  },
  {
      path: 'login',
      loadChildren: () => import('./features/login/login-routing.module').then(m => m.LoginRoutingModule)
  },
  {
      path: 'signup',
      loadChildren: () => import('./features/signup/signup-routing.module').then(m => m.SignupRoutingModule)
  }
];
