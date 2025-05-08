import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-metrics-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics-summary.component.html',
  styleUrls: ['./metrics-summary.component.scss'],
})
export class MetricsSummaryComponent implements OnInit {
  totalSales = 0;
  totalOrders = 0;
  totalProducts = 0;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getSummaryMetrics().subscribe((metrics) => {
      this.totalSales = metrics.totalSales;
      this.totalOrders = metrics.totalOrders;
      this.totalProducts = metrics.totalProducts;
    });
  }
}