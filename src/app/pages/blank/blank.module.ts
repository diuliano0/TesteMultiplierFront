import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageBlankListComponent} from './blank-list/page-blank-list.component';
import {ButtonModule, DropdownModule, InputTextModule, ToolbarModule} from 'primeng';
import {TableModule} from 'primeng/table';
import {ShowItemModule} from '../../../core/pipes/show-item/show-item.module';
import {EditorModule} from 'primeng/editor';
import {DragDropModule} from '../../shared/drag-drop/drag-drop.module';
import {MultiSelectModule} from 'primeng/multiselect';
import {BlankRoutes} from './blank.routing';

@NgModule({
    declarations: [
        PageBlankListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        ToolbarModule,
        TableModule,
        ShowItemModule,
        InputTextModule,
        DropdownModule,
        EditorModule,
        DragDropModule,
        MultiSelectModule,
        ReactiveFormsModule,
        BlankRoutes
    ]
})
export class BlankModule {
}
