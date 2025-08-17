import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-dashboard-widgets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.css']
})
export class DashboardWidgetsComponent implements AfterViewInit {
  widgets = [
    { title: 'Revenue', value: '$75,200', trend: 'up', trendValue: '+12%', description: 'Compared to last month' },
    { title: 'Active Users', value: '1,240', trend: 'up', trendValue: '+8%', description: 'New signups increasing' },
    { title: 'Support Tickets', value: '18', trend: 'down', trendValue: '-5%', description: 'Resolved efficiently' },
    { title: 'Server Uptime', value: '99.9%', trend: 'neutral', trendValue: '0%', description: 'Stable performance' },
  ];

  @ViewChild('container') container!: ElementRef;

  ngAfterViewInit() {
    gsap.from(this.container.nativeElement.children, {
      duration: 0.8,
      opacity: 0,
      y: 30,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }
}
