import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/api';
import {UtilService} from '../../../../../core/services/util.service';
import {TelefoneModel} from '../models/telefone.model';
import {isNullOrUndefined} from 'util';

@Component({
    selector: 'app-form-telefone',
    templateUrl: './form-telefone.component.html',
    styleUrls: ['./form-telefone.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormTelefoneComponent implements OnInit {

    msgs: Message[] = [];

    carregado = false;

    cols: any[] = [
        {field: 'ddd', header: 'DDD'},
        {field: 'numero', header: 'Número'},
        {field: 'observacao', header: 'Observação'},
        {field: 'tipo_telefone', header: 'Tipo Telefone'}
    ];

    telefoneForm: FormGroup;

    telefones = [];

    selectedTelefones = null;

    displayDialog = false;

    tipoTelefones;

    _itens;
    @Input('itens') set itens(value) {
        if (!isNullOrUndefined(value)) {
            if(value.hasOwnProperty('data'))
                this.telefones = value.data;
            else
                this.telefones = value;
            setTimeout(() => {
                this.itensChange.emit(this.telefones);
            }, 200);
        } else {
            if(isNullOrUndefined(value)){
                this.telefones = [];
                this.fecharModal();
            }
        }
        this._itens = value;
    }

    get itens() {
        return this._itens;
    }

    @Output() itensChange = new EventEmitter();

    constructor(private fb: FormBuilder) {
        this.tipoTelefones = TelefoneModel.getTelefoneSelect();
    }

    ngOnInit() {
        this.formInit();
    }

    addTelefone(telefone) {
        if (!this.telefoneForm.invalid) {
            this.telefones.push((new TelefoneModel).deserialize(telefone));
            this.itensChange.emit(this.telefones);
            this.displayDialog = false;
            this.formInit();
        }
    }

    openModal() {
        this.displayDialog = true;
    }

    delete() {
        this.displayDialog = false;
        let index = this.telefones.indexOf(this.selectedTelefones);
        this.telefones = this.telefones.filter((val, i) => i != index);
        this.itensChange.emit(this.telefones);
        this.removeSelected();
        this.formInit();
    }

    fecharModal() {
        this.removeSelected()
        this.formInit();
    }

    removeSelected() {
        this.selectedTelefones = null;
    }

    formInit() {
        this.telefoneForm = this.fb.group({
            'id': [null],
            'tipo_telefone_enum': [null],
            'ddd': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
            'numero': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'observacao': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'tipo_telefone': [0],
        });
    }

    mask(value, self) {
        self.value = UtilService.phoneMask(value, self);
    }

    onRowSelect(event) {
        this.telefoneForm.patchValue(event.data)
        this.displayDialog = true;
    }

    checkSave(val) {
        return isNullOrUndefined(val.id);
    }

    alterar(value) {
        let index = this.telefones.indexOf(this.selectedTelefones);
        this.telefones[index] = value;
        this.itensChange.emit(this.telefones);
        this.removeSelected();
        this.formInit();
        this.displayDialog = false;
    }

}
