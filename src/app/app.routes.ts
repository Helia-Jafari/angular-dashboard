import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/components/users/users.component';
import { ReportsComponent } from './features/reports/components/reports/reports.component';
import { SettingsComponent } from './features/settings/components/settings/settings.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';


export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPageComponent },
    { path: 'users', component: UsersComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: '/dashboard' } // fallback

];
