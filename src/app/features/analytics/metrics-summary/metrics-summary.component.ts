import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metrics-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics-summary.component.html',
  styleUrls: ['./metrics-summary.component.scss'],
})
export class MetricsSummaryComponent {
  totalSales = 12500.5;
  totalOrders = 342;
  totalProducts = 56;
}
