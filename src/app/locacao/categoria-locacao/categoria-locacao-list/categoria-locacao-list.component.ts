import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {isNullOrUndefined, isObject} from 'util';
import {ListAbstract} from '../../../../core/components/list.abstract';
import {ListComponentInterface} from '../../../../core/interfaces/list-component.interface';
import {CategoriaLocacaoService} from '../services/categoria-locacao.service';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CATEGORIA_LOCACAO_ROUTE_EDITAR, CATEGORIA_LOCACAO_ROUTE_LIST, CATEGORIA_LOCACAO_ROUTE_NOVO} from '../categoria-locacao.conts';
import {AlertService} from '../../../../core/services/alert.service.com';

@Component({
    selector: 'app-categoria-locacao-list',
    templateUrl: './categoria-locacao-list.component.html',
    styleUrls: ['./categoria-locacao-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategoriaLocacaoListComponent extends ListAbstract implements ListComponentInterface, OnInit {

    categoriaLocacao;
    consulta;
    private qtdItens = 8;
    selectedEspecialidade;
    pesquisaForm: FormGroup;

    cols: any[] = [
        {field: 'id', header: 'ID'},
        {field: 'nome', header: 'Nome'},
        {field: 'status', header: 'Status'},
    ];

    constructor(private breadcrumb: BreadcrumbService,
                private categoriaLocacaoService: CategoriaLocacaoService,
                private router: Router,
                private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.consulta = {
            order: 'id;desc',
        };

        this.breadcrumb.setCrumbs([
            {
                label: 'Lista Categoria de Locação',
                routerLink: CATEGORIA_LOCACAO_ROUTE_LIST
            }
        ]);

        this.pesquisaForm = this.fb.group({
            'locacao.categoria_locacoes.id': [null],
            'locacao.categoria_locacoes.descricao': [null],
        });
    }

    getSelected() {
        return this.selectedEspecialidade;
    }

    getUrl(url) {
        const categoriaLocacao = this.getSelected();
        switch (url) {
            case 'cadastro':
                this.router.navigate([CATEGORIA_LOCACAO_ROUTE_NOVO]);
                break;
            case 'editar':
                if (!isObject(categoriaLocacao)) {
                    AlertService.infomessage('Informativo!', 'Selecione um Categoria Locação');
                    return false;
                }
                this.router.navigate([CATEGORIA_LOCACAO_ROUTE_EDITAR + (isObject(categoriaLocacao) ? categoriaLocacao.id : null)]);
                break;
            default:
                break;
        }
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

        this.categoriaLocacaoService.list({
            totalitems: this.qtdItens,
            consulta: JSON.stringify(this.consulta),
            page: paginate
        }).subscribe((res: any) => {
            this.categoriaLocacao = res;
        });
    }

}
