import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UtilService} from "../../../../../core/services/util.service";
import {UsuarioModel} from "../../../usuario/models/usuario.model";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, AfterViewInit, OnChanges {

    usuarioForm;
    cpfMask = null;
    selectStatusUsuario;

    @Input('item') item;
    @Output() itemChange = new EventEmitter();

    imagePath = '../../../../assets/images/user.svg';


    constructor(private fb: FormBuilder) {
        this.selectStatusUsuario = UsuarioModel.getStatus();
        this.usuarioForm = this.fb.group({
            'id': [null],
            'username': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'password': [null, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
            'password_confirmation': [null, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
            'email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'cpf': [null],
            'nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'anexo': [null],
            'status': [null, Validators.required],
            'created_at': [null],
            'updated_at': [null],
        });
    }

    ngOnInit() {
        this.cpfMask = UtilService.cpfMasc();
    }

    ngOnChanges(e) {
        if (!isNullOrUndefined(this.item)) {
            this.usuarioForm.removeControl('password');
            this.usuarioForm.addControl('password', new FormControl(null));
            this.usuarioForm.removeControl('password_confirmation');
            this.usuarioForm.addControl('password_confirmation', new FormControl(null));
            this.usuarioForm.patchValue(this.item);
        }
    }

    ngAfterViewInit(): void {
        this.usuarioForm.valueChanges.subscribe(result => {
            this.itemChange.emit((new UsuarioModel).deserialize(this.usuarioForm.value));
        });
    }

    alterarForm() {
        this.itemChange.emit(this.usuarioForm.value);
    }

    checkItemIsNullOrUndefined(value) {
        return isNullOrUndefined(value);
    }
}
