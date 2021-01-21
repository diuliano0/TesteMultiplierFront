import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocadorListComponent} from './locador-list/locador-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {
    CalendarModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule, PanelModule,
    SplitButtonModule,
    TabViewModule,
    ToolbarModule
} from 'primeng';
import {TextMaskModule} from 'angular2-text-mask';
import {ShowItemModule} from '../../../core/pipes/show-item/show-item.module';
import {ErrorMessageModule} from '../../../core/widgets/error-message/error-message.module';
import {TelefoneModule} from '../../administrativo/shared/telefone/telefone.module';
import {EnderecoModule} from '../../administrativo/shared/endereco/endereco.module';
import {PessoaModule} from '../../administrativo/shared/pessoa/pessoa.module';
import {UserModule} from '../../administrativo/shared/user/user.module';
import {StripHtmlModule} from '../../../core/pipes/strip-html/strip-html.module';
import {LocadorRoutes} from './locador.routing';
import {LocadorService} from './services/locador.service';
import {LocadorCreateComponent} from './locador-create/locador-create.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LocadorRoutes,
        TableModule,
        InputTextModule,
        ButtonModule,
        ToolbarModule,
        SplitButtonModule,
        DialogModule,
        CalendarModule,
        TextMaskModule,
        ShowItemModule,
        DropdownModule,
        MultiSelectModule,
        ErrorMessageModule,
        TelefoneModule,
        EnderecoModule,
        PessoaModule,
        CalendarModule,
        UserModule,
        TabViewModule,
        PanelModule,
        StripHtmlModule,
    ],
    declarations: [LocadorListComponent, LocadorCreateComponent],
    providers: [
        LocadorService
    ]
})
export class LocadorModule {
}
