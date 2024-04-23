import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WebSocketServiceVotes } from '../../services/web-socket-votes.service';

Chart.register(...registerables);

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css'],
  standalone: true,
})
export class DataVisualizationComponent implements OnInit {
  @ViewChild('myChart', { static: true }) 
  chartRef!: ElementRef<HTMLCanvasElement>;
  public myChart: Chart | undefined;
  public data: any[] = [];

  constructor(public websocketService: WebSocketServiceVotes) {}

  ngOnInit() {
    this.createChart();
    this.subscribeToRealTimeData();
  }

  createChart() {
    const canvas = this.chartRef?.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
            datasets: [
              {
                label: '# of Votes',
                data: [0, 0, 0, 0, 0, 0], // Start with zero votes
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }

  subscribeToRealTimeData() {
    this.websocketService.getMessages().subscribe((message) => {
      // Push to the list
      this.data.push(message);

      // Update the chart
      const index = this.myChart?.data.labels?.indexOf(message.color);
      if (index !== undefined && index >= 0 && this.myChart && this.myChart.data.datasets[0].data) {
        // Increment the appropriate dataset value
        this.myChart.data.datasets[0].data[index] += message.votes;
      
        this.myChart.update();
      }
    });
  }
}
