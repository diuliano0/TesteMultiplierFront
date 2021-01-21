import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LocadorListComponent} from './locador-list/locador-list.component';
import {LocadorCreateComponent} from './locador-create/locador-create.component';

const LOCADOR_ROUTES: Routes = [
    {path: '', component: LocadorListComponent, data: {title: 'Locador'}},
    {path: 'novo', component: LocadorCreateComponent, data: {title: 'Criar Locador'}},
    {path: 'editar/:id', component: LocadorCreateComponent, data: {title: 'Editar Locador'}},
];
export const LocadorRoutes: ModuleWithProviders<any> = RouterModule.forChild(LOCADOR_ROUTES);

