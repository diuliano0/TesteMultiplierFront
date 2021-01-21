import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ListComponentInterface} from "../../../../core/interfaces/list-component.interface";
import {ListAbstract} from "../../../../core/components/list.abstract";
import {GrupoModel} from "../models/grupo.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BreadcrumbService} from "../../../../core/q-breadcrumb/breadcrumb.service";
import {GrupoService} from "../services/grupo.service";
import {isNullOrUndefined, isObject} from "util";
import {GRUPO_ROUTE_EDITAR, GRUPO_ROUTE_NOVO} from "../grupo.conts";
import {AlertService} from "../../../../core/services/alert.service.com";

@Component({
    selector: 'app-grupo-list',
    templateUrl: './grupo-list.component.html',
    styleUrls: ['./grupo-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        AlertService
    ]
})
export class GrupoListComponent extends ListAbstract implements OnInit, ListComponentInterface {


    grupos;

    consulta;

    private qtdItens = 8;

    cols: any[] = [
        {field: 'id', header: 'Código', width: '10%'},
        {field: 'nome', header: 'Nome', width: '35%'},
        {field: 'descricao', header: 'Descricao', width: '35%'},
        {field: 'status', header: 'Status', width: '20%'}
    ];

    selectedGrupo: GrupoModel[];

    pesquisaForm: FormGroup;

    selectStatusgrupo;

    constructor(private grupoService: GrupoService,
                private breadcrumb: BreadcrumbService,
                private router: Router,
                private fb: FormBuilder) {
        super();
        this.selectStatusgrupo = GrupoModel.getStatus();
    }

    ngOnInit() {
        this.consulta = {
            order: 'id;desc',
        };
        this.pesquisaForm = this.fb.group({
            'core.grupos.nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'core.grupos.status': [null],
        });
        this.breadcrumb.setCrumbs([
            {
                label: 'Lista Grupos',
                routerLink: '/administrativo/grupos'
            }
        ]);
    }

    getUrl(url) {
        const grupo = this.getSelected();
        switch (url) {
            case 'cadastro':
                this.router.navigate([GRUPO_ROUTE_NOVO]);
                break;
            case 'editar':
                let id = null;
                if (!isObject(grupo)) {
                    AlertService.error('Erro!', 'Selecione um item para editar');
                    return false;
                }
                this.router.navigate([GRUPO_ROUTE_EDITAR + (isObject(grupo) ? grupo.id : null)]);
                break;
            case 'excluir':
                const itens = [];
                if (isNullOrUndefined(this.selectedGrupo)) {
                    AlertService.error('Erro!', 'Selecione um item para excluir');
                    return false;
                }
                itens.push(this.selectedGrupo['id']);
                this.grupoService.excluir(itens).subscribe((res: any) => {
                    this.selectedGrupo = null;
                    this.pesquisar();
                });
                break;
            default:
                break;
        }
    }

    getSelected(): any {
        return this.selectedGrupo;
    }

    loadData(ev) {
        if (ev.sortField) {
            this.consulta.order = ev.sortField + ';' + ((ev.sortOrder == 1) ? 'asc' : 'desc');
        }
        this.pesquisar((ev.first / ev.rows) + 1);
    }

    pesquisar(paginate: number = 0, consulta = null) {
        if (!isNullOrUndefined(consulta)) {
            this.consulta.filtro = consulta;
        }
        this.grupoService.list({
            totalitems: this.qtdItens,
            consulta: JSON.stringify(this.consulta),
            page: paginate
        }).subscribe((res: any) => {
            this.grupos = res;
        });
    }

    onPage(ev) {
        this.qtdItens = ev.rows;
        this.pesquisar();
    }
}
