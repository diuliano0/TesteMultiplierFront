import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../administrativo/usuario/services/usuario.service';
import {RotaService} from '../administrativo/rota/services/rota.service';
import {AlertService} from '../../core/services/alert.service.com';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        AuthService,
        MessageService,
        UsuarioService
    ]
})
export class LoginComponent implements OnInit {

    msgs: Message[] = [];
    loginForm: FormGroup;
    recuperarSenhaForm: FormGroup;
    senhaForm: FormGroup;
    funcao = 0;
    routeParams;
    success = false;

    @Output('autenticado') autenticado = new EventEmitter<boolean>();

    constructor(private authService: AuthService,
                public router: Router,
                public usuarioService: UsuarioService,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
        this.routeParams = this.activatedRoute.snapshot.params;
    }

    ngOnInit() {
        this.init();
    }

    init() {
        this.loginForm = this.formBuilder.group({
            'nome_conta': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'username': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
        });
        this.recuperarSenhaForm = this.formBuilder.group({
            'email': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
        });
        this.senhaForm = this.formBuilder.group({
            'token': [this.routeParams.hash],
            'email': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'password_confirmation': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
        });
    }

    login(user) {
        if (!this.loginForm.invalid) {
            this.authService.getAccessToken(user.value).subscribe(res => {
                this.usuarioService.perfil({
                    include: 'grupos.dashboards,rotas,menu,anexo'
                }).subscribe(response => {
                    this.authService.setMenu(RotaService.montarMenu(response.data.menu.data));
                    this.authService.setUsuario(response);
                    this.authService.setRotas(response.data.rotas.data);
                    this.autenticado.emit(true);
                    this.authService.goToDashBoard();
                }, erro => {
                    this.showErrorViaToast();
                });
            }, erro => {
                this.showErrorViaToast();
            });
        }
    }

    private showErrorViaToast() {
        this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: 'Erro!',
            detail: 'Usuário e/ou senha incorreto(s)'
        });
    }

    mudarFunca(op) {
        this.funcao = op;
    }

    recuperar(email) {
        if (!this.recuperarSenhaForm.invalid) {
            this.usuarioService.recuperarSenha(email).subscribe(res => {
                AlertService.sucess('Enviado', res['success'].description);
            });
        }
    }

    resetarSenha(formRecuperarSenha) {
        if (!this.senhaForm.invalid) {
            this.usuarioService.resetarSenha(formRecuperarSenha).subscribe(res => {
                AlertService.sucess('Sucesso!', 'Senha alterada com sucesso!');
                this.success = true;
                this.authService.goToLogin();
            }, error => {});
        }
    }

}
