import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {GrupoListComponent} from "./grupo-list/grupo-list.component";
import {GrupoCreateComponent} from "./grupo-create/grupo-create.component";

const GRUPO_ROUTES: Routes = [
    {path: '', component: GrupoListComponent, data: {title: 'Grupos'}},
    {path: 'novo', component: GrupoCreateComponent, data: {title: 'Criar Grupos'}},
    {path: 'editar/:id', component: GrupoCreateComponent, data: {title: 'Editar Grupos'}},
];
export const GrupoRoutes: ModuleWithProviders<any> = RouterModule.forChild(GRUPO_ROUTES);

