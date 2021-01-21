import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ListAbstract} from 'src/core/components/list.abstract';
import {ListComponentInterface} from 'src/core/interfaces/list-component.interface';
import {UsuarioService} from '../services/usuario.service';
import {BreadcrumbService} from 'src/core/q-breadcrumb/breadcrumb.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioModel} from '../models/usuario.model';
import {isNullOrUndefined, isObject} from 'util';
import {USUARIOS_ROUTE_EDITAR, USUARIOS_ROUTE_NOVO} from '../usuario.conts';
import {AlertService} from '../../../../core/services/alert.service.com';

@Component({
    selector: 'app-usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UsuarioListComponent extends ListAbstract implements OnInit, ListComponentInterface {
    usuarios;
    consulta;
    private qtdItens = 8;
    cols: any[] = [
        {field: 'id', header: 'Código'},
        {field: 'nome', header: 'Nome'},
        {field: 'username', header: 'Usuário'},
        {field: 'status_enum.data.descricao', header: 'Status'}
    ];
    selectedUsuario: UsuarioModel[];
    pesquisaForm: FormGroup;
    selectStatusUsuario;

    constructor(private usuarioService: UsuarioService,
                private breadcrumb: BreadcrumbService,
                private router: Router,
                private fb: FormBuilder) {
        super();
        this.selectStatusUsuario = UsuarioModel.getStatus();
    }

    ngOnInit() {
        this.consulta = {
            order: "id;desc",
        };
        this.pesquisaForm = this.fb.group({
            'core.users.id': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'core.users.username': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'core.users.nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'core.users.status': [null],
        });
        this.breadcrumb.setCrumbs([
            {
                label: 'Lista Usuarios',
                routerLink: '/administrativo/usuarios'
            }
        ]);
    }

    getUrl(url) {
        let usuario = this.getSelected();
        switch (url) {
            case 'cadastro':
                this.router.navigate([USUARIOS_ROUTE_NOVO]);
                break;
            case 'editar':
                let id = null;
                if (!isObject(usuario)){
                    AlertService.error('Erro!', 'Selecione um item para editar');
                    return false;
                }
                this.router.navigate([USUARIOS_ROUTE_EDITAR + (isObject(usuario) ? usuario.id : null)]);
                break;
            case 'excluir':
                const itens = [];
                if (isNullOrUndefined(this.selectedUsuario)) {
                    AlertService.error('Erro!', 'Selecione um item para excluir');
                    return false;
                }
                itens.push(this.selectedUsuario['id']);
                this.usuarioService.excluir(itens).subscribe((res: any) => {
                    this.selectedUsuario = null;
                    this.pesquisar();
                });
                break;
            default:
                break;
        }
    }

    getSelected(): any {
        return this.selectedUsuario;
    }

    loadData(ev) {
        if (ev.sortField)
            this.consulta.order = ev.sortField + ';' + ((ev.sortOrder == 1) ? 'asc' : 'desc');
        this.pesquisar((ev.first / ev.rows) + 1);
    }

    pesquisar(paginate: number = 0, consulta = null) {
        if (!isNullOrUndefined(consulta)) {
            this.consulta.filtro = consulta;
        }
        this.usuarioService.list({
            totalitems: this.qtdItens,
            consulta: JSON.stringify(this.consulta),
            page: paginate
        }).subscribe((res: any) => {
            this.usuarios = res;
        });
    }

    onPage(ev) {
        this.qtdItens = ev.rows;
        this.pesquisar();
    }
}
