import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuarioListComponent} from './usuario-list/usuario-list.component';
import {UsuarioRoutes} from './usuario.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputTextModule, ToolbarModule, SplitButtonModule, MultiSelectModule, DropdownModule} from 'primeng';
import {ButtonModule} from 'primeng/button';
import {ShowItemModule} from 'src/core/pipes/show-item/show-item.module';
import {UsuarioService} from './services/usuario.service';
import {UsuarioCreateComponent} from './usuario-create/usuario-create.component';
import {TextMaskModule} from 'angular2-text-mask';
import {ErrorMessageModule} from '../../../core/widgets/error-message/error-message.module';
import {GrupoService} from '../grupo/services/grupo.service';
import {RotaService} from '../rota/services/rota.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        ToolbarModule,
        SplitButtonModule,
        ShowItemModule,
        TextMaskModule,
        MultiSelectModule,
        ErrorMessageModule,
        DropdownModule,
        UsuarioRoutes
    ],
    declarations: [
        UsuarioListComponent,
        UsuarioCreateComponent
    ],
    providers: [
        UsuarioService,
        GrupoService,
        RotaService
    ],
    exports: [
        UsuarioCreateComponent
    ]
})
export class UsuarioModule {
}
