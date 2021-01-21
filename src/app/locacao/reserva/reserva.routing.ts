import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ReservaListComponent} from './reserva-list/reserva-list.component';


const RESERVA_ROUTES: Routes = [
    {path: '', component: ReservaListComponent, data: {title: 'Reservas'}},
    /*{path: 'novo', component: LocadorCreateComponent, data: {title: 'Criar Locador'}},
    {path: 'editar/:id', component: LocadorCreateComponent, data: {title: 'Editar Locador'}},*/
];
export const ReservaRoutes: ModuleWithProviders<any> = RouterModule.forChild(RESERVA_ROUTES);
