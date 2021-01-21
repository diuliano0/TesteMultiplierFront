import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy, registerLocaleData} from '@angular/common';
import {AppRoutes} from './app.routes';
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {MessageModule} from 'primeng/message';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SplitButtonModule} from 'primeng/splitbutton';
import {StepsModule} from 'primeng/steps';
import {InputTextModule} from 'primeng/inputtext';
import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppSideBarComponent} from './app.sidebar.component';
import {AppSidebartabcontentComponent} from './app.sidebartabcontent.component';
import {AppTopbarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {LoginComponent} from './login/login.component';
import {WebStorageModule} from 'ngx-store';
import {AuthInterceptor} from '../core/interceptors/auth.interceptor';
import {StorageService} from '../core/services/storage.service';
import {UtilService} from '../core/services/util.service';
import {PreloaderModule} from '../core/preloader/preloader.module';
import {MenuSistemaModule} from './menu/menu-sistema.module';
import {AuthService} from '../core/services/auth.service';
import {SharedComponent} from './shared/shared.component';
import {ErrorMessageModule} from '../core/widgets/error-message/error-message.module';
import {ConfigService} from '../core/services/config.service';
import localePt from '@angular/common/locales/pt';
import {AcessoNegadoComponent} from './acesso-negado/acesso-negado.component';
import {AlterarSenhaComponent} from './alterar-senha/alterar-senha.component';
import { MascaraCpfPipe } from './mascara-cpf.pipe';
import {PusherService} from '../core/services/pusher.service';
import {AlertService} from '../core/services/alert.service.com';
import {MessageService} from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        WebStorageModule,
        BrowserAnimationsModule,
        AccordionModule,
        InputTextModule,
        MessageModule,
        ScrollPanelModule,
        SplitButtonModule,
        StepsModule,
        ToastModule,
        PreloaderModule,
        MenuSistemaModule,
        ErrorMessageModule,
        ProgressSpinnerModule,
        AppRoutes
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppSideBarComponent,
        AppSidebartabcontentComponent,
        AppTopbarComponent,
        AppFooterComponent,
        LoginComponent,
        SharedComponent,
        AcessoNegadoComponent,
        AlterarSenhaComponent,
        MascaraCpfPipe,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: ConfigService.config().language},
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        StorageService,
        UtilService,
        AuthService,
        PusherService,
        AlertService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

