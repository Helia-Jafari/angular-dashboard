import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DashboardChartsComponent } from '../../components/dashboard-charts/dashboard-charts.component';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { DashboardWidgetsComponent } from '../../components/dashboard-widgets/dashboard-widgets.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [MatCardModule, DashboardChartsComponent, DashboardHeaderComponent, DashboardWidgetsComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}