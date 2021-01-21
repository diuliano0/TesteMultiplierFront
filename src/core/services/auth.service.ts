import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {TokenModel} from '../models/token.model';
import {map, catchError} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {PreloaderService} from './preloader.service';
import {BaseService} from './base.service';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';

const CLIENT_ID: number = ConfigService.config().client_id;
const SECRET: string = ConfigService.config().token;
const OauthLoginEndPointUrl: any = ConfigService.config().host + '/api/v1/admin/core/auth/token';
const KEY_TOKEN = 'token';
const USUARIO = 'u';
const MENU = 'm';
const ROTAS = 'r';
const DASHBOARDS = 'db';
const HORARIO_LOGIN = 'h';
const LAST_ATENDIMENTO = 'lh';

@Injectable()
export class AuthService extends BaseService {

    protected params = null;

    constructor(private http: HttpClient,
                private router: Router,
                preloaderService: PreloaderService,
                private storageService: StorageService) {
        super(preloaderService);
        this.params = {
            'client_id': CLIENT_ID,
            'client_secret': SECRET,
            'grant_type': 'password'
        };
    }

    getAccessToken(user): Observable<TokenModel> {
        user.client_id = this.params.client_id;
        user.client_secret = this.params.client_secret;
        user.grant_type = this.params.grant_type;
        this.requestInterceptor();
        return this.http.post(OauthLoginEndPointUrl, user).pipe(
            catchError((e: HttpErrorResponse) => {
                this.responseInterceptor();
                return this.handleError(e);
            }),
            map((response: any) => {
                this.responseInterceptor();
                this.setToken(response);
                return new TokenModel().deserialize(response);
            })
        );
    }

    getHeader() {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    setToken(token) {
        const expiry = new Date();
        expiry.setSeconds(token.expires_in);
        this.storageService.localStorageDrive().set(KEY_TOKEN, token, expiry);
    }

    isAuthenticated() {
        return !!this.getTokenObj();
    }

    getTokenObj() {
        return this.storageService.localStorageDrive().get(KEY_TOKEN);
    }

    getToken() {
        return this.getTokenObj().access_token;
    }

    getContextUser() {
        return this.getTokenObj().context_user;
    }

    setUsuario(obj) {
        this.setItem(USUARIO, obj);
    }

    getUsuario() {
        return this.getItem(USUARIO);
    }

    setLastAtendimento(obj) {
        return this.setItem(LAST_ATENDIMENTO, obj);
    }


    setTimeOfUse(horario: Date) {
        this.setItem(HORARIO_LOGIN, btoa(horario.toString()));
    }

    getTimeOfUse(): Date {
        return new Date(atob(this.getItem(HORARIO_LOGIN)));
    }

    removeTimeOfUse() {
        this.remove('h');
    }

    setMenu(obj) {
        this.setItem(MENU, obj);
    }

    getMenu() {
        return this.getItem(MENU);
    }

    setRotas(obj) {
        this.setItem(ROTAS, obj);
    }

    getRotas() {
        return this.getItem(ROTAS);
    }

    setDashboards(obj) {
        this.setItem(DASHBOARDS, obj);
    }

    getDashBoards() {
        return this.getItem(DASHBOARDS);
    }

    removeDashBoards() {
        this.remove('db');
    }

    logout() {
        this.removeUser();
        this.removeToken();
        this.removeRotas();
        this.removeMenu();
        this.removeDashBoards();
        this.goToLogin();
        this.removeTimeOfUse();
        //window.location.reload();
    }

    removeRotas() {
        this.remove('r');
    }

    private remove(key) {
        this.storageService.localStorageDrive().remove(key);
    }

    private setItem(key, obj) {
        this.storageService.localStorageDrive().set(key, obj);
    }

    private getItem(key) {
        return this.storageService.localStorageDrive().get(key);
    }

    removeToken() {
        this.remove(KEY_TOKEN);
    }

    removeUser() {
        this.remove('u');
    }

    removeMenu() {
        this.remove(MENU);
    }

    goToAcessoNegado() {
        this.router.navigate(['/acesso-negado']);
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }

    goToDashBoard() {
        this.router.navigate(['/']);
    }

    checkHorarioUse() {
        let horario: Date = this.getTimeOfUse();
        horario.setMinutes(horario.getMinutes() + 10000);
        let now = new Date();
        if (!isNullOrUndefined(horario)) {

            if (horario < now) {
                this.logout();
            }
        } else {
            this.logout();
        }
    }

}
