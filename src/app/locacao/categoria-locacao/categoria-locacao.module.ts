import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriaLocacaoListComponent} from './categoria-locacao-list/categoria-locacao-list.component';
import {CategoriaLocacaoRoutes} from './categoria-locacao.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule, DropdownModule, InputTextModule, ToolbarModule} from 'primeng';
import {TableModule} from 'primeng/table';
import {ShowItemModule} from '../../../core/pipes/show-item/show-item.module';
import {CategoriaLocacaoService} from './services/categoria-locacao.service';
import { CategoriaLocacaoCreateComponent } from './categoria-locacao-create/categoria-locacao-create.component';

@NgModule({
    imports: [
        CommonModule,
        CategoriaLocacaoRoutes,
        ReactiveFormsModule,
        ToolbarModule,
        TableModule,
        ShowItemModule,
        ButtonModule,
        InputTextModule,
        DropdownModule
    ],
    declarations: [CategoriaLocacaoListComponent, CategoriaLocacaoCreateComponent],
    providers: [
        CategoriaLocacaoService
    ]
})
export class CategoriaLocacaoModule {
}
