import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoListComponent} from './grupo-list/grupo-list.component';
import {GrupoRoutes} from "./grupo.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownModule, InputTextModule, ToolbarModule} from "primeng";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {ShowItemModule} from "../../../core/pipes/show-item/show-item.module";
import {GrupoStatusModule} from "../../../core/pipes/grupo-status/grupo-status.module";
import { GrupoCreateComponent } from './grupo-create/grupo-create.component';
import {GrupoService} from "./services/grupo.service";
import {TreeModule} from 'primeng/tree';
import {RotaService} from "../rota/services/rota.service";
import {MultiSelectModule} from 'primeng/multiselect';
import {CoreService} from "../shared/services/core.service";
import {ErrorMessageModule} from "../../../core/widgets/error-message/error-message.module";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GrupoRoutes,
        TableModule,
        InputTextModule,
        ButtonModule,
        ToolbarModule,
        ShowItemModule,
        GrupoStatusModule,
        TreeModule,
        MultiSelectModule,
        DropdownModule,
        ErrorMessageModule
    ],
    declarations: [
        GrupoListComponent,
        GrupoCreateComponent,
    ],
    providers:[
        GrupoService,
        CoreService,
        RotaService
    ]

})
export class GrupoModule {
}
