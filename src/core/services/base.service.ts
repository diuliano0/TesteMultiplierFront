import {PreloaderService} from "./preloader.service";
import {HttpHeaders} from "@angular/common/http";
import {AlertService} from "./alert.service.com";
import {isNullOrUndefined} from "util";
import {throwError} from "rxjs/index";

export abstract class BaseService {

    protected params = null;

    constructor(private preloaderService: PreloaderService) {
    }

    protected requestInterceptor(preloaderType = 'full'): void {
        this.preloaderService.showPreloader(preloaderType);
    }

    protected responseInterceptor(preloaderType = 'full'): void {
        this.preloaderService.hidePreloader(preloaderType);
    }

    getHeader() {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    protected handleError(error: any) {
        if (error.status == 422) {
            let text = '';
            for (const i in error.error.errors) {
                if (error.error.errors.hasOwnProperty(i))
                    text += `<b>${i}:</b> ${error.error.errors[i]}<br>`;
            }
            AlertService.infomessage('Informativo!', text);
        }
        if(error.status == 301){
            AlertService.infomessage('Informativo!', error.error.error.description);
        }

        if(error.status == 0) {
            AlertService.infomessage('Alerta', 'Houve uma falha de comunicação com o servidor, tente novamente mais tarde!');
        }

        return throwError(error);
    }

    createNode(rota) {
        let node = [];
        rota.data.forEach((item, key) => {
            let aux: any = [];
            if (item.hasOwnProperty('filhos') && !isNullOrUndefined(item.filhos.data)) {
                /*item.filhos.data.forEach((filho, chave) => {
                    item.filhos.data[chave] = new RepresentanteModel().deserialize(filho);
                });*/
                aux = this.createNode(item.filhos);
            }
            node.push({
                data: item,
                label: item.nome,
                expandedIcon: "fa-folder-open",
                collapsedIcon: "fa-folder",
                expanded: true,
                children: aux,
                leaf: false
            });
        });
        return node;
    }
}
