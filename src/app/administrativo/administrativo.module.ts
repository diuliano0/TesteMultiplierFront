import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativoRoutes } from './administrativo.routing';
import { AdministrativoComponent } from './administrativo.component';
import { FilialModule } from './filial/filial.module';
import { QBreadcrumbModule } from '../../core/q-breadcrumb/q-breadcrumb.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import {UserModule} from './shared/user/user.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FilialModule,
        QBreadcrumbModule,
        UserModule,
        ButtonModule,
        AdministrativoRoutes

    ],
    declarations: [AdministrativoComponent, PerfilComponent],
})
export class AdministrativoModule {
}
