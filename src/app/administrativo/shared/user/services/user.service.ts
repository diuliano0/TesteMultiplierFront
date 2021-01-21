import {Injectable} from "@angular/core";
import {BaseService} from "../../../../../core/services/base.service";
import {ConfigService} from "../../../../../core/services/config.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {PreloaderService} from "../../../../../core/services/preloader.service";
import {Observable, throwError} from "rxjs/index";
import {catchError, map} from "rxjs/internal/operators";

@Injectable()
export class UserService extends BaseService {
    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/core/grupo';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService) {
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
                        value: item.id
                    };
                });
                return response;
            })
        );
    }
}
