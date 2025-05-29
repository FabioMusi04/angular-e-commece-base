import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsSummaryComponent } from './metrics-summary/metrics-summary.component';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';
import { SalesVisualizationComponent } from './sales-visualization/sales-visualization.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MetricsSummaryComponent, // Make sure this is included
    RecentOrdersComponent, // Make sure this is included
    SalesVisualizationComponent, // Make sure this is included
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent {}
