import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PessoaFormComponent} from './pessoa-form/pessoa-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule, DropdownModule, InputMaskModule, InputTextModule, MultiSelectModule} from "primeng";
import {ButtonModule} from "primeng/button";
import {ErrorMessageModule} from "../../../../core/widgets/error-message/error-message.module";
import {TextMaskModule} from "angular2-text-mask";
import {PessoaFisicaFormComponent} from "./pessoa-fisica-form/pessoa-fisica-form.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        ErrorMessageModule,
        MultiSelectModule,
        TextMaskModule,
        DropdownModule,
        CalendarModule,
        InputMaskModule

    ],
    declarations: [
        PessoaFormComponent,
        PessoaFisicaFormComponent
    ],
    exports: [
        PessoaFormComponent,
        PessoaFisicaFormComponent
    ]
})
export class PessoaModule {
}
