import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {RotaListComponent} from "./rota-list/rota-list.component";
import {RotaCreateComponent} from './rota-create/rota-create.component';

const ROTA_ROUTES: Routes = [
    {path: '', component: RotaListComponent, data: {title: 'Rotas'}},
    {path: 'novo', component: RotaCreateComponent, data: {title: 'Rotas'}},
    {path: 'editar/:id', component: RotaCreateComponent, data: {title: 'Rotas'}},
];
export const RotaRoutes: ModuleWithProviders<any> = RouterModule.forChild(ROTA_ROUTES);


