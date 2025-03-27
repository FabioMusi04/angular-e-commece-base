import { Component } from '@angular/core';
import { ViewComponent } from '../../../shared/view/view.component';

@Component({
  selector: 'app-orders-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './orders-view.component.html',
  styleUrl: './orders-view.component.scss'
})
export class OrdersViewComponent {
  constructor() { }

  currentItem = {
    title: 'title 1',
    description: 'Description 1',
  }
}
