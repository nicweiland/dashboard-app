import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AnalyticsComponent implements OnInit {
  totalItems: number = 0;
  averageValue: number = 0;
  latestValue: any = {};
  chart: Chart | null = null;
  data: any[] = [];

  constructor(private websocketService: WebSocketService) {}

  ngOnInit(): void {
    this.websocketService.getMessages().subscribe((message) => {
      this.data.push(message);
      this.updateMetrics();
      this.updateChart();
    });
  }

  updateMetrics(): void {
    this.totalItems = this.data.length;
    const sum = this.data.reduce((acc, item) => acc + item.value, 0);
    this.averageValue = sum / this.totalItems;
    this.latestValue = this.data[this.totalItems - 1];
  }

  updateChart(): void {
    if (!this.chart) {
      const ctx = (document.getElementById('analytics-chart') as HTMLCanvasElement).getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'line', // Example chart type
          data: {
            labels: this.data.map((item) => item.timestamp),
            datasets: [
              {
                label: 'Real-Time Data',
                data: this.data.map((item) => item.value),
                borderColor: 'blue',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    } else {
      this.chart.data.labels = this.data.map((item) => item.timestamp);
      this.chart.data.datasets[0].data = this.data.map((item) => item.value);
      this.chart.update();
    }
  }
}
