import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined} from "util";
import {PessoaModel} from "../../../../../core/models/pessoa.model";
import {UtilService} from "../../../../../core/services/util.service";

@Component({
    selector: 'app-pessoa-form',
    templateUrl: './pessoa-form.component.html',
    styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit, OnChanges, AfterViewInit {

    pessoaForm: FormGroup;
    cnpjMask;
    dataMask;
    _item;
    get item() {
        return this._item;
    }

    @Input('item')
    set item(value) {
        if (!isNullOrUndefined(value)) {
            if(typeof value.data_fundacao == "object")
                value.data_fundacao = UtilService.transformDate(value.data_fundacao, 'dd/MM/yyyy');
            this.pessoaForm.patchValue(value);
        } else {
            this.initForm();
        }
        this._item = value;
    }

    @Output() itemChange = new EventEmitter();

    @Input('imagePath') imagePath;
    @Output() bucarCPF_CNPJ = new EventEmitter();

    carregado = false;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.imagePath = '../../../../assets/images/user.svg';
        this.initForm();
        this.cnpjMask = UtilService.cnpjMasc();
    }

    initForm() {
        this.dataMask = UtilService.dataMasc();
        this.pessoaForm = this.fb.group({
            'nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'cpf_cnpj': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'razao_social': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'nome_conta': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'inscricao_estadual': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'inscricao_municipal': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'data_fundacao': [null , Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'modulos_ativos': [null],
            'id': [null],
            'anexo': this.fb.group({
                'diretorio': [null],
                'nome': [null],
                'alias': [null],
                'extensao': [null],
                'conteudo': [null],
            }),
            'descricao': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
        });
    }

    ngOnChanges(e) {
        if (!isNullOrUndefined(this.item) && !this.carregado) {
             /*if (!isNullOrUndefined(this.item) && !isNullOrUndefined(this.item.data_fundacao)) {
                 this.item.data_fundacao = UtilService.transformDate(this.item.data_fundacao, 'dd/MM/yyyy');
             }*/
            this.pessoaForm.patchValue(this.item);
            this.carregado = true;
        }
    }

    ngAfterViewInit() {
        this.pessoaForm.valueChanges.subscribe(result => {
            this.itemChange.emit((new PessoaModel).deserialize(this.pessoaForm.value));
        });
    }

    focusout(event) {
        const cpf = this.pessoaForm.controls['cpf_cnpj'].value;
        if (!isNullOrUndefined(cpf)) {
            this.bucarCPF_CNPJ.emit(cpf);
        }
    }

    alterarForm() {
        this.itemChange.emit(this.pessoaForm.value);
    }

    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.imagePath = myReader.result;
            this.pessoaForm.controls['anexo'].patchValue({
                'nome': file.name,
                'alias': file.name,
                'conteudo': myReader.result,
                'extensao': file.type,
            });
        }
        myReader.readAsDataURL(file);
    }

}
