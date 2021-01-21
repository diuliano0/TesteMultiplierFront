import {Injectable} from "@angular/core";
import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService } from 'ngx-store';
import {isNullOrUndefined} from "util";
import {Observable, Subject} from "rxjs/index";

const SHARED = 0;
const LOCAL = 1;
const SESSION = 2;
const COOKIE = 3;

@Injectable()
export class StorageService {

    private driveSelected = null;
    private storageSub = new Subject<boolean>();

    constructor(
        private localStorageService: LocalStorageService,
        private sessionStorageService: SessionStorageService,
        private cookiesStorageService: CookiesStorageService,
        private sharedStorageService: SharedStorageService,
    ) {
        cookiesStorageService.utility.forEach((value, key) => console.log(key + '=', value));
    }

    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
    }

    localStorageDrive(){
        this.initDrive(LOCAL);
        return this;
    }
    shredDrive(){
        this.initDrive(SHARED);
        return this;
    }
    sessionDrive(){
        this.initDrive(SESSION);
        return this;
    }
    cookieDrive(){
        this.initDrive(COOKIE);
        return this;
    }

    initDrive(value){
        switch (value){
            case SHARED:
                this.driveSelected = this.shared();
                break;
            case LOCAL:
                this.driveSelected = this.local();
                break;
            case SESSION:
                this.driveSelected = this.session();
                break;
            case COOKIE:
                this.driveSelected = this.cookie();
                break;
        }
    }

    private shared() {
        return this.sharedStorageService;
    }

    private local() {
        return this.localStorageService;
    }

    private session() {
        return this.sessionStorageService;
    }

    private cookie() {
        return this.cookiesStorageService;
    }

    private getDrive(){
        if(isNullOrUndefined(this.driveSelected))
            throw new Error('Drive não iniciado');

        return this.driveSelected;
    }

    set(key, value: any, expiry?: any) {
        this.setExpire(key, expiry);
        if (value instanceof Object) {
            this.getDrive().set(key, value);
            this.storageSub.next(key);
            return;
        }else{
            this.getDrive().set(key, value);
            this.storageSub.next(key);
        }
        return this;
    }

    get(key) {
        if (!this.checkExpire(key)) {
            return null;
        }
        return this.getDrive().get(key);
    }


    remove(key) {
        this.getDrive().remove(key);
    }

    has(key: any) {
        return this.checkExpire(key);
    }

    hasLocal(key: any) {
        return this.checkExpire(key);
    }

    private checkExpire(key, expiry?: any) {
        const expirename = key + '_expiry';
        const beforeExpire = this.getDrive().get(expirename);
        if (!StorageService.checkEmpty(this.getDrive().get(expirename))) {
            return true;
        }
        if (!StorageService.checkEmpty(this.getDrive().get(key))) {
            return true;
        }
        if ((new Date(beforeExpire)) > (new Date())) {
            return true;
        }
        this.getDrive().remove(key);
        this.getDrive().remove(expirename);
        return false;
    }

    private static checkEmpty(item) {
        return !!item;
    }

    private setExpire(name, expiry) {
        if (!expiry) {
            return;
        }
        const expirename = name + '_expiry';
        this.getDrive().set(expirename, expiry);
    }
}
