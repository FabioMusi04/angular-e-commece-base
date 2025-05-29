import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../analytics.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js'; // Import from 'chart.js'

@Component({
  selector: 'app-sales-visualization',
  templateUrl: './sales-visualization.component.html',
  styleUrls: ['./sales-visualization.component.scss'],
  standalone: true,
  imports: [CommonModule, NgChartsModule],
})
export class SalesVisualizationComponent implements OnInit {
  salesData: { date: string; sales: number }[] = [];
  chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [],
  };
  chartType: ChartType = 'bar';
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getSalesData().subscribe((salesData) => {
      this.salesData = salesData;
      this.updateChartData(salesData);
    });
  }

  updateChartData(salesData: { date: string; sales: number }[]): void {
    this.chartData = {
      labels: salesData.map((data) => data.date),
      datasets: [
        {
          label: 'Sales by Day',
          data: salesData.map((data) => data.sales),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
}