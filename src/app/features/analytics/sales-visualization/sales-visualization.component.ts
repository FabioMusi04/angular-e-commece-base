// sales-visualization.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-visualization',
  templateUrl: './sales-visualization.component.html',
  styleUrls: ['./sales-visualization.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class SalesVisualizationComponent implements OnInit {
  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Sales by Day',
            data: [1200, 1900, 1500, 2000, 1800, 2400, 1600],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
