import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocacaoComponent} from './locacao.component';
import {QBreadcrumbModule} from '../../core/q-breadcrumb/q-breadcrumb.module';
import {LocacaoRoutes} from './locacao.routing';

@NgModule({
    declarations: [
        LocacaoComponent
    ],
    imports: [
        CommonModule,
        QBreadcrumbModule,
        LocacaoRoutes,
    ]
})
export class LocacaoModule {
}
