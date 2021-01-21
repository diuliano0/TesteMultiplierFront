import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PagesComponent} from './pages.component';

const PAGES_ROUTES: Routes = [
    {
        path: '', component: PagesComponent, data: {title: 'Blank'},
        children: [
            {
                path: 'blank',
                loadChildren: 'src/app/pages/blank/blank.module#BlankModule',
            },
        ]
    }
];
export const PagesRoutes: ModuleWithProviders<any> = RouterModule.forChild(PAGES_ROUTES);
