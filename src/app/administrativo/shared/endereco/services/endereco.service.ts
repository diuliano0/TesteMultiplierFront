import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {PreloaderService} from "../../../../../core/services/preloader.service";
import {Observable, throwError} from "rxjs/index";
import {BaseService} from "../../../../../core/services/base.service";
import {catchError, map} from "rxjs/operators";
import {ConfigService} from "../../../../../core/services/config.service";
import {EnderecoModel} from "../models/endereco.model";

@Injectable()
export class EnderecoService extends BaseService {

    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/localidade';
    private ressourceFrontUrl = ConfigService.config().host + '/api/v1/front/localidade';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService) {
        super(preloaderService);

    }


    pesquisarCep(cep, params: any = {}, headers: HttpHeaders = null): Observable<EnderecoModel> {
        this.requestInterceptor();
        return this.http.get<EnderecoModel[]>(this.ressourceFrontUrl + '/cep-localidade/' + cep, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = (new EnderecoModel()).deserialize(response.data);
                return response;
            })
        );
    }
}
