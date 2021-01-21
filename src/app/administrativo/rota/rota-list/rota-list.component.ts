import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ListComponentInterface} from '../../../../core/interfaces/list-component.interface';
import {ListAbstract} from '../../../../core/components/list.abstract';
import {RotaModel} from '../models/rota.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RotaService} from '../services/rota.service';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {TreeNode} from 'primeng/api';
import {ROTA_ROUTE_EDITAR, ROTA_ROUTE_NOVO} from '../rota.conts';
import {AlertService} from '../../../../core/services/alert.service.com';

@Component({
    selector: 'app-rota-list',
    templateUrl: './rota-list.component.html',
    styleUrls: ['./rota-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RotaListComponent extends ListAbstract implements OnInit, ListComponentInterface {

    files: TreeNode[];
    selectedFile: TreeNode;
    rotas;
    consulta;
    selectedRota: RotaModel;
    pesquisaForm: FormGroup;
    selectedNodes1: TreeNode[];

    private qtdItens = 8;

    cols: any[] = [
        {field: 'titulo', header: 'Titulo'},
        {field: 'parent_id', header: 'Código Pai'},
        {field: 'rota', header: 'Rota'},
        {field: 'prioridade', header: 'Prioridade'},
    ];

    constructor(private rotaService: RotaService,
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
            'core.rota_acessos.titulo': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
        });
        this.breadcrumb.setCrumbs([
            {
                label: 'Lista Rotas',
                routerLink: '/administrativo/rotas'
            }
        ]);
    }

    pesquisar(paginate: number = 0, consulta = null) {
        if (!isNullOrUndefined(consulta)) {
            this.consulta.filtro = consulta;
        }
        this.rotaService.list({
            totalitems: this.qtdItens,
            include:'filhos.filhos',
            consulta: JSON.stringify(this.consulta),
            page: paginate
        }).subscribe((res: any) => {
            this.rotas = res;
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
        let rota = this.getSelected();
        switch (url) {
            case 'cadastro':
                let parent = {};
                if (!isNullOrUndefined(this.selectedNodes1)){
                    parent = {queryParams:{
                        'parent':this.selectedNodes1['data']['id'],
                        'titulo':this.selectedNodes1['data']['titulo'],
                    }};
                }
                this.router.navigate([ROTA_ROUTE_NOVO], parent);
                break;
            case 'editar':
                if (isNullOrUndefined(this.selectedNodes1)){
                    AlertService.error('Erro!', 'Selecione um item para editar');
                    return false;
                }
                this.router.navigate([ROTA_ROUTE_EDITAR + this.selectedNodes1['data']['id']]);
                break;
            case 'excluir':
                const itens = [];
                if (isNullOrUndefined(this.selectedNodes1)){
                    AlertService.error('Erro!', 'Selecione um item para excluir');
                    return false;
                }
                itens.push(this.selectedNodes1['data']['id']);
                this.rotaService.excluir(itens).subscribe((res: any) => {
                    this.selectedNodes1 = null;
                    this.pesquisar();
                });
                break;
            default:
                break;
        }
    }

    getSelected(): any {
        return this.selectedRota;
    }

    onRowSelect(e){
        //console.log(e);
    }
}
