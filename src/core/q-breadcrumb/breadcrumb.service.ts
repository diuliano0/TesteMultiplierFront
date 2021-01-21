import {Injectable} from "@angular/core";
import {MenuItem} from "primeng/api";
import {Observable, Subject} from "rxjs/index";

@Injectable()
export class BreadcrumbService {
    private crumbs: Subject<MenuItem[]>;
    crumbs$: Observable<MenuItem[]>;
    itens: MenuItem[] = [];

    constructor() {
        this.crumbs = new Subject<MenuItem[]>();
        this.crumbs$ = this.crumbs.asObservable();
    }

    setCrumbs(items: MenuItem[], reset = true) {
        setTimeout(() =>{
            items.push({icon: 'pi pi-home', routerLink:'/'});
            if(this.itens.length > 0 && !reset){
                this.itens.push(items[0]);
                this.itens.reverse();
            }
            else
                this.itens = items;
            this.crumbs.next(
                (this.itens.reverse() || []).map(item => {
                    return Object.assign({}, item, {
                        routerLinkActiveOptions: {exact: true}
                    });
                })
            );
        });
    }

}