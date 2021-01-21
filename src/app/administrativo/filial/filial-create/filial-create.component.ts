import {Component, OnChanges, OnInit} from '@angular/core';
import {FilialService} from "../services/filial.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TelefoneModel} from "../../shared/telefone/models/telefone.model";
import {UtilService} from "../../../../core/services/util.service";
import {isNullOrUndefined} from "util";
import {BreadcrumbService} from "../../../../core/q-breadcrumb/breadcrumb.service";
import {MenuItem, SelectItem} from "primeng/api";
import {CreateComponentInterface} from "../../../../core/interfaces/create-component.interface";
import {CoreService} from "../../shared/services/core.service";
import {AlertService} from "../../../../core/services/alert.service.com";
import {FILIAL_ROUTE_LIST} from "../filial.conts";

@Component({
    selector: 'app-filial-create',
    templateUrl: './filial-create.component.html',
    styleUrls: ['./filial-create.component.css'],
    providers: [
        AlertService
    ]
})
export class FilialCreateComponent implements OnInit, OnChanges, CreateComponentInterface {

    pessoaForm: FormGroup;

    telefones: TelefoneModel[];

    endereco;

    modulos: SelectItem[];

    routeParams;

    cnpjMask;

    home: MenuItem;

    filial: any;

    imagePath;

    uploadedFiles: any[] = [];

    constructor(private breadcrumb: BreadcrumbService,
                private filialService: FilialService,
                protected activatedRoute: ActivatedRoute,
                private coreService: CoreService,
                private router: Router,
                private fb: FormBuilder) {
        this.routeParams = this.activatedRoute.snapshot.params;
    }

    ngOnInit() {
        this.imagePath = '../../../../assets/images/user.svg';
        this.pessoaForm = this.fb.group({
            'nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'cpf_cnpj': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'razao_social': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'nome_conta': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'inscricao_estadual': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'inscricao_municipal': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'data_fundacao': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'modulos_ativos': [null],
            'id': [null],
            'valor_acrescimo': [null],
            'valor_repasse': [null],
            'dia_reapasse': [null],
            'dia_recebimento_cartao': [null],
            'cobra_convenio': [null],
            'cobra_particular': [null],
            'anexo': this.fb.group({
                'diretorio': [null],
                'nome': [null],
                'alias': [null],
                'extensao': [null],
                'conteudo': [null],
            }),
            'descricao': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
            'anexos': this.fb.array([])
        });
        this.coreService.listaModulos().subscribe((res) => {
            this.modulos = res.data;
        });
        this.cnpjMask = UtilService.cnpjMasc();
        if (isNullOrUndefined(this.routeParams.id)) {
            this.breadcrumb.setCrumbs([
                {label: 'Criar Conta'},
            ], false);
        } else {
            this.filialService.get(this.routeParams.id, {
                include: 'pessoa.enderecos,pessoa.telefones,modulos_ativos,anexo'
            }).subscribe((res: any) => {
                this.filial = res.data;
                if (this.filial.pessoa.hasOwnProperty('enderecos'))
                    this.endereco = this.filial.pessoa.enderecos[0];
                if (!isNullOrUndefined(this.filial.pessoa.data_fundacao))
                    this.filial.pessoa.data_fundacao = new Date(this.filial.pessoa.data_fundacao);
                if (this.filial.pessoa.hasOwnProperty('telefones'))
                    this.telefones = this.filial.pessoa.telefones;
                this.filial.pessoa.modulos_ativos = [];
                this.filial.pessoa.nome_conta = res.data.nome_conta;
                if (!isNullOrUndefined(res.data.anexo))
                    this.imagePath = res.data.anexo.data.url;
                if (!isNullOrUndefined(res.data.modulos_ativos)) {
                    res.data.modulos_ativos.data.forEach((item, key) => {
                        this.filial.pessoa.modulos_ativos.push(item.modulo);
                    });
                }
                this.pessoaForm.controls['cobra_convenio'].setValue(this.filial.cobra_convenio);
                this.pessoaForm.controls['cobra_particular'].setValue(this.filial.cobra_particular);
                this.pessoaForm.controls['valor_acrescimo'].setValue(this.filial.valor_acrescimo);
                this.pessoaForm.controls['valor_repasse'].setValue(this.filial.valor_repasse);
                this.pessoaForm.controls['dia_reapasse'].setValue(this.filial.dia_reapasse);
                this.pessoaForm.controls['dia_recebimento_cartao'].setValue(this.filial.dia_recebimento_cartao);
                this.pessoaForm.patchValue(this.filial.pessoa);
            });
            this.breadcrumb.setCrumbs([
                {label: 'Editar Conta'},
            ], false);
        }
    }

    initArquivo(): FormGroup {
        return this.fb.group({
            'diretorio': [null],
            'nome': [null],
            'alias': [null],
            'extensao': [null],
            'conteudo': [null],
        });
    }

    ngOnChanges(e) {
    }

    changeListener($event): void {
        this.readThis($event.target);
    }

    addArquivo(data = null) {
        const control = this.pessoaForm.get('anexos') as FormArray;
        const novoArquivo = this.initArquivo();

        if (!isNullOrUndefined(data))
            novoArquivo.patchValue(data);

        control.push(novoArquivo);
    }

    onUpload(event) {

        for (let file of event.target.files) {
            this.uploadedFiles.push(file);
        }
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

    /*log(inputValue){
     const formData = new FormData();
     const file: File = inputValue.files[0];
     formData.append('imagem', file, file.name);
     }*/

    salvar(filial) {
        if (!this.pessoaForm.invalid && !isNullOrUndefined(this.endereco)) {
            let data: any = (isNullOrUndefined(this.filial)) ? {} : this.filial;
            data.modulos_ativos = this.pessoaForm.controls['modulos_ativos'].value;
            data.nome_conta = this.pessoaForm.controls['nome_conta'].value;
            data.cobra_convenio = this.pessoaForm.controls['cobra_convenio'].value;
            data.cobra_particular = this.pessoaForm.controls['cobra_particular'].value;
            data.valor_acrescimo = this.pessoaForm.controls['valor_acrescimo'].value
            data.valor_repasse = this.pessoaForm.controls['valor_repasse'].value;
            data.dia_reapasse = this.pessoaForm.controls['dia_reapasse'].value;
            data.dia_recebimento_cartao = this.pessoaForm.controls['dia_recebimento_cartao'].value;
            data.pessoa = this.pessoaForm.value;
            if (!isNullOrUndefined(data.pessoa.anexo.conteudo))
                data.anexo = data.pessoa.anexo;
            data.pessoa.enderecos = [this.endereco];
            data.pessoa.telefones = this.telefones;
            if (isNullOrUndefined(this.routeParams.id)) {
                this.filialService.create(data).subscribe((e) => {
                    this.router.navigate([FILIAL_ROUTE_LIST]);
                });
            } else {
                this.filialService.update(this.routeParams.id, data).subscribe((e) => {
                    this.router.navigate([FILIAL_ROUTE_LIST]);
                });
            }

        }
    }

}
