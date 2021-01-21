import {LocacoesModel} from '../models/locacoes.model';
import {Injectable} from '@angular/core';
import {BaseService} from '../../../../core/services/base.service';
import {ServiceCrudInterface} from '../../../../core/interfaces/service-crud.interface';
import {ConfigService} from '../../../../core/services/config.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {PreloaderService} from '../../../../core/services/preloader.service';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ComodidadeModel} from '../../comodidade/models/comodidade.model';
import {UtilService} from '../../../../core/services/util.service';


@Injectable()
export class LocacoesService extends BaseService implements ServiceCrudInterface {

    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/locacao/locacao';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService,
                private storageService: StorageService) {
        super(preloaderService);
    }

    list(params: any = {}, headers: HttpHeaders = null): Observable<LocacoesModel> {
        this.requestInterceptor();
        return this.http.get<LocacoesModel[]>(this.ressourceUrl, {
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
                    response.data[key] = new LocacoesModel().deserialize(item);
                });
                return response;
            })
        );
    }

    listaLocacoes(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get<any[]>(this.ressourceUrl + `/listaLocacoes`, {
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
                        value: item.id
                    };
                });
                return response;
            })
        );
    }

    get(id, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.get<any[]>(this.ressourceUrl + `/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new LocacoesModel().deserialize(response.data);
                return response;
            })
        );
    }

    listaComodidade(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get<any[]>(this.ressourceUrl + `/listaComodidade`, {
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
                        value: item.id
                    };
                });

                return response;
            })
        );
    }

    removeImage(id, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get<any[]>(this.ressourceUrl + `/removeImage/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                return throwError(e);
            }),
            map((response: any) => {
                response.data = new LocacoesModel().deserialize(response.data);
                return response;
            })
        );
    }

    excluir(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.post(this.ressourceUrl + '/destroy-all', {
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

    create(data, params: any = {}, headers: HttpHeaders = null) {
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

    addImage(id, data, params: any = {}, headers: HttpHeaders = null) {
        return this.http.post(this.ressourceUrl + `/addImage/${id}`, data, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e) => {
                return this.handleError(e);
            }),
            map((response: any) => {
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
                this.handleError(e);
                return this.handleError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                return response;
            })
        );
    }
}
