import { Routes, RouterModule } from '@angular/router';
import { AdministrativoComponent } from './administrativo.component';
import {PerfilComponent} from './components/perfil/perfil.component';
import {ModuleWithProviders} from '@angular/core';

const ADMININSTRATIVO_ROUTES: Routes = [
    {
        path: '', component: AdministrativoComponent, data: { title: 'Administrativo' },
        children: [
            {
                path: 'perfil',
                component: PerfilComponent,
                data: { title: 'Perfil' }
            },
            {
                path: 'filiais',
                loadChildren: 'src/app/administrativo/filial/filial.module#FilialModule',
            },
            {
                path: 'grupos',
                loadChildren: 'src/app/administrativo/grupo/grupo.module#GrupoModule',
            },
            {
                path: 'usuarios',
                loadChildren: 'src/app/administrativo/usuario/usuario.module#UsuarioModule',
            },
            {
                path: 'rotas',
                loadChildren: 'src/app/administrativo/rota/rota.module#RotaModule',
            },
        ]
    },
];
export const AdministrativoRoutes: ModuleWithProviders<any> = RouterModule.forChild(ADMININSTRATIVO_ROUTES);
