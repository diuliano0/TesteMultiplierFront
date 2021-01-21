import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';

const DASHBOARD_ROUTES: Routes = [
     { path: '', component: DashboardDetailComponent, data: {title: 'DashBoard'} },
    // { path: 'path', component: FeatureComponent },
    // { path: '**', component: PageNotFoundComponent },
];

export const DashboardRoutes: ModuleWithProviders<any> = RouterModule.forChild(DASHBOARD_ROUTES);

