import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadcrumbService } from 'src/core/q-breadcrumb/breadcrumb.service';
import { ListAbstract } from 'src/core/components/list.abstract';
import { ListComponentInterface } from 'src/core/interfaces/list-component.interface';
import {AuthService} from "../../../core/services/auth.service";
import {isNullOrUndefined} from "util";
import {DashboardService} from "../services/dashboard.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../core/services/alert.service.com";
import {UtilService} from "../../../core/services/util.service";

@Component({
    selector: 'app-dashboard-detail',
    templateUrl: './dashboard-detail.component.html',
    styleUrls: ['./dashboard-detail.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardDetailComponent extends ListAbstract implements OnInit, ListComponentInterface {

    items: any[];
    label: string;
    isInput: boolean;
    disponibilidade: any;
    agendamentos: any;
    procedimentos: any;
    agendamentosPorSexo: any;
    selection: any = null;
    usuario;
    form: FormGroup;
    dashboard;
    now;
    consulta;
    exist: boolean;
    dashboardList = [];
    pt;
    maxDate = new Date();
    minDate = new Date();

    constructor(private breadcrumb: BreadcrumbService,
                private authService: AuthService,
                private dashboardsService: DashboardService,
                private fb: FormBuilder) {
        super();
        this.exist = false;
    }

    ngOnInit(): void {
        this.now = new Date();
        this.minDate.setFullYear(this.minDate.getFullYear() - 50);
        this.maxDate.setFullYear(this.maxDate.getFullYear() + 50);
        this.usuario = this.authService.getUsuario();
        this.dashboard = this.authService.getDashBoards() || {label: null, dashboards: []};
        this.label = this.dashboard.label || 'Hoje';
        this.isInput = false;

        this.consulta = {
            order: "id;desc",
        };

        this.form = this.fb.group({
            'startDate': [null, Validators.required],
            'endDate': [null, Validators.required],
            'consulta.data_between': [null]
        })

        this.initCharts();
        this.items = [
            { label: 'Hoje', icon: 'fa fa-plus', command: (() => this.hoje())},
            { label: 'Ontem', icon: 'fa fa-plus', command: (() => this.ontem())},
            { label: 'Semana', icon: 'fa fa-download', command: () => this.semana() },
            { label: 'Mês', icon: 'fa fa-download', command: () => this.mes()},
            { label: 'Período', icon: 'fa fa-download', command: () => this.periodo() },
        ];


        this.breadcrumb.setCrumbs([
            {
                label: 'Dashboard',
                routerLink: '/deadhboard/detail'
            }
        ]);

        this.pt = {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'Hoje',
            clear: 'Limpar'
        };
    }

    initCharts() {
        this.atualizar()
        // setInterval(this.atualizar, 30000);
    }

    atualizar() {

        switch (this.label) {
            case 'Hoje':
                this.hoje();
                break;
            case 'Ontem':
                this.ontem();
                break;
            case 'Semana':
                this.semana();
                break;
            case 'Mês':
                this.mes();
                break;
            case 'Periódo':
                break;
            default:
        }
    }


    hoje() {
        this.label = 'Hoje';
        this.isInput = false;
        this.form.patchValue({
            startDate: this.now || null,
            endDate: this.now || null
        })
        this.pesquisar();
    }

    ontem() {
        this.label = 'Ontem';
        this.isInput = false;
        this.form.patchValue({
            startDate: UtilService.subtrairDay(this.now, 1),
            endDate:  UtilService.subtrairDay(this.now, 1)
        })
        this.pesquisar();
    }

    semana() {
        this.label = 'Semana';
        this.isInput = false;

        this.form.patchValue({
            startDate: new Date().setDate(this.now.getDate() - this.now.getDay()),
            endDate: new Date().setDate(this.now.getDate() + (6 - this.now.getDay()))
        })
        this.pesquisar();
    }

    mes() {
        this.label = 'Mês';
        this.isInput = false;
        let ano = this.now.getFullYear()
        let mes = parseInt(this.now.getMonth())
        this.form.patchValue({
            startDate: new Date(ano, this.now.getMonth(), 1),
            endDate: new Date(ano, (mes + 1),0)
        })
        this.pesquisar();
    }

    periodo() {
        this.label = 'Periódo';
        this.isInput = true;
        this.form.controls['startDate'].setValue(null);
        this.form.controls['endDate'].setValue(null);
    }

    getUrl(url: any) {
        throw new Error("Method not implemented.");
    }
    getSelected() {
        throw new Error("Method not implemented.");
    }
    loadData(ev: any) {
        throw new Error("Method not implemented.");
    }
    pesquisar(paginate?: number, consulta?: any) {
        if (this.form.invalid) {
            AlertService.error('Alerta', 'Defina a data inicial e final para pesquisa');
        } else {
            this.form.controls['consulta.data_between']
                .setValue(UtilService.transformDate(this.form.controls['startDate'].value, 'y-MM-d') + ' 00:00:00;' + UtilService.transformDate(this.form.controls['endDate'].value, 'y-MM-d') + ' 23:59:59');
            // this.form.controls['startDate'].setValue(null);
            // this.form.controls['endDate'].setValue(null);
            this.consulta.filtro = this.form.value;

            this.usuario.data.grupos.data.forEach((va, key) => {
                if (!isNullOrUndefined(va.dashboards)) {
                    this.exist = true;

                    va.dashboards.data.forEach( value => {
                        if (!this.verificarList(value)) {

                            this.dashboardsService.get(value.modelos.endpoint, {
                                consulta: JSON.stringify(this.consulta),
                            }).subscribe( res => {
                                // let data = res;
                                let dashboardLocal = {label: this.label, dashboards: []};

                                if(value.modelos.type == 'pie') {
                                    dashboardLocal.dashboards.push({
                                        tag: value.modelos.tag,
                                        type: 'pie',
                                        descricao: value.modelos.descricao,
                                        labels: [],
                                        datasets: [
                                            {
                                                data: [],
                                                backgroundColor: [],
                                                hoverBackgroundColor: []
                                            }]
                                    })
                                } else {
                                    dashboardLocal.dashboards.push({
                                        tag: value.modelos.tag,
                                        type: 'bar',
                                        descricao: value.modelos.descricao,
                                        labels: [],
                                        datasets: [
                                            {
                                                label: '',
                                                backgroundColor: '#03A9F4',
                                                borderColor: '#03A9F4',
                                                data: []
                                            }
                                        ]
                                    })
                                }

                                res.forEach( (val) => {
                                    dashboardLocal.dashboards[0].labels.push(val.label);
                                    dashboardLocal.dashboards[0].datasets[0].data.push(val.contagem);

                                    if(value.modelos.type == 'pie') {
                                        dashboardLocal.dashboards[0].datasets[0].backgroundColor.push(val.cor);
                                        dashboardLocal.dashboards[0].datasets[0].hoverBackgroundColor.push(this.gera_cor());
                                    } else {
                                        dashboardLocal.dashboards[0].datasets[0].label = value.modelos.descricao;
                                    }

                                });

                                // for(let descricao in data) {
                                //
                                //     dashboardLocal.dashboards[0].labels.push(descricao);
                                //     dashboardLocal.dashboards[0].datasets[0].data.push((typeof data[descricao] === 'object') ? data[descricao].contagem : data[descricao]);
                                //
                                //     if(value.modelos.type == 'pie') {
                                //         dashboardLocal.dashboards[0].datasets[0].backgroundColor.push((typeof data[descricao] === 'object') ? data[descricao].cor : this.gera_cor())
                                //         dashboardLocal.dashboards[0].datasets[0].hoverBackgroundColor.push(this.gera_cor());
                                //     } else {
                                //         dashboardLocal.dashboards[0].datasets[0].label = value.modelos.descricao;
                                //     }
                                //
                                // }

                                if(this.dashboard.dashboards.length == 0) {
                                    this.dashboard = dashboardLocal;
                                    this.authService.setDashboards(this.dashboard);

                                } else {
                                    let existe = false;
                                    this.dashboard.dashboards.forEach( (val, ky) => {
                                        if(val.tag == dashboardLocal.dashboards[0].tag) {
                                            this.dashboard.dashboards[ky] = dashboardLocal.dashboards[0];
                                            existe = true;
                                        }
                                    })
                                    if(!existe) {
                                        this.dashboard.dashboards.push(dashboardLocal.dashboards[0]);
                                    }

                                    this.dashboard.label = this.label;
                                    this.authService.setDashboards(this.dashboard);
                                }
                            });
                        }
                    });
                }
            });
            this.dashboardList.splice(0, this.dashboardList.length);
        }
    }

    // testClick() {
    //     console.log('click')
    // }

    // testBlur() {
    //     console.log('blur')
    // }

    // dragStart(event) {
    //     console.log("dragStart:");
    //     console.log(event);
    //     this.dndElement=event.srcElement;
    //   }

      drop(event) {
          console.log(event)
        // event.target.appendChild(this.dndElement);
      }

    //   dragEnd(event) {
    //     console.log("dragEnd");
    //     console.log(event);
    //   }
    nodeSelect(event) {
        console.log(event)
        //event.node = selected node
    }

    nodeUnselect(event) {
        console.log(event)
        // this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }

    nodeExpand(event) {
        console.log(event)
        // if(event.node) {
        //     //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
        //     this.nodeService.getLazyFiles().then(nodes => event.node.children = nodes);
        // }
    }

    gera_cor(){
        let hexadecimais = '0123456789ABCDEF';
        let cor = '#';

        // Pega um número aleatório no array acima
        for (let i = 0; i < 6; i++ ) {
            //E concatena à variável cor
            cor += hexadecimais[Math.floor(Math.random() * 16)];
        }
        return cor;
    }

    verificarList(dashboard): boolean {
        this.dashboardList.forEach( value => {
            if (value.modelos.tag == dashboard.modelos.tag) {
                return true;
            }
        })
        this.dashboardList.push(dashboard);
        return false;
    }
}
