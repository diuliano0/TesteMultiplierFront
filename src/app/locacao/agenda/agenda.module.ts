import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorMessageModule} from '../../../core/widgets/error-message/error-message.module';
import {
    AutoCompleteModule,
    CalendarModule, ChartModule, InputSwitchModule, InputTextModule, MultiSelectModule,
    SplitButtonModule,
    TabViewModule,
    ToolbarModule,
    ListboxModule, FullCalendarModule, TableModule, DialogModule, ButtonModule, CheckboxModule, InputNumberModule, DropdownModule
} from 'primeng';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {TextMaskModule} from 'angular2-text-mask';
import {ShowItemModule} from '../../../core/pipes/show-item/show-item.module';
import {AgendaCalendarioComponent} from './agenda-calendario/agenda-calendario.component';
import {BrMaskerModule} from 'br-mask';
import {AgendaCreateComponent} from './agenda-create/agenda-create.component';
import {AgendaHorarioService} from './agenda-horario.service';
import {AgendaListComponent} from './agenda-list/agenda-list.component';
import {CategoriaLocacaoService} from '../categoria-locacao/services/categoria-locacao.service';
import {PagesModule} from '../../pages/pages.module';
import {AgendaRoutes} from './agenda.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        ToolbarModule,
        SplitButtonModule,
        DialogModule,
        CalendarModule,
        TextMaskModule,
        ShowItemModule,
        ListboxModule,
        DropdownModule,
        MultiSelectModule,
        CalendarModule,
        ErrorMessageModule,
        AutoCompleteModule,
        TabViewModule,
        CurrencyMaskModule,
        InputSwitchModule,
        ChartModule,
        FullCalendarModule,
        CheckboxModule,
        BrMaskerModule,
        InputNumberModule,
        PagesModule,
        AgendaRoutes
    ],
    declarations: [
        AgendaCalendarioComponent,
        AgendaCreateComponent,
        AgendaListComponent],
    providers: [
        AgendaHorarioService,
        CategoriaLocacaoService
    ]
})
export class AgendaModule {
}
