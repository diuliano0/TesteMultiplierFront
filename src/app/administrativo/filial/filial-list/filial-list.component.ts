import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FilialService} from "../services/filial.service";
import {ListAbstract} from "../../../../core/components/list.abstract";
import {FilialModel} from "../models/filial.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isArray, isNullOrUndefined, isObject} from "util";
import {ListComponentInterface} from "../../../../core/interfaces/list-component.interface";
import {Router} from "@angular/router";
import {BreadcrumbService} from "../../../../core/q-breadcrumb/breadcrumb.service";
import {FILIAL_ROUTE_EDITAR, FILIAL_ROUTE_NOVO} from "../filial.conts";


@Component({
    selector: 'app-filial-list',
    templateUrl: './filial-list.component.html',
    styleUrls: ['./filial-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FilialListComponent extends ListAbstract implements OnInit, ListComponentInterface {


    filiais;

    consulta;

    private qtdItens = 8;

    cols: any[] = [
        {field: 'id', header: 'Código'},
        {field: 'pessoa.nome', header: 'Nome'},
        {field: 'nome_conta', header: 'Conta Nome'},
        {field: 'pessoa.cpf_cnpj', header: 'CNPJ'},
        {field: 'pessoa.razao_social', header: 'Razão Social'}
    ];

    selectedFilial: FilialModel[];

    pesquisaForm: FormGroup;

    constructor(private filialService: FilialService,
                private breadcrumb: BreadcrumbService,
                private router: Router,
                private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.consulta = {
            order: "id;desc",
        };
        this.pesquisaForm = this.fb.group({
            'id': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'core.pessoas.nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'core.pessoas.cpf_cnpj': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
            'core.pessoas.razao_social': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
        });
        this.breadcrumb.setCrumbs([
            {
                label: 'Lista Conta',
                routerLink: '/administrativo/filiais'
            }
        ]);
    }

    pesquisar(paginate: number = 0, consulta = null) {
        if (!isNullOrUndefined(consulta)) {
            this.consulta.filtro = consulta;
        }
        this.filialService.list({
            include: 'pessoa',
            totalitems: this.qtdItens,
            consulta: JSON.stringify(this.consulta),
            page: paginate
        }).subscribe((res: any) => {
            this.filiais = res;
        });
    }

    loadData(ev) {
        if (ev.sortField)
            this.consulta.order = ev.sortField + ';' + ((ev.sortOrder == 1) ? 'asc' : 'desc');
        this.pesquisar((ev.first / ev.rows) + 1);
    }

    onPage(ev) {
        this.qtdItens = ev.rows;
        this.pesquisar();
    }

    getUrl(url) {
        let filial = this.getSelected();
        switch (url) {
            case 'cadastro':
                this.router.navigate([FILIAL_ROUTE_NOVO]);
                break;
            case 'editar':
                let id = null;
                if (!isObject(filial))
                    return false;
                this.router.navigate([FILIAL_ROUTE_EDITAR + (isObject(filial) ? filial.id : null)]);
                break;
            case 'excluir':
                const itens = [];
                if (isObject(filial)) {
                    itens.push(filial.id);
                } else {
                    filial.forEach(x => {
                        itens.push(x.id);
                    });
                }

                this.filialService.excluir({
                    ids: itens
                }).subscribe((res: any) => {
                    console.log(res);
                });
                break;
            default:
                break;
        }
    }

    getSelected(): any {
        return this.selectedFilial;
    }

    onRowSelect(e){
        //console.log(e);
    }
}
