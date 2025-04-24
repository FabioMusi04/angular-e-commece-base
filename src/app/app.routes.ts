import { Routes } from '@angular/router';
import { canMatchAuthGuard } from './core/guards/guard.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home/home-routing.module').then(m => m.HomeRoutingModule)
    },
    {
        path: 'orders',
        canMatch: [canMatchAuthGuard],
        loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersRoutingModule)
    },
    {
        path: 'checkout',
        canMatch: [canMatchAuthGuard],
        loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule)
    },
    {
        path: 'cart',
        canMatch: [canMatchAuthGuard],
        loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)
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
