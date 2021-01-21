import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {ConfigService} from "../../../core/services/config.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {PreloaderService} from "../../../core/services/preloader.service";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable()
export class DashboardService extends BaseService {

    private ressourceUrl = ConfigService.config().host;

    constructor(private http: HttpClient,
                preloaderService: PreloaderService) {
        super(preloaderService);
    }

    get(endpoint: string, params: any = {}) {
        // this.requestInterceptor();
        return this.http.get(this.ressourceUrl + endpoint, {params}).pipe(
            catchError((e: HttpErrorResponse) => {
                // this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                // this.responseInterceptor();
                // response.data.forEach((item, key) => {
                //     response.data[key] = new MovimentacaoFinanceiraModel().deserialize(item);
                // });
                return response;
            })
        );
    }

}
