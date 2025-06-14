import { Routes } from '@angular/router';
import { canMatchAuthGuard } from './core/guards/guard.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home-routing.module').then(
        (m) => m.HomeRoutingModule
      ),
  },
  {
    path: 'checkout',
    canMatch: [canMatchAuthGuard],
    loadChildren: () =>
      import('./features/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
  },
  {
    path: 'cart',
    canMatch: [canMatchAuthGuard],
    loadChildren: () =>
      import('./features/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'analytics',
    canMatch: [canMatchAuthGuard],
    loadChildren: () =>
      import('./features/analytics/analytics.module').then((m) => m.AnalyticsModule),
  },
  {
    path: 'products',
    canMatch: [canMatchAuthGuard],
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsRoutingModule)
  },
  {
    path: 'orders',
    canMatch: [canMatchAuthGuard],
    loadChildren: () =>
      import('./features/orders/orders.module').then(
        (m) => m.OrdersRoutingModule
      ),
  },
  {
    path: 'categories',
    canMatch: [canMatchAuthGuard],
    loadChildren: () =>
      import('./features/categories/categories.module').then(
        (m) => m.CategoriesRoutingModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login-routing.module').then(
        (m) => m.LoginRoutingModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./features/signup/signup-routing.module').then(
        (m) => m.SignupRoutingModule
      ),
  },
];
