import {
    AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../../../core/services/util.service";
import {EnderecoService} from "../services/endereco.service";
import {EnderecoModel} from "../models/endereco.model";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-endereco-form',
    templateUrl: './endereco-form.component.html',
    styleUrls: ['./endereco-form.component.css'],
    providers: [UtilService, EnderecoService]
})
export class EnderecoFormComponent implements OnInit, OnChanges, AfterViewInit {

    enderecoForm: FormGroup;
    carregado = false;
    cepMask;
    tipoEndereco = EnderecoModel.getTipoEndereco();
    @Input('item') item;
    @Output() itemChange = new EventEmitter();


    constructor(private fb: FormBuilder,
                private enderecoService: EnderecoService) {
    }

    ngOnInit() {
        this.formInit();
        this.cepMask = UtilService.cepMasc();
    }

    ngOnChanges(e) {
        if (!isNullOrUndefined(this.item) && !this.carregado) {
            this.enderecoForm.patchValue(this.item);
            this.carregado = true;
        }
    }

    ngAfterViewInit() {
        this.enderecoForm.valueChanges.subscribe(result => {
            //if(!this.enderecoForm.invalid){
            this.itemChange.emit((new EnderecoModel).deserialize(this.enderecoForm.value));
            //}
        });
    }

    alterarForm() {
        this.itemChange.emit(this.enderecoForm.value);
    }

    formInit() {
        this.enderecoForm = this.fb.group({
            'logradouro': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'cep': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
            'numero': [null, Validators.compose([Validators.maxLength(255)])],
            'cidade_nome': [null, Validators.compose([Validators.maxLength(255)])],
            'estado_nome': [null, Validators.compose([Validators.maxLength(255)])],
            'complemento': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'cidade_id': [null, Validators.compose([Validators.required])],
            'bairro_id': [null],
            'bairro': [null],
            'id': [null],
            'tipo_endereco': [0, Validators.compose([Validators.required, Validators.maxLength(255)])],
        });
    }

    localizaCep() {
        let cep = this.enderecoForm.controls['cep'].value;
        this.enderecoService
            .pesquisarCep(cep)
            .subscribe((e: any) => {
                this.enderecoForm.controls['logradouro'].setValue(e.data.logradouro);
                this.enderecoForm.controls['cidade_id'].setValue(e.data.cidade_id);
                this.enderecoForm.controls['bairro_id'].setValue(e.data.bairro_id);
                this.enderecoForm.controls['cidade_nome'].setValue(e.data.cidade_nome);
                this.enderecoForm.controls['estado_nome'].setValue(e.data.estado_nome);
                this.alterarForm();
            });
    }

}
