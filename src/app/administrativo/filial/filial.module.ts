import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    InputSwitchModule,
    InputTextModule,
    MultiSelectModule,
    SplitButtonModule,
    ToolbarModule
} from 'primeng';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TelefoneModule } from '../shared/telefone/telefone.module';
import { EnderecoModule } from '../shared/endereco/endereco.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ShowItemModule } from '../../../core/pipes/show-item/show-item.module';
import { CoreService } from '../shared/services/core.service';
import { ErrorMessageModule } from '../../../core/widgets/error-message/error-message.module';

import { FilialRoutes } from './filial.routing';
import { FilialService } from './services/filial.service';
import { FilialListComponent } from './filial-list/filial-list.component';
import { FilialCreateComponent } from './filial-create/filial-create.component';
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FilialRoutes,
        TableModule,
        InputTextModule,
        ButtonModule,
        ToolbarModule,
        SplitButtonModule,
        DialogModule,
        TelefoneModule,
        EnderecoModule,
        CalendarModule,
        TextMaskModule,
        ShowItemModule,
        DropdownModule,
        MultiSelectModule,
        InputSwitchModule,
        CurrencyMaskModule,
        FileUploadModule,
        ErrorMessageModule
    ],
    declarations: [
        FilialListComponent,
        FilialCreateComponent,
    ],
    providers: [
        FilialService,
        CoreService
    ],
})
export class FilialModule {
}
