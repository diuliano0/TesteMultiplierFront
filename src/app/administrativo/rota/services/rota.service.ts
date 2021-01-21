import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {PreloaderService} from "../../../../core/services/preloader.service";
import {StorageService} from "../../../../core/services/storage.service";
import {Observable, throwError} from "rxjs/index";
import {BaseService} from "../../../../core/services/base.service";
import {catchError, map} from "rxjs/operators";
import {ConfigService} from "../../../../core/services/config.service";
import {ServiceCrudInterface} from "../../../../core/interfaces/service-crud.interface";
import {RotaModel} from "../models/rota.model";
import {isNullOrUndefined} from "util";

@Injectable()
export class RotaService extends BaseService implements ServiceCrudInterface {

    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/core/rotaacesso';

    static montarMenu(itens) {
        let menu = [];
        itens.forEach((item, key) => {
            let aux: any = null;
            if (item.hasOwnProperty('rotas') && !isNullOrUndefined(item.rotas.data) && (item.rotas.data.length > 0)) {
                aux = this.montarMenu(item.rotas.data);
            }
            menu.push(
                {
                    label: item.titulo,
                    icon: item.icon,
                    routerLink: [item.rota],
                    data: item,
                    items: aux
                });
        });
        return menu;
    }

    constructor(private http: HttpClient,
                preloaderService: PreloaderService,
                private storageService: StorageService) {
        super(preloaderService);

    }

    getRotasByModuloTree(modulos, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.post<any []>(this.ressourceUrl + '/lista-acesso', modulos, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data.forEach((item, key) => {
                    response.data[key] = new RotaModel().deserialize(item);
                });
                return this.createNode(response);
            })
        );
    }


    list(params: any = {}, headers: HttpHeaders = null): Observable<RotaModel> {
        this.requestInterceptor();
        return this.http.get<RotaModel[]>(this.ressourceUrl, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data.forEach((item, key) => {
                    response.data[key] = new RotaModel().deserialize(item);
                });
                response.data_tree = {data: this.createNode(response)};
                return response;
            })
        );
    }

    get(id, params: any = {}, headers: HttpHeaders = null): Observable<RotaModel> {
        this.requestInterceptor();
        return this.http.get<RotaModel[]>(this.ressourceUrl + `/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new RotaModel().deserialize(response.data);
                return response;
            })
        );
    }

    excluir(params: any[], headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        if (params.length > 1) {
            return this.http.post(this.ressourceUrl + '/destroy-all', {
                ids: params,
                headers: headers
            }).pipe(
                catchError((e) => {
                    this.responseInterceptor();
                    return throwError(e);
                }),
                map((response: any) => {
                    this.responseInterceptor();
                    return response;
                })
            );
        }

        return this.http.delete(this.ressourceUrl + '/' + params[0]).pipe(
            catchError((e) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );

    }

    create(data, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.post(this.ressourceUrl, data, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e) => {
                this.responseInterceptor();
                return this.handleError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );
    }

    update(id, data, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.put(this.ressourceUrl + '/' + id, data, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e) => {
                this.responseInterceptor();
                return this.handleError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );
    }

    createNode(rota) {
        let node = [];
        rota.data.forEach((item, key) => {
            let aux: any = [];
            if (item.hasOwnProperty('filhos') && !isNullOrUndefined(item.filhos.data)) {
                aux = this.createNode(item.filhos);
            }
            node.push({
                data: item,
                label: item.titulo,
                expandedIcon: "fa-folder-open",
                collapsedIcon: "fa-folder",
                expanded: true,
                children: aux,
                leaf: false
            });
        });
        return node;
    }


    listarAmbiente(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get<any[]>(ConfigService.config().host + '/api/v1/admin/core/rotaacesso/lista-ambiente', {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                return throwError(e);
            }),
            map((response: any) => {
                response.data.forEach((item, key) => {
                    response.data[key] = {
                        label: item.descricao,
                        value: item.id
                    };
                });
                return response;
            })
        );
    }
}
