import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {PreloaderService} from "../../../../core/services/preloader.service";
import {StorageService} from "../../../../core/services/storage.service";
import {Observable, throwError} from "rxjs/index";
import {BaseService} from "../../../../core/services/base.service";
import {catchError, map} from "rxjs/operators";
import {ConfigService} from "../../../../core/services/config.service";
import {isNullOrUndefined} from "util";
import {GrupoModel} from "../models/grupo.model";
import {ServiceCrudInterface} from "../../../../core/interfaces/service-crud.interface";
import {RotaService} from "../../rota/services/rota.service";

@Injectable()
export class GrupoService extends BaseService implements ServiceCrudInterface {

    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/core/grupo';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService,
                private rotaService: RotaService) {
        super(preloaderService);

    }

    listaGrupos(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get<any[]>(this.ressourceUrl + '/select-grupos', {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                return throwError(e);
            }),
            map((response: any) => {
                response.data.forEach((item, key) => {
                    response.data[key] = {
                        label: item.nome,
                        value: item.id,
                    };
                });
                return response;
            })
        );
    }

    listaDashboards(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get<any[]>(this.ressourceUrl + '/listDashBoard', {
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
                        value: item.tag,
                    };
                });
                return response;
            })
        );
    }

    list(params: any = {}, headers: HttpHeaders = null): Observable<GrupoModel> {
        this.requestInterceptor();
        return this.http.get<GrupoModel[]>(this.ressourceUrl, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data.forEach((item, key) => {
                    response.data[key] = new GrupoModel().deserialize(item);
                });
                return response;
            })
        );
    }

    get(id, params: any = {}, headers: HttpHeaders = null): Observable<GrupoModel> {
        this.requestInterceptor();
        return this.http.get<GrupoModel[]>(this.ressourceUrl + `/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new GrupoModel().deserialize(response.data);
                response.rota_tree = [];
                if(response.data.hasOwnProperty('rotas'))
                    response.rota_tree = this.rotaService.createNode({data: response.data.rotas});
                return response;
            })
        );
    }

    excluir(params: any = {}, headers: HttpHeaders = null): Observable<any> {
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
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );
    }

    update(id, data, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.put(this.ressourceUrl + `/${id}`, data, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );
    }
}
