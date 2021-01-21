import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {BreadcrumbService} from "./breadcrumb.service";
import {Observable} from "rxjs/index";

@Component({
    selector: 'app-q-breadcrumb',
    templateUrl: './q-breadcrumb.component.html',
    styleUrls: ['./q-breadcrumb.component.css']
})
export class QBreadcrumbComponent implements OnInit {

    @Input('itens') crumbs$: Observable<MenuItem[]>;

    constructor(private breadcrumb: BreadcrumbService) {}

    ngOnInit() {
    }
}
