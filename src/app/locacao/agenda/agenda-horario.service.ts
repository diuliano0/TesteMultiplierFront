import {Injectable} from '@angular/core';
import {BaseService} from '../../../core/services/base.service';
import {ServiceCrudInterface} from '../../../core/interfaces/service-crud.interface';
import {ConfigService} from '../../../core/services/config.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {PreloaderService} from '../../../core/services/preloader.service';
import {StorageService} from '../../../core/services/storage.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UtilService} from '../../../core/services/util.service';
import {AgendaHorarioModel} from './agenda-horario.model';

@Injectable()
export class AgendaHorarioService extends BaseService implements ServiceCrudInterface {

    private ressourceUrl = ConfigService.config().host + '/api/v1/admin/locacao/horario';

    constructor(private http: HttpClient,
                preloaderService: PreloaderService,
                private storageService: StorageService) {
        super(preloaderService);
    }

    list(params: any = {}, headers: HttpHeaders = null): Observable<AgendaHorarioModel> {
        this.requestInterceptor();
        return this.http.get<AgendaHorarioModel[]>(this.ressourceUrl, {
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
                    response.data[key] = new AgendaHorarioModel().deserialize(item);
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
                response.data = new AgendaHorarioModel().deserialize(response.data);
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

    smartCreate(data, params: any = {}, headers: HttpHeaders = null) {
        this.requestInterceptor();
        return this.http.post(this.ressourceUrl + '/smartStore', data, {
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

    horariosByMes(locacao, mes, ano, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.get<AgendaHorarioModel[]>(this.ressourceUrl + `/horariosByMesByLocacao/${locacao}/${mes}/${ano}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new AgendaHorarioModel().deserialize(response.data);
                response.data.forEach((item, index) => {
                    response.data[index].start = UtilService.dateFrom(item.dth_inicio);
                    response.data[index].end = UtilService.dateFrom(item.dth_fim);
                    if (item.possui_reserva) {
                        /*if (item.origem == 1) {
                            response.data[index].title = item.nome_beneficiario + '\n' + item.telefone_beneficiario +
                                ' PC';
                        } else {
                            response.data[index].title = item.nome_beneficiario + '\n' + item.telefone_beneficiario +
                                ' APP';
                        }*/
                        response.data[index].title = item.locador_nome;
                        return;
                    }
                    response.data[index].title = ` - Sem Reserva - `;

                });
                return response;
            })
        );
    }

    horariosByData(data: string, prestador_id: number, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.get<AgendaHorarioModel[]>(this.ressourceUrl + `/horariosByData/${data}/${prestador_id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new AgendaHorarioModel().deserialize(response.data);
                response.data.forEach((item, index) => {
                    /*if (item.nome_beneficiario != null) {
                        if (item.origem == 1) {
                            response.data[index].title = item.nome_beneficiario + '\n' + item.telefone_beneficiario +
                                ' PC';
                        } else {
                            response.data[index].title = item.nome_beneficiario + '\n' + item.telefone_beneficiario +
                                ' APP';
                        }
                    } else {
                        if (item.qtd_agendados > 1) {
                            response.data[index].title = 'Total de vagas: ' + item.qtd_agendamento + '\n Ocupadas: ' + item.qtd_agendados;
                        } else {
                            response.data[index].title = '_____________';
                        }
                    }*/
                    response.data[index].title = 'gergereg';
                    response.data[index].start = UtilService.dateFrom(item.dth_inicio);
                    response.data[index].end = UtilService.dateFrom(item.dth_fim);
                });
                return response;
            })
        );
    }

    excluirHorario(id, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.delete(this.ressourceUrl + `/${id}`, {
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

    horariosByRotina(id: any, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.get<AgendaHorarioModel[]>(this.ressourceUrl + `/horariosByRotina/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return throwError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                response.data = new AgendaHorarioModel().deserialize(response.data);
                response.data.forEach((item, index) => {
                    /*if (item.nome_beneficiario != null) {
                        if (item.origem == 1) {
                            response.data[index].title = item.nome_beneficiario + '\n' + item.telefone_beneficiario +
                                ' PC';
                        } else {
                            response.data[index].title = item.nome_beneficiario + '\n' + item.telefone_beneficiario +
                                ' APP';
                        }
                    } else {
                        if (item.qtd_agendados > 1) {
                            response.data[index].title = 'Total de vagas: ' + item.qtd_agendamento + '\n Ocupadas: ' + item.qtd_agendados;
                        } else {
                            response.data[index].title = '_____________';
                        }
                    }*/
                    response.data[index].title = 'gergereg';
                    response.data[index].start = UtilService.dateFrom(item.dth_inicio);
                    response.data[index].end = UtilService.dateFrom(item.dth_fim);
                });
                return response;
            })
        );
    }

    destroy(id: any, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        this.requestInterceptor();
        return this.http.delete<any[]>(this.ressourceUrl + `/${id}`, {
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
