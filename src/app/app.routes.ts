import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'orders',
        loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersRoutingModule)
    }
];
