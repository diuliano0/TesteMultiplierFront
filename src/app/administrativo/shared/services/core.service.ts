import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {PreloaderService} from "../../../../core/services/preloader.service";
import {ConfigService} from "../../../../core/services/config.service";
import {BaseService} from "../../../../core/services/base.service";
import {Observable, throwError} from "rxjs/index";
import {catchError, map} from "rxjs/internal/operators";

@Injectable()
export class CoreService extends BaseService {

    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/core/filial';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService) {
        super(preloaderService);
    }

    listaModulos(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get<any[]>(ConfigService.config().host + '/api/v1/admin/core/lista-modulos', {
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

    listaBancos(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get<any[]>(ConfigService.config().host + '/api/v1/admin/financeiro/lancamentofinanceiro/lista-bancos', {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                return throwError(e);
            }),
            map((response: any) => {
                response.data.forEach((item, key) => {
                    response.data[key] = {
                        value: item.id,
                        label: item.nome
                    };
                });
                return response;
            })
        );
    }
}
