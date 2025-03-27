import { Routes } from '@angular/router';
// import { canMatchAuthGuard } from './core/guards/guard.guard';
// canMatch: [canMatchAuthGuard] 

export const routes: Routes = [
    {
        path: 'orders',
        loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersRoutingModule)
    }
];
