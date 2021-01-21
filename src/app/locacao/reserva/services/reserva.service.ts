import {Injectable} from '@angular/core';
import {BaseService} from '../../../../core/services/base.service';
import {ServiceCrudInterface} from '../../../../core/interfaces/service-crud.interface';
import {ConfigService} from '../../../../core/services/config.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {PreloaderService} from '../../../../core/services/preloader.service';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable, throwError} from 'rxjs';
import {FaturaModel} from '../../fatura/model/fatura.model';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class ReservaService  extends BaseService implements ServiceCrudInterface {

    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/locacao/reserva';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService,
                private storageService: StorageService) {
        super(preloaderService);
    }

    list(params: any = {}, headers: HttpHeaders = null): Observable<FaturaModel> {
        this.requestInterceptor();
        return this.http.get<FaturaModel[]>(this.ressourceUrl, {
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
                    response.data[key] = new FaturaModel().deserialize(item);
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
                response.data = new FaturaModel().deserialize(response.data);
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

    cancelar(id, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.get<any[]>(this.ressourceUrl + `/cancelar/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new FaturaModel().deserialize(response.data);
                return response;
            })
        );
    }

    reservar(horarioId, locadorId, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.get<any[]>(this.ressourceUrl + `/agendar/${horarioId}/${locadorId}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new FaturaModel().deserialize(response.data);
                return response;
            })
        );
    }

}
