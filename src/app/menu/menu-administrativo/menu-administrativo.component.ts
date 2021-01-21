import { Component, OnInit } from '@angular/core';
import { ROTA_ROUTE_LIST } from '../../administrativo/rota/rota.conts';
import { GRUPO_ROUTE_LIST } from '../../administrativo/grupo/grupo.conts';
import { FILIAL_ROUTE_LIST } from '../../administrativo/filial/filial.conts';
import { USUARIOS_ROUTE_LIST } from '../../administrativo/usuario/usuario.conts';

@Component({
    selector: 'app-menu-administrativo',
    templateUrl: './menu-administrativo.component.html',
    styleUrls: ['./menu-administrativo.component.css']
})
export class MenuAdministrativoComponent implements OnInit {

    public model: any[];

    constructor() {
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Segurança', icon: 'settings',
                items: [
                    { label: 'Grupos', routerLink: [GRUPO_ROUTE_LIST] },
                    { label: 'Usuários', routerLink: [USUARIOS_ROUTE_LIST] },
                    { label: 'Rotas', routerLink: [ROTA_ROUTE_LIST] },
                ]
            },
            {
                label: 'Filiais', icon: 'business', routerLink: [FILIAL_ROUTE_LIST],
            },
            // {
            //     label: 'Config. Upload de arquivos', icon: 'cloud_upload',
            // },
        ];
    }
}
