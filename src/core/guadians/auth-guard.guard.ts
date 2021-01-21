import {Inject, Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
    _authService: AuthService;

    constructor(@Inject(AuthService) authService) {
        this._authService = authService;
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this._authService.isAuthenticated()) {
            this._authService.goToLogin();
        }
        return this._authService.isAuthenticated();
    }
}
