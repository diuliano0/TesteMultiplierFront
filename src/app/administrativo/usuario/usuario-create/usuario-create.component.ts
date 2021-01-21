import {Component, OnChanges, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../../../core/q-breadcrumb/breadcrumb.service";
import {UsuarioService} from "../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {UtilService} from "../../../../core/services/util.service";
import {CreateComponentInterface} from "../../../../core/interfaces/create-component.interface";
import {SelectItem} from "primeng/api";
import {GrupoService} from "../../grupo/services/grupo.service";
import {UsuarioModel} from "../models/usuario.model";
import {USUARIOS_ROUTE_LIST} from "../usuario.conts";
import {AlertService} from "../../../../core/services/alert.service.com";

@Component({
    selector: 'app-usuario-create',
    templateUrl: './usuario-create.component.html',
    styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit, OnChanges, CreateComponentInterface {

    usuarioForm;
    usuario;
    routeParams;
    cpfMask;
    grupos: SelectItem[];
    selectStatusUsuario;
    imagePath;

    constructor(private breadcrumb: BreadcrumbService,
                private usuarioService: UsuarioService,
                private grupoService: GrupoService,
                protected activatedRoute: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder) {
        this.routeParams = this.activatedRoute.snapshot.params;
        this.selectStatusUsuario = UsuarioModel.getStatus();
    }

    ngOnInit() {
        this.imagePath = '../../../../assets/images/user.svg';
        this.usuarioForm = this.fb.group({
            'id': [null],
            'username': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'password': [null, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
            'password_confirmation': [null, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
            'email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'cpf': [null],
            'nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'grupos': [null],
            'anexo': [null],
            'status': [null, Validators.required],
            'created_at': [null],
            'updated_at': [null],
        });
        this.cpfMask = UtilService.cpfMasc();
        this.grupoService.listaGrupos().subscribe((res) => {
            this.grupos = res.data;
        });
        if (isNullOrUndefined(this.routeParams.id)) {
            this.breadcrumb.setCrumbs([
                {label: 'Criar Usuario'},
            ], false);
        } else {
            this.usuarioService.get(this.routeParams.id, {
                include: 'usuario,grupos,anexo'
            }).subscribe((res: any) => {
                this.usuario = res.data;
                if (!isNullOrUndefined(res.data.anexo))
                    this.imagePath = res.data.anexo.data.url;
                if (!isNullOrUndefined(res.data.grupos.data)) {
                    let x = [];
                    res.data.grupos.data.forEach((item, key) => {
                        x.push(item.id);
                    });
                    this.usuario.grupos = x;
                }

                this.usuarioForm.removeControl('password');
                this.usuarioForm.addControl('password', new FormControl(null));
                this.usuarioForm.removeControl('password_confirmation');
                this.usuarioForm.addControl('password_confirmation', new FormControl(null));
                this.usuarioForm.patchValue(this.usuario);
            });
            this.breadcrumb.setCrumbs([
                {label: 'Editar Usuario'},
            ], false);
        }
    }

    ngOnChanges(e) {

    }

    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.imagePath = myReader.result;
            this.usuarioForm.controls['anexo'].patchValue({
                'nome': file.name,
                'alias': file.name,
                'conteudo': myReader.result,
                'extensao': file.type,
            });
        }
        myReader.readAsDataURL(file);
    }

    salvar(usuario) {
        if (!this.usuarioForm.invalid) {
            let data: any = {};
            let grupos = [];
            data = this.usuarioForm.value;
            this.usuarioForm.controls['grupos'].value.forEach((item) => {
                grupos.push({id: item});
            });
            if (data.password_confirmation != data.password) {
                AlertService.error('Erro!', 'As Senhas devem ser iguais!');
                return false;
            }
            data.grupos = grupos;
            if (isNullOrUndefined(this.routeParams.id)) {
                this.usuarioService.create(data).subscribe((e) => {
                    this.router.navigate([USUARIOS_ROUTE_LIST]);
                });
            } else {
                this.usuarioService.update(this.routeParams.id, data).subscribe((e) => {
                    this.router.navigate([USUARIOS_ROUTE_LIST]);
                });
            }
        }
    }
}
