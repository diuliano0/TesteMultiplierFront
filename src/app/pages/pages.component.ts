import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '../../core/q-breadcrumb/breadcrumb.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

    crumbs$: Observable<MenuItem[]>;

    constructor(private breadcrumb: BreadcrumbService) {
    }

    ngOnInit(): void {
        this.crumbs$ = this.breadcrumb.crumbs$;
    }

}
