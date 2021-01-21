import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QBreadcrumbComponent} from './q-breadcrumb.component';
import {BreadcrumbModule} from "primeng";
import {BreadcrumbService} from "./breadcrumb.service";

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbModule
    ],
    declarations: [QBreadcrumbComponent],
    exports:[QBreadcrumbComponent],
    providers:[
        BreadcrumbService
    ]
})
export class QBreadcrumbModule {
}
