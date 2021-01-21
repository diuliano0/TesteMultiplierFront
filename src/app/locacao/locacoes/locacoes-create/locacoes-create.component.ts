import {Component, OnInit} from '@angular/core';
import {CreateComponentInterface} from '../../../../core/interfaces/create-component.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocacoesService} from '../services/locacoes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {isNullOrUndefined} from 'util';
import {LOCACOES_ROUTE_LIST} from '../locacoes.conts';
import {CategoriaLocacaoService} from '../../categoria-locacao/services/categoria-locacao.service';
import {AlertService} from '../../../../core/services/alert.service.com';

@Component({
    selector: 'app-locacoes-create',
    templateUrl: './locacoes-create.component.html',
    styleUrls: ['./locacoes-create.component.css'],
    providers: [
        CategoriaLocacaoService
    ]
})
export class LocacoesCreateComponent implements OnInit, CreateComponentInterface {

    locacoesForm: FormGroup;
    carregarImg = false;
    locacoes: any;
    routeParams;
    status;
    categoriaLocacao;
    files: any = [];
    comodidades;

    /* carregar imagem */
    imagePath;

    constructor(private locacoesService: LocacoesService,
                private categoriaLocacaoService: CategoriaLocacaoService,
                private activatedRoute: ActivatedRoute,
                private breadcrumb: BreadcrumbService,
                private router: Router,
                private fb: FormBuilder) {
        this.routeParams = this.activatedRoute.snapshot.params;
    }

    ngOnInit() {
        this.locacoesForm = this.fb.group({
            'nome': [null, Validators.required],
            'status': [1, Validators.required],
            'categoria_locacao_id': [null, Validators.required],
            'capacidade': [null, Validators.required],
            'descricao': [null, Validators.required],
            'valor_locacao': [0],
            'custo_operacional': [0],
            'comodidades': [null],
            'url_360': [null],
        });
        this.status = [
            {
                label: 'Inativo',
                value: 0,
            },
            {
                label: 'Ativo',
                value: 1,
            }
        ];

        this.categoriaLocacaoService.dropdown().subscribe(res => {
            this.categoriaLocacao = res.data;
        });

        this.locacoesService.listaComodidade().subscribe(res => {
            this.comodidades = res.data;
        });

        if (isNullOrUndefined(this.routeParams.id)) {
            this.breadcrumb.setCrumbs([
                {label: 'Criar Locação'},
            ], false);
        } else {
            this.locacoesService.get(this.routeParams.id, {
                include: 'anexos,comodidades'
            }).subscribe((res: any) => {
                this.locacoes = res.data;
                if (res.data.hasOwnProperty('anexos')) {
                    this.files = res.data.anexos.data;
                }
                this.locacoesForm.patchValue(this.locacoes);
            });
            this.breadcrumb.setCrumbs([
                {label: 'Editar Locação'},
            ], false);
        }
    }

    salvar(locacoes) {
        if (!this.locacoesForm.invalid) {
            if (isNullOrUndefined(this.routeParams.id)) {
                this.locacoesService.create(locacoes).subscribe((e) => {
                    this.router.navigate([LOCACOES_ROUTE_LIST]);
                });
            } else {
                this.locacoesService.update(this.routeParams.id, locacoes).subscribe((e) => {
                    this.router.navigate([LOCACOES_ROUTE_LIST]);
                });
            }
        }
    }

    changeListener($event): void {
        this.readThis($event.target);
    }

    uploadFile(event) {
        /*for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.files.push(element.name);
        }*/
        this.readThis({files: event});
    }

    deleteAttachment(index) {
        this.files.splice(index, 1);
    }

    readThis(inputValue: any): void {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.imagePath = myReader.result;
            const arquivo = {
                'id': null,
                'nome': file.name,
                'alias': file.name,
                'conteudo': myReader.result,
                'extensao': file.type,
            };
            this.setCarregarImg(true);
            this.locacoesService.addImage(this.routeParams.id, {
                'anexo': arquivo
            }).subscribe(res => {
                arquivo.id = res.data.id;
                this.files.push(arquivo);
                this.setCarregarImg(false);
            }, error => {
                AlertService.infomessage('Alerta!', 'Não foi possivel enviar a Imagem!');
                this.setCarregarImg(false);
            });
        };
        myReader.readAsDataURL(file);
    }

    removeImage(id, index) {
        this.locacoesService
            .removeImage(id)
            .subscribe(res => {
                this.deleteAttachment(index);
            }, error => {
                AlertService.infomessage('Alerta!', 'Não foi possivel enviar a Imagem!');
            });
    }

    setCarregarImg(opt) {
        this.carregarImg = opt;
    }

}
