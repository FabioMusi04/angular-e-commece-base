import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component'; // Make sure you have an OrdersComponent
import { OrdersViewComponent } from './orders-view/orders-view.component';

const routes: Routes = [
  { path: '', component: OrdersListComponent },
  { path: ':id', component: OrdersViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
