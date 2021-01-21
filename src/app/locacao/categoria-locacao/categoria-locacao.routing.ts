import {RouterModule, Routes} from '@angular/router';
import {CategoriaLocacaoListComponent} from './categoria-locacao-list/categoria-locacao-list.component';
import {ModuleWithProviders} from '@angular/core';
import {CategoriaLocacaoCreateComponent} from './categoria-locacao-create/categoria-locacao-create.component';


const CATEGORIA_LOCACAO_ROUTES: Routes = [
    {path: '', component: CategoriaLocacaoListComponent, data: {title: 'CategoriaLocacao'}},
    {path: 'novo', component: CategoriaLocacaoCreateComponent, data: {title: 'Criar CategoriaLocacao'}},
    {path: 'editar/:id', component: CategoriaLocacaoCreateComponent, data: {title: 'Editar CategoriaLocacao'}},
];
export const CategoriaLocacaoRoutes: ModuleWithProviders<any> = RouterModule.forChild(CATEGORIA_LOCACAO_ROUTES);
