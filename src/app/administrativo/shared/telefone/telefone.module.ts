import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormTelefoneComponent} from './form-telefone/form-telefone.component';
import {TelefoneTipoPipe} from "../../../../core/pipes/telefone-tipo.pipe";
import {TableModule} from "primeng/table";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {DropdownModule, InputMaskModule, InputTextModule} from "primeng";
import {MessageModule} from "primeng/message";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        MessageModule,
        InputMaskModule,
        DropdownModule,
    ],
    declarations: [
        FormTelefoneComponent,
        TelefoneTipoPipe,
    ],
    exports: [
        FormTelefoneComponent
    ]
})
export class TelefoneModule {
}
