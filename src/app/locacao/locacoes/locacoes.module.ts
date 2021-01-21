import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocacoesListComponent} from './locacoes-list/locacoes-list.component';
import {LocacoesRoutes} from './locacoes.routing';
import {LocacoesService} from './services/locacoes.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule, DropdownModule, InputTextModule, ToolbarModule} from 'primeng';
import {TableModule} from 'primeng/table';
import {ShowItemModule} from '../../../core/pipes/show-item/show-item.module';
import { LocacoesCreateComponent } from './locacoes-create/locacoes-create.component';
import {EditorModule} from 'primeng/editor';
import {DragDropModule} from '../../shared/drag-drop/drag-drop.module';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
    imports: [
        CommonModule,
        LocacoesRoutes,
        ReactiveFormsModule,
        ToolbarModule,
        TableModule,
        ShowItemModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        EditorModule,
        DragDropModule,
        MultiSelectModule
    ],
    declarations: [LocacoesListComponent, LocacoesCreateComponent],
    providers: [
        LocacoesService
    ]
})
export class LocacoesModule {
}
