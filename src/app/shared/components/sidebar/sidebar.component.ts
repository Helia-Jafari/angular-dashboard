import {
  Component, EventEmitter, Output, HostListener,
  AfterViewInit, Input, Inject, PLATFORM_ID,
  OnInit, ViewChildren, QueryList, ElementRef
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { MatListModule } from '@angular/material/list';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit, OnInit {
  @ViewChildren('menuItem', { read: ElementRef })
  menuItemElements!: QueryList<ElementRef>;

  @Input() isMobile = true;
  private _isSidebarShown = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  @Input()
  set isSidebarShown(value: boolean) {
    this._isSidebarShown = value;
    this.updateSidebar();
  }

  get isSidebarShown(): boolean {
    return this._isSidebarShown;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      this.isSidebarShown = !this.isMobile
      this.updateSidebar();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      // انیمیشن بعد از رندر اولیه و باز شدن sidebar
      this.updateSidebar();
    }
  }

  private animateSidebarItems() {
    const items = this.menuItemElements.toArray().map(el => el.nativeElement);
    if (items.length === 0) return;

    // ابتدا همه آیتم‌ها رو مخفی و کمی پایین‌تر قرار می‌دهیم
    gsap.set(items, { opacity: 0, x: -30, duration: 0.1 });

    // انیمیشن ورود با stagger و easing جذاب
    gsap.to(items, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.1,         // فاصله بین آیتم‌ها
      ease: "power2.out",   // حرکت روان و طبیعی
    });
  }


  private updateSidebar() {
    if (!isPlatformBrowser(this.platformId)) return;

    // const width = this.isMobile
    //   ? (this.sidebarshowedInMobile ? '49px' : '0')
    //   : '250px';
    const width = this.isSidebarShown
      ? (this.isMobile ? "49px" : "250px")
      : "0";

    gsap.set('.sidebar', {
      width: width,
      ease: 'power2.inOut',
      onComplete: () => {
        // انیمیشن لینک‌ها بعد از باز شدن sidebar
        if (width !== '0') this.animateSidebarItems();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = event.target.innerWidth < 768;
      this.isSidebarShown = !this.isMobile
      this.updateSidebar();
    }
  }
}
