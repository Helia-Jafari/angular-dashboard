import { Component, EventEmitter, Output, HostListener, AfterViewInit, Input, Inject, PLATFORM_ID, OnInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [
    MatIconModule,
    MatToolbarModule,
    CommonModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() isMobile = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.set(".topbar", { y: -60, opacity: 0 });
      gsap.to(".topbar", { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
    }
  }

  toggleSidebarEmit() {
    this.toggleSidebar.emit()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.isMobile = event.target.innerWidth < 768;
    }
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-theme');
    }
  }

  search() {
    console.log('Search clicked');
    // اینجا می‌تونی پنل جستجو باز کنی
  }

  showNotifications() {
    console.log('Notifications clicked');
    // اینجا می‌تونی پنل نوتیفیکیشن باز کنی
  }

  accountSettings() {
    console.log('Account clicked');
    // اینجا می‌تونی صفحه پروفایل یا تنظیمات باز کنی
  }
}