import {
    AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {PessoaModel} from "../../../../../core/models/pessoa.model";
import {isNullOrUndefined} from "util";
import {UtilService} from "../../../../../core/services/util.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CpfValidator} from "../../../../../core/validators/cpf-validator";

@Component({
    selector: 'app-pessoa-fisica-form',
    templateUrl: './pessoa-fisica-form.component.html',
    styleUrls: ['./pessoa-fisica-form.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PessoaFisicaFormComponent implements OnInit, AfterViewInit, OnChanges {

    pessoaForm: FormGroup;
    cpfMask;
    dataMask;
    dataString;
    selectSexo;
    selectEstadoCivil;
    selectRegimeUniao;
    _item;
    get item() {
        return this._item;
    }

    @Input('item')
    set item(value) {
        if (!isNullOrUndefined(value)) {
            this.pessoaForm.patchValue(value);
        } else {
            this.initForm();
        }
        this._item = value;
    }

    @Output() itemChange = new EventEmitter();
    @Input() disableImage = false;

    @Input('imagePath') imagePath;

    @Output() bucarCPF_CNPJ = new EventEmitter();

    carregado = false;

    constructor(private fb: FormBuilder) {
        this.selectSexo = PessoaModel.getSexo();
        this.selectEstadoCivil = PessoaModel.getEstadoCivil();
        this.selectRegimeUniao = PessoaModel.getRegimeUniao();
    }

    ngOnInit() {
        this.imagePath = '../../../../assets/images/user.svg';
        this.initForm();
        this.cpfMask = UtilService.cpfMasc();
        this.dataMask = UtilService.dataMasc();
    }

    initForm() {
        this.pessoaForm = this.fb.group({
            'nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'cpf_cnpj': [null, Validators.compose([Validators.required, CpfValidator.isValid])],
            'email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'estado_civil': [null, Validators.required],
            'regime_uniao': [null],
            'data_nascimento': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'sexo': [null, Validators.required],
            'filiacao_mae': [null],
            'id': [null],
            'rg': [null],
            'descricao': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
        });
        if (!this.disableImage) {
            this.pessoaForm.addControl('anexo', this.fb.group({
                'diretorio': [null],
                'nome': [null],
                'alias': [null],
                'extensao': [null],
                'conteudo': [null],
            }));
        }
    }

    ngAfterViewInit() {
        this.pessoaForm.valueChanges.subscribe(result => {
            this.itemChange.emit((new PessoaModel()).deserialize(this.pessoaForm.value));
        });
    }

    focusout(event) {
        const cpf = this.pessoaForm.controls['cpf_cnpj'].value;
        if (!isNullOrUndefined(cpf)) {
            this.bucarCPF_CNPJ.emit(cpf);
        }
    }

    ngOnChanges(e) {
        if (!isNullOrUndefined(this.item) && !this.carregado) {
            if (!isNullOrUndefined(this.item) && !isNullOrUndefined(this.item.data_nascimento)) {
                this.item.data_nascimento = UtilService.transformDate(this.item.data_nascimento, 'dd/MM/yyyy');
            }
            this.pessoaForm.patchValue(this.item);
            this.carregado = true;
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
