import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReservaRoutes} from './reserva.routing';
import {ReservaService} from './services/reserva.service';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { ReservaListComponent } from './reserva-list/reserva-list.component';
import {DropdownModule, ToolbarModule} from 'primeng';
import {TableModule} from 'primeng/table';
import {ShowItemModule} from '../../../core/pipes/show-item/show-item.module';


@NgModule({
    declarations: [ReservaListComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ReservaRoutes,
        ToolbarModule,
        TableModule,
        ShowItemModule,
        ButtonModule,
        InputTextModule,
        DropdownModule
    ],
    providers: [
        ReservaService,
    ]
})
export class ReservaModule {
}
