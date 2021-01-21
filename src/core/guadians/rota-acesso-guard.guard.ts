import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {isArray} from "util";

@Injectable({
    providedIn: 'root'
})
export class RotaAcessoGuardGuard implements CanActivateChild {

    _authService: AuthService;

    constructor(@Inject(AuthService) authService) {
        this._authService = authService;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const acesso = this._authService.getRotas();
        let novaRota = state.url;
        if (childRoute.routeConfig.path.indexOf(':') !== -1) {
            novaRota = this.hidrateRoute(novaRota, childRoute.routeConfig.path);
        }
        if (!isArray(acesso)) {
            this._authService.goToAcessoNegado();
            return false;
        }

        const podeAcessar = acesso.some(function (item) {
            return item.rota == novaRota;
        });

        if (!podeAcessar) {
            //this._authService.goToAcessoNegado();
        }

        return true;
    }

    private  hidrateRoute(s1, s2){
        let i = 0;
        let init = false;

        let rotaArray = s1.split('/');
        let rota2Array = s2.split('/');
        for (const item in rotaArray) {
            if (rotaArray.hasOwnProperty(item)) {
                if ((rotaArray[item] === rota2Array[i]) || init) {
                    rotaArray[item] = rota2Array[i];
                    init = true;
                    i++;
                }
            }
        }
        return rotaArray.join('/');
    }

}
