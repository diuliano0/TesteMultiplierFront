import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {CategoriaLocacaoService} from '../services/categoria-locacao.service';
import {CreateComponentInterface} from '../../../../core/interfaces/create-component.interface';
import {CATEGORIA_LOCACAO_ROUTE_LIST} from '../categoria-locacao.conts';

@Component({
    selector: 'app-categoria-locacao-create',
    templateUrl: './categoria-locacao-create.component.html',
    styleUrls: ['./categoria-locacao-create.component.css']
})
export class CategoriaLocacaoCreateComponent implements OnInit, CreateComponentInterface {

    categoriaLocacaoForm: FormGroup;
    categoriaLocacao: any;
    routeParams;
    status;

    constructor(private categoriaLocacaoService: CategoriaLocacaoService,
                private activatedRoute: ActivatedRoute,
                private breadcrumb: BreadcrumbService,
                private router: Router,
                private fb: FormBuilder) {
        this.routeParams = this.activatedRoute.snapshot.params;
    }

    ngOnInit() {
        this.categoriaLocacaoForm = this.fb.group({
            'nome': [null, Validators.required],
            'status': [null, Validators.required]
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
        if (isNullOrUndefined(this.routeParams.id)) {
            this.breadcrumb.setCrumbs([
                {label: 'Criar Categoria Locação'},
            ], false);
        } else {
            this.categoriaLocacaoService.get(this.routeParams.id, {}).subscribe((res: any) => {
                this.categoriaLocacao = res.data;
                this.categoriaLocacaoForm.patchValue(this.categoriaLocacao);
            });
            this.breadcrumb.setCrumbs([
                {label: 'Editar Categoria Locação'},
            ], false);
        }
    }

    salvar(categoriaLocacao) {
        if (!this.categoriaLocacaoForm.invalid) {
            if (isNullOrUndefined(this.routeParams.id)) {
                this.categoriaLocacaoService.create(categoriaLocacao).subscribe((e) => {
                    this.router.navigate([CATEGORIA_LOCACAO_ROUTE_LIST]);
                });
            } else {
                this.categoriaLocacaoService.update(this.routeParams.id, categoriaLocacao).subscribe((e) => {
                    this.router.navigate([CATEGORIA_LOCACAO_ROUTE_LIST]);
                });
            }
        }
    }

}
