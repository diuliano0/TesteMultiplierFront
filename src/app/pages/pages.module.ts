import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagesComponent} from './pages.component';
import {QBreadcrumbModule} from '../../core/q-breadcrumb/q-breadcrumb.module';
import {PagesRoutes} from './pages.routing';

@NgModule({
    declarations: [
        PagesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        QBreadcrumbModule,
        ReactiveFormsModule,
        PagesRoutes
    ]
})
export class PagesModule {
}
