import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {isNullOrUndefined, isObject} from 'util';
import {ListAbstract} from '../../../../core/components/list.abstract';
import {ListComponentInterface} from '../../../../core/interfaces/list-component.interface';
import {LocadorModel} from '../models/locador.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocadorService} from '../services/locador.service';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LOCADOR_ROUTE_EDITAR, LOCADOR_ROUTE_NOVO} from '../locador.conts';
import {AlertService} from '../../../../core/services/alert.service.com';

@Component({
    selector: 'app-locador-list',
    templateUrl: './locador-list.component.html',
    styleUrls: ['./locador-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LocadorListComponent extends ListAbstract implements OnInit, ListComponentInterface {

    locadores;
    consulta;
    private qtdItens = 8;
    selectedBenediciario: LocadorModel[];
    pesquisaForm: FormGroup;
    load: boolean;
    isMedBrasil;

    cols: any[] = [
        {field: 'pessoa.nome', header: 'Nome'},
        {field: 'pessoa.email', header: 'Email'},
        {field: 'pessoa.cpf_cnpj', header: 'CPF'},
    ];

    constructor(private locadorService: LocadorService,
                private breadcrumb: BreadcrumbService,
                private router: Router,
                private fb: FormBuilder,
                private route: ActivatedRoute) {

        super();
    }

    ngOnInit() {
        this.isMedBrasil = this.route.snapshot.data['isMedBrasil'] || false;
        this.consulta = {
            order: 'id;desc',
        };
        this.pesquisaForm = this.fb.group({
            'core.pessoas.email': [null],
            'core.pessoas.nome': [null],
            'core.pessoas.cpf_cnpj': [null],
        });
        this.breadcrumb.setCrumbs([
            {
                label: 'Lista Locadores',
                routerLink: '/locacao/locador'
            }
        ]);
    }

    pesquisar(paginate: number = 0, consulta = null) {
        this.load = true;
        if (!isNullOrUndefined(consulta)) {
            this.consulta.filtro = consulta;
        }

        // Verifica se medbrasil está logada
        if (this.isMedBrasil) {
            this.locadorService.listAdm({
                include: 'pessoa,user',
                totalitems: this.qtdItens,
                consulta: JSON.stringify(this.consulta),
                page: paginate
            }).subscribe((res: any) => {
                this.locadores = res;
                this.load = false;
            });
        } else {
            this.locadorService.list({
                include: 'pessoa,user',
                totalitems: this.qtdItens,
                consulta: JSON.stringify(this.consulta),
                page: paginate
            }).subscribe((res: any) => {
                this.locadores = res;
                this.load = false;
            });
        }

    }

    loadData(ev) {
        if (ev.sortField) {
            this.consulta.order = ev.sortField + ';' + ((ev.sortOrder == 1) ? 'asc' : 'desc');
        }
        this.pesquisar((ev.first / ev.rows) + 1);
    }

    onPage(ev) {
        this.qtdItens = ev.rows;
        this.loadData(ev);
    }

    getUrl(url) {
        let locador = this.getSelected();
        switch (url) {
            case 'cadastro':
                this.router.navigate([LOCADOR_ROUTE_NOVO]);
                break;
            case 'editar':
                if (!isObject(locador)) {
                    AlertService.infomessage('Informativo!', 'Selecione um locador para poder editar.');
                    return false;
                }
                if (locador.pessoa.cpf_cnpj.length > 17) {
                    AlertService.infomessage('Informativo!', 'Locador não pode ser editado.');
                    return false;
                }
                this.router.navigate([LOCADOR_ROUTE_EDITAR + (isObject(locador) ? locador.id : null)]);
                break;
            case 'excluir':
                const itens = [];
                if (isObject(locador)) {
                    itens.push(locador.id);
                } else {
                    locador.forEach(x => {
                        itens.push(x.id);
                    });
                }
                this.locadorService.excluir({
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
        return this.selectedBenediciario;
    }

    onRowSelect(e) {
        //console.log(e);
    }
}
