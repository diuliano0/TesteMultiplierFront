import {ListAbstract} from '../../../../core/components/list.abstract';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ListComponentInterface} from '../../../../core/interfaces/list-component.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {LocacoesService} from '../services/locacoes.service';
import {Router} from '@angular/router';
import {LOCACOES_ROUTE_EDITAR, LOCACOES_ROUTE_LIST, LOCACOES_ROUTE_NOVO} from '../locacoes.conts';
import {AlertService} from '../../../../core/services/alert.service.com';
import {isNullOrUndefined, isObject} from 'util';

@Component({
  selector: 'app-locacoes-list',
  templateUrl: './locacoes-list.component.html',
  styleUrls: ['./locacoes-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocacoesListComponent extends ListAbstract implements ListComponentInterface, OnInit {
  load = true;
  locacoes;
  consulta;
  private qtdItens = 8;
  selectedEspecialidade;
  pesquisaForm: FormGroup;

  cols: any[] = [
    {field: 'id', header: 'ID'},
    {field: 'nome', header: 'Nome'},
    {field: 'categoria_locacao_id', header: 'Categoria'},
    {field: 'status', header: 'Status'},
  ];

  constructor(private breadcrumb: BreadcrumbService,
              private locacoesService: LocacoesService,
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
        label: 'Lista de Locações',
        routerLink: LOCACOES_ROUTE_LIST
      }
    ]);

    this.pesquisaForm = this.fb.group({
      'locacao.locacoes.id': [null],
      'locacao.locacoes.nome': [null],
    });
  }

  getSelected() {
    return this.selectedEspecialidade;
  }

  getUrl(url) {
    const locacoes = this.getSelected();
    switch (url) {
      case 'cadastro':
        this.router.navigate([LOCACOES_ROUTE_NOVO]);
        break;
      case 'editar':
        if (!isObject(locacoes)) {
          AlertService.infomessage('Informativo!', 'Selecione um Categoria Locação');
          return false;
        }
        this.router.navigate([LOCACOES_ROUTE_EDITAR + (isObject(locacoes) ? locacoes.id : null)]);
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

    this.locacoesService.list({
      totalitems: this.qtdItens,
      consulta: JSON.stringify(this.consulta),
      page: paginate
    }).subscribe((res: any) => {
      this.locacoes = res;
    });
  }

}
