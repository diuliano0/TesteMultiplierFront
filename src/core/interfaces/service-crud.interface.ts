import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
export interface ServiceCrudInterface{
    list(params: any , headers: HttpHeaders): Observable<Object>;
    get(id, params: any , headers: HttpHeaders): Observable<Object>;
    excluir(params: any , headers: HttpHeaders): Observable<Object>;
    create(data, params: any , headers: HttpHeaders): Observable<Object>;
    update(id, data, params: any , headers: HttpHeaders): Observable<Object>;
}