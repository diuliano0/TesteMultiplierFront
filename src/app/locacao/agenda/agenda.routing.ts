import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AgendaCalendarioComponent} from './agenda-calendario/agenda-calendario.component';
import {AgendaCreateComponent} from './agenda-create/agenda-create.component';
import {AgendaListComponent} from './agenda-list/agenda-list.component';

const AGENDA_ROUTES: Routes = [
    // {path: '', component: AgendaListComponent, data: {title: 'Listagem de Agendamentos'}},
    {path: 'lista', component: AgendaListComponent, data: {title: 'Listagem de Agendamentos'}},
    {path: 'novo', component: AgendaCreateComponent, data: {title: 'Criar Agenda'}},
    {path: 'calendario', component: AgendaCalendarioComponent, data: {title: 'Calendário de Agenda'}},
    {path: 'editar/:id', component: AgendaCreateComponent, data: {title: 'Editar Agenda'}}
];
export const AgendaRoutes: ModuleWithProviders<any> = RouterModule.forChild(AGENDA_ROUTES);
