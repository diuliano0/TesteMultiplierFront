import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';

const USUARIOS_ROUTES: Routes = [
  {path: '', component: UsuarioListComponent, data: {title: 'Usuarios'}},
  {path: 'novo', component: UsuarioCreateComponent, data: {title: 'Usuarios'}},
  {path: 'editar/:id', component: UsuarioCreateComponent, data: {title: 'Usuarios'}},
];
export const UsuarioRoutes: ModuleWithProviders<any> = RouterModule.forChild(USUARIOS_ROUTES);

