import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {LoginComponent} from './login/login.component';
import {AuthGuardGuard} from '../core/guadians/auth-guard.guard';
import {AcessoNegadoComponent} from './acesso-negado/acesso-negado.component';
import {RotaAcessoGuardGuard} from '../core/guadians/rota-acesso-guard.guard';
import {AlterarSenhaComponent} from './alterar-senha/alterar-senha.component';

export const routes: Routes = [
    {path: '', loadChildren: 'src/app/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuardGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'alterar-senha/:hash', component: AlterarSenhaComponent, data: {title: 'Recuperar Senha'}},
    {path: 'acesso-negado', component: AcessoNegadoComponent},
    {
        path: 'administrativo',
        loadChildren: 'src/app/administrativo/administrativo.module#AdministrativoModule',
        canActivate: [AuthGuardGuard],
        canActivateChild: [RotaAcessoGuardGuard]
    },
    {
        path: 'locacao',
        loadChildren: 'src/app/locacao/locacao.module#LocacaoModule',
        canActivate: [AuthGuardGuard],
        canActivateChild: [RotaAcessoGuardGuard]
    },
    {
        path: 'pages',
        loadChildren: 'src/app/pages/pages.module#PagesModule',
        canActivate: [AuthGuardGuard],
        canActivateChild: [RotaAcessoGuardGuard]
    }
];


export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes);
