import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFormComponent} from './user-form/user-form.component';
import {CalendarModule, DropdownModule, InputTextModule, MultiSelectModule, SplitButtonModule} from "primeng";
import {TextMaskModule} from "angular2-text-mask";
import {ErrorMessageModule} from "../../../../core/widgets/error-message/error-message.module";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {GrupoService} from "../../grupo/services/grupo.service";
import {ShowItemModule} from "../../../../core/pipes/show-item/show-item.module";
import {RotaService} from "../../rota/services/rota.service";

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
        ShowItemModule,
        SplitButtonModule,
    ],
    declarations: [
        UserFormComponent
    ],
    providers: [
        GrupoService,
        RotaService
    ],
    exports: [
        UserFormComponent
    ]
})
export class UserModule {
}
