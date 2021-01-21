import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import {SplitButtonModule, ChartModule, CalendarModule, TreeModule, TreeDragDropService} from 'primeng';
import { DashboardRoutes } from './dashboard.routing';
import { BreadcrumbService } from 'src/core/q-breadcrumb/breadcrumb.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import {DashboardService} from "./services/dashboard.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        DashboardDetailComponent,
        BarChartComponent,
        PieChartComponent
    ],
    imports: [
        CommonModule,
        SplitButtonModule,
        DashboardRoutes,
        ChartModule,
        CalendarModule,
        TreeModule,
        ReactiveFormsModule,
    ],
    exports: [],
    providers: [
        BreadcrumbService,
        TreeDragDropService,
        DashboardService
    ],
})
export class DashboardModule {}
