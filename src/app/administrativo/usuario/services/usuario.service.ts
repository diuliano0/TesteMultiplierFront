import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {PreloaderService} from "../../../../core/services/preloader.service";
import {StorageService} from "../../../../core/services/storage.service";
import {Observable, throwError} from "rxjs/index";
import {BaseService} from "../../../../core/services/base.service";
import {catchError, map} from "rxjs/operators";
import {ConfigService} from "../../../../core/services/config.service";
import {UsuarioModel} from "../models/usuario.model";
import {ServiceCrudInterface} from "../../../../core/interfaces/service-crud.interface";


@Injectable()
export class UsuarioService extends BaseService implements ServiceCrudInterface {
    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/core/user';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService) {
        super(preloaderService);
    }


    list(params: any = {}, headers: HttpHeaders = null): Observable<UsuarioModel> {
        this.requestInterceptor();
        return this.http.get<UsuarioModel[]>(this.ressourceUrl, {
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
                    response.data[key] = new UsuarioModel().deserialize(item);
                });
                return response;
            })
        );
    }

    get(id, params: any = {}, headers: HttpHeaders = null): Observable<UsuarioModel> {
        this.requestInterceptor();
        return this.http.get<UsuarioModel[]>(this.ressourceUrl + `/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new UsuarioModel().deserialize(response.data);
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
        return this.http.put(this.ressourceUrl + `/${id}`, data, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return this.handleError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );
    }

    userUpdate(data, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.put(this.ressourceUrl + `/userupdate`, data, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return this.handleError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );
    }


    perfil(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.get(this.ressourceUrl + '/perfil', {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new UsuarioModel().deserialize(response.data);
                return response;
            })
        );
    }

    recuperarSenha(data, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.post(this.ressourceUrl + '/password/reset', data, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return this.handleError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );
    }

    resetarSenha(data, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.post(this.ressourceUrl + '/password/reset/change', data, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return this.handleError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );
    }



}
