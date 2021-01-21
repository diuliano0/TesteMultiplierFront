import {Component, Input, OnInit} from '@angular/core';
import {UsuarioService} from "../administrativo/usuario/services/usuario.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {MessageService} from "primeng/api";
import {AlertService} from "../../core/services/alert.service.com";

@Component({
    selector: 'app-alterar-senha',
    templateUrl: './alterar-senha.component.html',
    styleUrls: ['./alterar-senha.component.css'],
    providers: [
        UsuarioService,
        MessageService
    ]
})
export class AlterarSenhaComponent implements OnInit {

    senhaForm: FormGroup;
    routeParams;
    success = false;
    constructor(public router: Router,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private usuarioService: UsuarioService) {
        this.routeParams = this.activatedRoute.snapshot.params;
    }

    ngOnInit(): void {
        this.init();
    }

    ngAfterViewInit(): void {
    }

    init() {
        this.senhaForm = this.fb.group({
            'token': [this.routeParams.hash],
            'email': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'password_confirmation': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
        });
    }

    resetarSenha(formRecuperarSenha) {
        if (!this.senhaForm.invalid) {
            this.usuarioService.resetarSenha(formRecuperarSenha).subscribe(res => {
                AlertService.sucess('Muito Bem!', res.success.description);
                this.success = true;
                this.authService.goToLogin();
            }, error => {
            });
        }
    }

}
