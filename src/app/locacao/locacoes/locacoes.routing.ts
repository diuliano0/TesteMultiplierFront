import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LocacoesListComponent} from './locacoes-list/locacoes-list.component';
import {LocacoesCreateComponent} from './locacoes-create/locacoes-create.component';

const LOCACOES_ROUTES: Routes = [
    {path: '', component: LocacoesListComponent, data: {title: 'Locações'}},
    {path: 'novo', component: LocacoesCreateComponent, data: {title: 'Criar Locacoes'}},
    {path: 'editar/:id', component: LocacoesCreateComponent, data: {title: 'Editar Locacoes'}},
];
export const LocacoesRoutes: ModuleWithProviders<any> = RouterModule.forChild(LOCACOES_ROUTES);
