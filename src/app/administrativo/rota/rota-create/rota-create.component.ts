import {Component, OnInit} from '@angular/core';
import {CreateComponentInterface} from "../../../../core/interfaces/create-component.interface";
import {RotaService} from "../services/rota.service";
import {BreadcrumbService} from "../../../../core/q-breadcrumb/breadcrumb.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {ROTA_ROUTE_LIST} from "../rota.conts";
import {SelectItem} from "primeng/api";
import {CoreService} from "../../shared/services/core.service";

@Component({
    selector: 'app-rota-create',
    templateUrl: './rota-create.component.html',
    styleUrls: ['./rota-create.component.css'],
    providers: [
        CoreService
    ]
})
export class RotaCreateComponent implements OnInit, CreateComponentInterface {

    routeParams;

    queryParams;

    rota;

    ambientes;

    rotaForm: FormGroup;

    modulos: SelectItem[];

    constructor(private rotaService: RotaService,
                private breadcrumb: BreadcrumbService,
                private router: Router,
                protected activatedRoute: ActivatedRoute,
                private coreService: CoreService,
                private fb: FormBuilder) {
        this.routeParams = this.activatedRoute.snapshot.params;
        this.queryParams = this.activatedRoute.snapshot.queryParams;
    }

    ngOnInit() {
        this.rotaForm = this.fb.group({
            'parent_id': [this.queryParams.parent],
            'titulo': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'rota': [null, Validators.compose([Validators.maxLength(255), Validators.required])],
            'icon': [null],
            'disabled': [false],
            'is_menu': [false],
            'ambiente': [null],
            'modulo': [null],
            'prioridade': [null],
        });

        this.coreService.listaModulos().subscribe((res) => {
            this.modulos = res.data;
        });

        this.rotaService.listarAmbiente().subscribe((res) => {
            this.ambientes = res.data;
        });

        if (isNullOrUndefined(this.routeParams.id)) {
            this.breadcrumb.setCrumbs([
                {label: 'Criar Rota'},
            ], false);
        } else {
            this.rotaService.get(this.routeParams.id)
                .subscribe((res: any) => {
                this.rota = res.data;
                this.rotaForm.patchValue(this.rota);
            });
            this.breadcrumb.setCrumbs([
                {label: 'Editar Filial'},
            ], false);
        }
    }

    salvar(filial) {
        if (!this.rotaForm.invalid) {
            if (isNullOrUndefined(this.routeParams.id)) {
                this.rotaService.create(filial).subscribe((e) => {
                    this.router.navigate([ROTA_ROUTE_LIST]);
                });
            } else {
                this.rotaService.update(this.routeParams.id, filial).subscribe((e) => {
                    this.router.navigate([ROTA_ROUTE_LIST]);
                });
            }

        }
    }
}
