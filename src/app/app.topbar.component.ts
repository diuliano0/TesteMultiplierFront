import {AfterContentInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthService} from "../core/services/auth.service";
import {isNullOrUndefined} from "util";
import {StorageService} from "../core/services/storage.service";
import {PusherService} from "../core/services/pusher.service";
import {Feed} from "../core/models/feed.model";
import {Observable, Subscription, timer} from "rxjs";
import {AlertService} from '../core/services/alert.service.com';
import {Router} from '@angular/router';


@Component({
        selector: 'app-topbar',
        template: `
            <div class="topbar clearfix">
                <div class="logo">
                    <a href="#">
                        <img src="assets/layout/images/logo-loading.png">
                    </a>
                </div>
                <span class="filial-title">{{usuario?.filial?.nome_filial}}</span>

                <!--title name project-->
                <!--<img src="assets/layout/images/logo-text.svg" class="app-name"/>-->

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="topbar-menu fadeInDown" [ngClass]="{'topbar-menu-visible': app.topbarMenuActive}">
                    <li #profile class="profile-item" [ngClass]="{'active-topmenuitem':app.activeTopbarItem === profile}">
                        <a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <div class="profile-image">
                                <img [src]="usuario?.anexo?.data?.url == undefined ? 'assets/images/user.svg': usuario?.anexo?.data?.url">
                            </div>
                            <div class="profile-info">
                                <span class="topbar-item-name profile-name">{{usuario?.nome}}</span>
                                <span class="topbar-item-name profile-role" *ngIf="usuario?.is_admin"> Administrador</span>
                            </div>
                        </a>

                        <ul class="fadeInDown">
                            <li role="menuitem">
                                <a [routerLink]="['/administrativo/perfil']" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="material-icons">person</i>
                                    <span>Meus Dados</span>
                                    <!--<span class="topbar-submenuitem-badge">5</span>-->
                                </a>
                            </li>
                            <!--<li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="material-icons">security</i>
                                    <span>Privacy</span>
                                    <span class="topbar-submenuitem-badge">2</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="material-icons">settings_applications</i>
                                    <span>Settings</span>
                                </a>
                            </li>-->
                            <li role="menuitem">
                                <a style="cursor: pointer;" (click)="logout()">
                                    <i class="material-icons">power_settings_new</i>
                                    <span>Sair</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!--<li #settings [ngClass]="{'active-topmenuitem':app.activeTopbarItem === settings}">
                        <a href="#" (click)="app.onTopbarItemClick($event,settings)">
                            <i class="topbar-icon material-icons">settings</i>
                            <span class="topbar-item-name">Settings</span>
                        </a>
                        <ul class="fadeInDown">
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="material-icons">palette</i>
                                    <span>Change Theme</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="material-icons">favorite_border</i>
                                    <span>Favorites</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="material-icons">lock</i>
                                    <span>Lock Screen</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="material-icons">wallpaper</i>
                                    <span>Wallpaper</span>
                                </a>
                            </li>
                        </ul>
                    </li>-->
                    <li #messages [ngClass]="{'active-topmenuitem':app.activeTopbarItem === messages}">
                        <a href="#" (click)="app.onTopbarItemClick($event,messages)">
                            <i class="topbar-icon material-icons">message</i>
                            <span class="topbar-badge" *ngIf="feeds.length > 0">{{feeds.length}}</span>
                            <span class="topbar-item-name">Messages</span>
                        </a>
                        <ul class="fadeInDown">
                            <li role="menuitem">
                                <a href="#" *ngFor="let feed of feeds; let i=index;" class="topbar-message" (click)="abrirOrcamento(i)">
                                    <i class="topbar-icon material-icons">assignment</i>
                                    <span>{{feed.title}}</span> - <span>{{feed.content}}</span>
                                </a>
                                <a href="#" class="topbar-message" *ngIf="feeds.length == 0">
                                    <span>Sem notificação</span>
                                </a>
                            </li>
                        </ul>
                    </li>
<!--                    <li #notifications [ngClass]="{'active-topmenuitem':app.activeTopbarItem === notifications}">-->
<!--                        <a href="#" (click)="app.onTopbarItemClick($event,notifications)">-->
<!--                            <i class="topbar-icon material-icons">timer</i>-->
<!--                            <span class="topbar-badge">4</span>-->
<!--                            <span class="topbar-item-name">Notifications</span>-->
<!--                        </a>-->
<!--                        <ul class="fadeInDown">-->
<!--                            <li role="menuitem">-->
<!--                                <a href="#" (click)="app.onTopbarSubItemClick($event)">-->
<!--                                    <i class="material-icons">bug_report</i>-->
<!--                                    <span>Pending tasks</span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li role="menuitem">-->
<!--                                <a href="#" (click)="app.onTopbarSubItemClick($event)">-->
<!--                                    <i class="material-icons">event</i>-->
<!--                                    <span>Meeting today at 3pm</span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li role="menuitem">-->
<!--                                <a href="#" (click)="app.onTopbarSubItemClick($event)">-->
<!--                                    <i class="material-icons">file_download</i>-->
<!--                                    <span>Download documents</span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li role="menuitem">-->
<!--                                <a href="#" (click)="app.onTopbarSubItemClick($event)">-->
<!--                                    <i class="material-icons">flight</i>-->
<!--                                    <span>Book flight</span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </li>-->

                    <li #search class="search-item" [ngClass]="{'active-topmenuitem':app.activeTopbarItem === search}"
                        (click)="app.onTopbarItemClick($event,search)">
                        <span class="md-inputfield">
                            <input type="text" pInputText>
                            <label>Pesquisar</label>
                            <i class="topbar-icon material-icons">search</i>
                        </span>
                    </li>

                </ul>
            </div>
        `,
    styles: [`
        .layout-wrapper .topbar .topbar-menu > li.profile-item .profile-image img {
            border-radius: 25px;
        }
        .status-atendimento {
            display: inline-flex;
            width: 55%;
            justify-content: flex-end;
        }

        .filial-title {
            color: #FFF;
            font-size: 18px;
            margin-left: 20px;
        }
    `],
        providers: [
            AuthService
        ],
    encapsulation: ViewEncapsulation.None
    }
)
export class AppTopbarComponent implements OnInit, OnDestroy, AfterContentInit {

    usuario;

    feeds: Feed[] = [];
    private feedSubscription: Subscription;
    private observableHorarioUse;

    constructor(public app: AppComponent,
                public authService: AuthService,
                private pusher: PusherService,
                private storageService: StorageService,
                private alertService: AlertService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loadUsuario();
        //this.alertas();
        this.observableHorarioUse = timer(120000,120000).subscribe(t => this.checkUse())
        this.storageService.watchStorage().subscribe(res => {
            if (res == 'u') {
                this.loadUsuario();
            }
        });

        // lógica que controta o status do atendimento no topo

    }

    ngAfterContentInit(): void {
        this.alertas();
    }

    ngOnDestroy(): void {
        this.feedSubscription.unsubscribe();
        this.observableHorarioUse.unsubscribe();
    }

    loadUsuario() {
        let usuario = this.authService.getUsuario();
        if (!isNullOrUndefined(usuario))
            this.usuario = usuario.data;
    }

    abrirOrcamento(i: number) {
        this.feeds.splice(i,1);
    }

    logout() {
        this.authService.logout();
    }


    alertas() {
        this.feedSubscription = this.pusher
            .getFeedItems()
            .subscribe((feed: Feed) => {
                this.feeds.push(feed);
            });
    }

    // Função verifica se o usuário não está usando o sistema por mais de 15 minutos
    checkUse() {
        this.authService.checkHorarioUse();
    }
}
