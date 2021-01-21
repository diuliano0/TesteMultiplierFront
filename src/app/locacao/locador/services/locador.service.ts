import {BaseService} from '../../../../core/services/base.service';
import {ServiceCrudInterface} from '../../../../core/interfaces/service-crud.interface';
import {ConfigService} from '../../../../core/services/config.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LocadorModel} from '../models/locador.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {UtilService} from '../../../../core/services/util.service';
import {StorageService} from '../../../../core/services/storage.service';
import {PreloaderService} from '../../../../core/services/preloader.service';

@Injectable()
export class LocadorService extends BaseService implements ServiceCrudInterface {

    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/locacao/locador';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService,
                private storageService: StorageService) {
        super(preloaderService);
    }

    list(params: any = {}, headers: HttpHeaders = null): Observable<LocadorModel> {
        this.requestInterceptor();
        return this.http.get<LocadorModel[]>(this.ressourceUrl, {
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
                    response.data[key] = new LocadorModel().deserialize(item);
                    response.data[key].pessoa.cpf_cnpj = UtilService.convertToCpfCnpj(response.data[key].pessoa.cpf_cnpj);
                });
                return response;
            })
        );
    }

    listAdm(params: any = {}, headers: HttpHeaders = null): Observable<LocadorModel> {
        // this.requestInterceptor();
        return this.http.get<LocadorModel[]>(this.ressourceUrl + '/listagemAdm', {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                // this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                //this.responseInterceptor();
                response.data.forEach((item, key) => {
                    response.data[key] = new LocadorModel().deserialize(item);
                    response.data[key].pessoa.cpf_cnpj = UtilService.convertToCpfCnpj(response.data[key].pessoa.cpf_cnpj);
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
                response.data = new LocadorModel().deserialize(response.data);
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

    listaLocadores(id, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.get<any[]>(this.ressourceUrl + `/pesquisar/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new LocadorModel().deserialize(response.data);
                response.data.forEach((item, key) => {
                    response.data[key].label = item.nome_locador;
                    response.data[key].value = item.id;
                });
                return response;
            })
        );
    }

}
