import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {CreateComponentInterface} from '../../../../core/interfaces/create-component.interface';
import {ActivatedRoute} from '@angular/router';
import {BLANK_ROUTE_LIST} from '../blank.consts';
import {FormBuilder, FormGroup} from '@angular/forms';
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-page-blank-list',
    templateUrl: './page-blank-list.component.html',
    styleUrls: ['./page-blank-list.component.scss']
})
export class PageBlankListComponent implements OnInit {

    routeParams;
    pesquisaForm: FormGroup;

    constructor(private breadcrumb: BreadcrumbService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder) {
        this.routeParams = this.activatedRoute.snapshot.params;
    }

    ngOnInit(): void {
        this.breadcrumb.setCrumbs([
            {
                label: 'Titulo da Página',
                routerLink: BLANK_ROUTE_LIST
            }
        ]);

        this.pesquisaForm = this.fb.group({
            'locacao.locacoes.id': [null],
            'locacao.locacoes.nome': [null],
        });
    }

    getUrl() {
    }

    salvar(value) {
    }

    view() {
    }

    create() {
    }

    update() {
    }

    save() {
    }

    delete() {
    }

    pesquisar(paginate: number = 0, consulta = null) {
    }

}
