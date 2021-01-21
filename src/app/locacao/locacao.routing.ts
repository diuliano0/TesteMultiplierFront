import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LocacaoComponent } from './locacao.component';

const LOCACAO_ROUTES: Routes = [
    {
        path: '', component: LocacaoComponent, data: {title: 'Locação'},
        children: [
            {
                path: 'locador',
                loadChildren: 'src/app/locacao/locador/locador.module#LocadorModule',
            },
            {
                path: 'categoria-locacao',
                loadChildren: 'src/app/locacao/categoria-locacao/categoria-locacao.module#CategoriaLocacaoModule',
            },
            {
                path: 'locacoes',
                loadChildren: 'src/app/locacao/locacoes/locacoes.module#LocacoesModule',
            },
            {
                path: 'reservas',
                loadChildren: 'src/app/locacao/reserva/reserva.module#ReservaModule',
            },
            {
                path: 'agenda',
                loadChildren: 'src/app/locacao/agenda/agenda.module#AgendaModule',
            }
        ]
    }
];
export const LocacaoRoutes: ModuleWithProviders<any> = RouterModule.forChild(LOCACAO_ROUTES);
