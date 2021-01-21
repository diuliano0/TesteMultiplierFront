import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../core/q-breadcrumb/breadcrumb.service';

@Component({
    selector: 'app-administrativo',
    templateUrl: './administrativo.component.html',
    styleUrls: ['./administrativo.component.css']
})
export class AdministrativoComponent implements OnInit {

    crumbs$: Observable<MenuItem[]>;

    constructor(private breadcrumb: BreadcrumbService) {
    }

    ngOnInit() {
        this.crumbs$ = this.breadcrumb.crumbs$;
    }
}
