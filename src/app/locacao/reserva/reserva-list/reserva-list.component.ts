import {RESERVA_ROUTE_EDITAR, RESERVA_ROUTE_LIST, RESERVA_ROUTE_NOVO} from '../reserva.conts';
import {isNullOrUndefined, isObject} from 'util';
import {AlertService} from '../../../../core/services/alert.service.com';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ReservaService} from '../services/reserva.service';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ListAbstract} from '../../../../core/components/list.abstract';
import {ListComponentInterface} from '../../../../core/interfaces/list-component.interface';

@Component({
    selector: 'app-reserva-list',
    templateUrl: './reserva-list.component.html',
    styleUrls: ['./reserva-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReservaListComponent extends ListAbstract implements ListComponentInterface, OnInit {

    reserva;
    consulta;
    private qtdItens = 8;
    selectedReserva;
    pesquisaForm: FormGroup;

    cols: any[] = [
        {field: 'id', header: 'ID'},
        {field: 'locador_nome', header: 'Locador'},
        {field: 'locador_nome', header: 'Data/Hora'},
        {field: 'valor', header: 'Valor'},
        {field: 'status', header: 'Status'},
    ];

    constructor(private breadcrumb: BreadcrumbService,
                private reservaService: ReservaService,
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
                label: 'Reservas',
                routerLink: RESERVA_ROUTE_LIST
            }
        ]);

        this.pesquisaForm = this.fb.group({
            'locacao.categoria_locacoes.id': [null],
            'locacao.categoria_locacoes.descricao': [null],
        });
    }

    getSelected() {
        return this.selectedReserva;
    }

    getUrl(url) {
        const reserva = this.getSelected();
        switch (url) {
            case 'cadastro':
                this.router.navigate([RESERVA_ROUTE_NOVO]);
                break;
            case 'editar':
                if (!isObject(reserva)) {
                    AlertService.infomessage('Informativo!', 'Selecione um Categoria Locação');
                    return false;
                }
                this.router.navigate([RESERVA_ROUTE_EDITAR + (isObject(reserva) ? reserva.id : null)]);
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

        this.reservaService.list({
            totalitems: this.qtdItens,
            include: 'horarios',
            consulta: JSON.stringify(this.consulta),
            page: paginate
        }).subscribe((res: any) => {
            this.reserva = res;
        });
    }

}
