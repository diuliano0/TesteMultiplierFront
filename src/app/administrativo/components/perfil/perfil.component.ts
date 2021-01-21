import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../../../core/q-breadcrumb/breadcrumb.service";
import {AuthService} from "../../../../core/services/auth.service";
import {UsuarioModel} from "../../usuario/models/usuario.model";
import {UsuarioService} from "../../usuario/services/usuario.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css'],
    providers: [
        AuthService,
        UsuarioService
    ]
})
export class PerfilComponent implements OnInit {

    private _usuario: UsuarioModel;

    constructor(private breadcrumb: BreadcrumbService,
                private usuarioService: UsuarioService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.usuario = this.authService.getUsuario().data;
        this.breadcrumb.setCrumbs([
            {
                label: 'Meus Dados',
                routerLink: '/administrativo/perfil'
            }
        ]);
    }

    get usuario() {
        return this._usuario;
    }

    set usuario(value) {
        this._usuario = value;
    }

    atualizar() {
        if (!isNullOrUndefined(this.usuario)) {
            this.usuarioService.userUpdate(this.usuario).subscribe(res => {
                return this.authService.setUsuario(res);
            });
        }
    }
}
