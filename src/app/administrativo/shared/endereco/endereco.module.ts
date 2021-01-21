import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnderecoFormComponent} from './endereco-form/endereco-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownModule, InputTextModule} from "primeng";
import {MessageModule} from "primeng/message";
import {ButtonModule} from "primeng/button";
import {TextMaskModule} from "angular2-text-mask";
import {ErrorMessageModule} from "../../../../core/widgets/error-message/error-message.module";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        MessageModule,
        DropdownModule,
        ButtonModule,
        TextMaskModule,
        ErrorMessageModule
    ],
    declarations: [EnderecoFormComponent],
    exports: [EnderecoFormComponent]
})
export class EnderecoModule {
}
