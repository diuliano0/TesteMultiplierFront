import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GrupoService} from "../services/grupo.service";
import {BreadcrumbService} from "../../../../core/q-breadcrumb/breadcrumb.service";
import {isNullOrUndefined} from "util";
import {GrupoModel} from "../models/grupo.model";
import {CreateComponentInterface} from "../../../../core/interfaces/create-component.interface";
import {SelectItem, TreeNode} from 'primeng/api';
import {RotaService} from "../../rota/services/rota.service";
import {CoreService} from "../../shared/services/core.service";
import {GRUPO_ROUTE_LIST} from "../grupo.conts";

@Component({
    selector: 'app-grupo-create',
    templateUrl: './grupo-create.component.html',
    styleUrls: ['./grupo-create.component.css']
})
export class GrupoCreateComponent implements OnInit, CreateComponentInterface {

    filesTree: TreeNode[];
    grupoForm;
    selectedFile;
    selectStatusgrupo;
    modulos: SelectItem[];
    dashboards: SelectItem[];
    routeParams;
    grupo;

    constructor(private breadcrumb: BreadcrumbService,
                private grupoService: GrupoService,
                private rotaService: RotaService,
                private coreService: CoreService,
                protected activatedRoute: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder) {
        this.routeParams = this.activatedRoute.snapshot.params;
        this.selectStatusgrupo = GrupoModel.getStatus();
    }

    ngOnInit() {
        this.grupoForm = this.fb.group({
            'id': [null],
            'nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'descricao': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
            'status': [1, Validators.required],
            'modulos': [null],
            'rotas': [null],
            'dashboards': [null],
            'created_at': [null],
            'updated_at': [null],
        });
        this.coreService.listaModulos().subscribe((res) => {
            this.modulos = res.data;
        });
        this.grupoService.listaDashboards().subscribe((res) => {
            this.dashboards = res.data;
        })
        if (isNullOrUndefined(this.routeParams.id)) {
            this.breadcrumb.setCrumbs([
                {label: 'Criar Grupo'},
            ], false);
        } else {
            this.grupoService.get(this.routeParams.id, {
                include: 'rotas.filhos,dashboards'
            }).subscribe((res: any) => {
                this.grupo = res.data;
                this.grupoForm.patchValue(this.grupo);

                if (res.rota_tree.length == 0)
                    return;

                if (!isNullOrUndefined(this.grupo.dashboards))
                    this.grupoForm.controls['dashboards'].setValue(this.grupo.dashboards.data.map(x => x.modelos.tag))

                let modulos = res.rota_tree
                    .filter((value, index, self) => self.map(x => x.data.modulo).indexOf(value.data.modulo) == index)
                    .map(x => x.data.modulo);
                this.bucarRotas(modulos);
                if (modulos.length > 0)
                    this.grupoForm.controls['modulos'].setValue(modulos);
            });
            this.breadcrumb.setCrumbs([
                {label: 'Editar Grupo'},
            ], false);
        }
    }

    bucarRotas(modulos) {
        this.rotaService.getRotasByModuloTree({
            modulos: modulos,
            include: 'filhos.filhos'
        }).subscribe((res: any) => {
            this.filesTree = res;
            if (!isNullOrUndefined(this.routeParams.id) && !isNullOrUndefined(this.grupo)) {
                this.selectedFile = [];
                if (this.grupo.hasOwnProperty('rotas')) {
                    this.grupo.rotas.forEach(rota => {
                        this.filesTree.forEach((tree, index) => {
                            this.rotasSelecionadas(rota, tree, index);
                        });
                    });
                }
            }
        });
    }

    rotasSelecionadas(rota, tree, index) {
        if (tree.data.id == rota.id) {
            this.selectedFile.push(tree);
            return;
        }
        tree.children.forEach((fTree, fIndex) => {
            this.rotasSelecionadas(rota, fTree, fIndex);
        });
    }

    salvar(grupo) {
        if (!this.grupoForm.invalid) {

            if (!isNullOrUndefined(this.selectedFile))
                this.grupoForm.controls['rotas'].setValue(this.selectedFile.map(x => x.data.id));

            if (isNullOrUndefined(this.routeParams.id)) {
                this.grupoService.create(this.grupoForm.value).subscribe((e) => {
                    this.router.navigate([GRUPO_ROUTE_LIST]);
                });
            } else {
                this.grupoService.update(this.routeParams.id, this.grupoForm.value).subscribe((e) => {
                    this.router.navigate([GRUPO_ROUTE_LIST]);
                });
            }
        }
    }
}
