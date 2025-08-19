import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { gsap } from 'gsap';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css']
})
export class DashboardChartsComponent implements AfterViewInit {

  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart') doughnutChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('radarChart') radarChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('polarChart') polarChart!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {

        this.initLineChart();
        this.initBarChart();
        this.initDoughnutChart();
        this.initPieChart();
        this.initRadarChart();
        this.initPolarAreaChart();

        // GSAP animation
        gsap.set(".chart-card", { opacity: 0, y: 50 });
        gsap.to(".chart-card", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        });
      }, 500);
    }
  }

  private createGradient(ctx: CanvasRenderingContext2D, colors: string[], height = 400) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    const step = 1 / (colors.length - 1);
    colors.forEach((color, i) => gradient.addColorStop(i * step, color));
    return gradient;
  }

  // 🎨 Line Chart (آبی مدرن)
  initLineChart() {
    const ctx = this.lineChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const gradient = this.createGradient(ctx, ['#3b82f6', '#60a5fa']);

    new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Revenue',
          data: [65, 59, 80, 81, 56],
          borderColor: '#1e3a8a',
          backgroundColor: gradient,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#1e40af',
          pointRadius: 6
        }]
      },
      options: { responsive: true }
    });
  }

  // 🎨 Bar Chart (سبز شاد)
  initBarChart() {
    const ctx = this.barChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const gradient = this.createGradient(ctx, ['#16a34a', '#4ade80']);

    new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [{
          label: 'Votes',
          data: [12, 19, 3, 5],
          backgroundColor: gradient,
          borderRadius: 12
        }]
      },
      options: { responsive: true }
    });
  }

  // 🎨 Doughnut Chart (نارنجی و زرد)
  initDoughnutChart() {
    new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Referral', 'Social'],
        datasets: [{
          data: [55, 25, 20],
          backgroundColor: ['#f97316', '#fec005ff', '#f8dc03ff'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, cutout: '60%' }
    });
  }

  // 🎨 Pie Chart (قرمز و صورتی)
  initPieChart() {
    new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Chrome', 'Safari', 'Firefox'],
        datasets: [{
          data: [60, 25, 15],
          backgroundColor: ['#ef4444', '#f87171', '#fca5a5'],
          borderWidth: 0
        }]
      },
      options: { responsive: true }
    });
  }

  // 🎨 Radar Chart (بنفش مدرن)
  initRadarChart() {
    new Chart(this.radarChart.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Running', 'Swimming', 'Cycling', 'Hiking'],
        datasets: [{
          label: 'Performance',
          data: [20, 10, 4, 2],
          backgroundColor: 'rgba(139,92,246,0.3)',
          borderColor: '#8b5cf6',
          pointBackgroundColor: '#7c3aed',
          pointRadius: 5
        }]
      },
      options: { responsive: true }
    });
  }

  // 🎨 Polar Area Chart (آبی-سبز)
  initPolarAreaChart() {
    new Chart(this.polarChart.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{
          data: [11, 16, 7, 3],
          backgroundColor: ['#0ea5e9', '#14b8a6', '#22d3ee', '#06b6d4']
        }]
      },
      options: { responsive: true }
    });
  }
}
