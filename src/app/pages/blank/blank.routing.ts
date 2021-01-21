import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PageBlankListComponent} from './blank-list/page-blank-list.component';

const BLANK_ROUTES: Routes = [
    // {path: '', component: PageBlankListComponent, data: {title: 'Blank List'}}
    {path: 'lista', component: PageBlankListComponent, data: {title: 'Blank List'}},
];
export const BlankRoutes: ModuleWithProviders<any> = RouterModule.forChild(BLANK_ROUTES);
