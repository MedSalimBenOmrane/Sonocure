import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public chart: any;

  createChart() {
    const ctx = document.getElementById('MyLineChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'Lung carcinoma',
          'Breast carcinoma',
          'Colorectal carcinoma',
          'Melanoma',
          'Prostate carcinoma',
          'Lymphoma',
          'Leukemia'
        ],
        datasets: [{
          label: 'Females',
          data: [120, 200, 80, 60, 0, 30, 40], // Data for females
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Males',
          data: [100, 30, 70, 40, 150, 20, 60], // Data for males
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Distribution of Tumor Types by Gender', // Title text
            color: 'white',
            font: {
              size: 16,
            },
            padding: {
              top: 10,
              bottom: 30
            }
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        elements: {
          line: {
            borderWidth: 3,
            borderColor: 'white'
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true,
              color: 'white'
            },
            grid: {
              color: 'white',
              lineWidth: 1
            },
            pointLabels: {
              color: 'white',
              font: {
                size: 12
              }
            },
            ticks: {
              color: 'white',
              backdropColor: 'rgba(0, 0, 0, 0)',
              font: {
                size: 10
              }
            }
          }
        }
      }
    });
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.createChart();
  }
}
