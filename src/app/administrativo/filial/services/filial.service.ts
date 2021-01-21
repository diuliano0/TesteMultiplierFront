import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { UtilService } from '../../../../core/services/util.service';
import { PreloaderService } from '../../../../core/services/preloader.service';
import { StorageService } from '../../../../core/services/storage.service';
import { Observable, throwError } from 'rxjs/index';
import { FilialModel } from '../models/filial.model';
import { BaseService } from '../../../../core/services/base.service';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '../../../../core/services/config.service';
import { isNullOrUndefined } from 'util';
import { ServiceCrudInterface } from '../../../../core/interfaces/service-crud.interface';
import { AlertService } from '../../../../core/services/alert.service.com';

@Injectable()
export class FilialService extends BaseService implements ServiceCrudInterface {

    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/core/filial';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService) {
        super(preloaderService);
    }


    list(params: any = {}, headers: HttpHeaders = null): Observable<FilialModel> {
        this.requestInterceptor();
        return this.http.get<FilialModel[]>(this.ressourceUrl, {
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
                    response.data[key] = new FilialModel().deserialize(item);
                });
                return response;
            })
        );
    }

    get(id, params: any = {}, headers: HttpHeaders = null): Observable<FilialModel> {
        this.requestInterceptor();
        return this.http.get<FilialModel[]>(this.ressourceUrl + `/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new FilialModel().deserialize(response.data);
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

    search(filial, params: any = {}, headers: HttpHeaders = null) {
        return this.http.get<any[]>(this.ressourceUrl + `/pesquisar/${filial}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                return throwError(e);
            }),
            map((response: any) => {
                response.data.forEach((item, key) => {
                    response.data[key] = {
                        label: item.nome_filial,
                        value: item.id,
                    };
                });
                return response;
            })
        );
    }

}
