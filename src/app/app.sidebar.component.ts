import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthService} from "../core/services/auth.service";
import {StorageService} from "../core/services/storage.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSideBarComponent implements OnInit {

    stickMenu = {
        home: 998246,
        configuracao: 998247,
        helper: 998248
    };

    menus;

    constructor(public app: AppComponent,
                public authService: AuthService,
                private storageService: StorageService) {
    }

    ngOnInit(): void {
        this.loadMenu();
        this.storageService.watchStorage().subscribe(res => {
            if (res == 'm') {
                this.loadMenu();
            }
        });
    }

    loadMenu() {
        this.menus = this.authService.getMenu();
    }
}
