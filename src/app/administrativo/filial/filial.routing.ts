import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FilialListComponent } from './filial-list/filial-list.component';
import { FilialCreateComponent } from './filial-create/filial-create.component';

const FILIAL_ROUTES: Routes = [
    { path: '', component: FilialListComponent, data: { title: 'Filiais' } },
    { path: 'novo', component: FilialCreateComponent, data: { title: 'Filiais' } },
    { path: 'editar/:id', component: FilialCreateComponent, data: { title: 'Filiais' } },
];
export const FilialRoutes: ModuleWithProviders<any> = RouterModule.forChild(FILIAL_ROUTES);


