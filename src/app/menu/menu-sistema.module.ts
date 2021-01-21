import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';
import { MenuAdministrativoComponent } from './menu-administrativo/menu-administrativo.component';
import { MenuGeneralComponent } from './menu-general/menu-general.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        MenuInicialComponent,
        SubMenuComponent,
        MenuAdministrativoComponent,
        MenuGeneralComponent,
    ],
    exports: [
        MenuInicialComponent,
        MenuAdministrativoComponent,
        MenuGeneralComponent,
    ],
    providers: []
})
export class MenuSistemaModule {
}
