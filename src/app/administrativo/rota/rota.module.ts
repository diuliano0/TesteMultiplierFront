import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RotaListComponent} from './rota-list/rota-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {
    CalendarModule, DropdownModule, InputSwitchModule, InputTextModule, MultiSelectModule, SplitButtonModule,
    ToolbarModule,
    TreeTableModule
} from 'primeng';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {RotaService} from './services/rota.service';
import {RotaRoutes} from './rota.routing';
import { RotaCreateComponent } from './rota-create/rota-create.component';
import {ErrorMessageModule} from '../../../core/widgets/error-message/error-message.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        ToolbarModule,
        SplitButtonModule,
        DialogModule,
        CalendarModule,
        RotaRoutes,
        TreeTableModule,
        InputSwitchModule,
        MultiSelectModule,
        DropdownModule,
        ErrorMessageModule,
    ],
    declarations: [
        RotaListComponent,
        RotaCreateComponent,
    ],
    providers: [
        RotaService
    ],
})
export class RotaModule {
}
