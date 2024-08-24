import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
    this.loadChartScript();
  }

  loadChartScript() {
    const script = document.createElement('script');
    script.src = '/assets/js/chart.js';
    script.onload = () => this.initializeCharts();
    document.body.appendChild(script);
  }

  initializeCharts() {
    // Your JavaScript code goes here, or call functions from your chart.js file.
  }
}