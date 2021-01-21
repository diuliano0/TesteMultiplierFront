import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs/index";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let bearer = 'authtest';
        let context = '';

        if (this.auth.isAuthenticated()) {
            bearer = this.auth.getToken();
            context = this.auth.getContextUser();
        }

        const authReq = req.clone({
            setHeaders: {
                Accept: `application/json`,
                Authorization: `Bearer ` + bearer,
                context_user: context
            }
        });
        return next.handle(authReq);
    }
}
