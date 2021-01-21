import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {AgendaHorarioService} from '../agenda-horario.service';
import {CreateComponentInterface} from '../../../../core/interfaces/create-component.interface';
import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {LocacoesService} from '../../locacoes/services/locacoes.service';
import {AlertService} from '../../../../core/services/alert.service.com';
import {UtilService} from '../../../../core/services/util.service';
import {FullCalendar} from 'primeng';
import {AGENDA_ROUTE_LIST_CALENDARIO} from '../agenda.consts';
import {isNullOrUndefined} from 'util';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-agenda-create',
    templateUrl: './agenda-create.component.html',
    styleUrls: ['./agenda-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        LocacoesService,
        AlertService,
        AgendaHorarioService,
    ]
})
export class AgendaCreateComponent implements OnInit, AfterViewChecked {

    @ViewChild('fc') fc: FullCalendar;

    routeParams;
    horariosAdd: any;
    dataStatus: any;
    calendario: any;
    horaMask;

    options;
    selectedDate;
    defaultView;
    viewCurrentMonth;

    events = [];
    eventosLocacao;
    selectLocacao;
    minDate;
    ocorrencia;
    formHorario;
    formMaisHorarios;
    locacao;
    diasSemana;
    reload = true;

    constructor(private horarioService: AgendaHorarioService,
                private cdRef: ChangeDetectorRef,
                private activatedRoute: ActivatedRoute,
                private breadcrumb: BreadcrumbService,
                private locacoesService: LocacoesService,
                private router: Router,
                private fb: FormBuilder) {
        this.routeParams = this.activatedRoute.snapshot.params;
    }

    ngOnInit() {
        this.selectedDate = new Date();
        this.locacoesService.listaLocacoes().subscribe(res => {
            this.selectLocacao = res;
        });
        this.minDate = new Date();
        this.ocorrencia = [
            {
                label: 'Apenas no dia',
                value: 0,
            },
            {
                label: 'Todos os Dias',
                value: 1,
            },
            {
                label: 'Semanalmente',
                value: 2,
            },
            {
                label: 'Todos os dias da Semana (Segunda a Sexta-feira)',
                value: 4,
            },
            {
                label: 'Personalizar...',
                value: 3,
            },

        ];

        this.breadcrumb.setCrumbs([
            {
                label: 'Nova Agenda',
                // routerLink: BLANK_ROUTE_LIST
            }
        ]);


        this.diasSemana = [
            {
                label: 'Domingo',
                value: 7,
            },
            {
                label: 'Segunda - Feira',
                value: 1,
            },
            {
                label: 'Terça - Feira',
                value: 2,
            },
            {
                label: 'Quarta - Feira',
                value: 3,
            },
            {
                label: 'Quinta - Feira',
                value: 4,
            },
            {
                label: 'Sexta - Feira',
                value: 5,
            },
            {
                label: 'Sábado',
                value: 6,
            },
        ];

        this.dataStatus = [
            {label: 'Disponivel', value: 1},
            {label: 'Reservado', value: 2},
            {label: 'Indisponivel', value: 3},
        ];

        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            // defaultView: 'timeGridDay',
            allDaySlot: false,
            eventLimit: 4,
            editable: false,
            eventDurationEditable: false,
            ignoreTimezone: false,
            locale: 'pt-br',
            columnFormat: {
                month: 'ddd',
                week: 'ddd d',
                day: ''
            },
            axisFormat: 'H:mm',
            timeFormat: {
                '': 'H:mm',
                agenda: 'H:mm{ - H:mm}'
            },
            buttonText: {
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia'
            },
            datesRender: (e) => {
                if (this.reload) {
                    this.selectedDate = e.view.currentStart;
                    this.getMonthCurrent(e);
                }
            }
        };
        this.initFormHorario();
        this.initHorario();
        this.horaMask = UtilService.horaMasc();
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    changeDataInicio($event) {
        if (this.formHorario.controls['ocorrencia'].value == 0) {
            this.mesmoDia();
        }
    }

    mesmoDia() {
        this.formHorario.controls['dth_fim'].setValue(this.formHorario.controls['dth_inicio'].value);
    }

    initFormHorario() {
        this.formHorario = this.fb.group({
            'locacao_id': [this.locacao, Validators.compose([Validators.required])],
            'dth_inicio': [this.minDate, Validators.compose([Validators.required])],
            'dth_fim': [this.minDate, Validators.compose([Validators.required])],
            'ocorrencia': [0, Validators.compose([Validators.required])],
            'funcionamento_semanal': [null],
            'horarios': this.fb.array([]),
        });
    }

    mudarLocacao(ev) {
        const calendario = this.fc.getCalendar();
        if (!isNullOrUndefined(calendario)) {
            this.getMonthCurrent(calendario);
        }
    }

    montarHorarios(dataPro) {

        console.log(dataPro);
        const data = Object.assign({}, dataPro);
        data.horarios = [];
        this.events = this.eventosLocacao;
        if (!this.formHorario.invalid) {
            if (this.formMaisHorarios.invalid) {
                AlertService.infomessage('Informativo', 'Preencha todos os campos do formulário corretamente!');
                return;
            }
            const difDate = UtilService.dateDiff(
                UtilService.transformDate(data.dth_fim, 'yyyy-MM-dd'),
                UtilService.transformDate(data.dth_inicio, 'yyyy-MM-dd')
            );

            data.horarios.push(this.formMaisHorarios.value);
            let auxDay = UtilService.dateFrom(UtilService.transformDate(data.dth_inicio, 'yyyy-MM-dd'));

            if (data.horarios.length > 0) {
                for (let i = 0; i < difDate; i++) {
                    console.log(i);
                    /*data.horarios.forEach((item, index) => {
                        if (data.horarios[index].dth_inicio > data.horarios[index].dth_fim) {
                            AlertService.infomessage('Informativo', 'O horario final deve ser maior que o inicial!');
                            this.delHorario(index);
                            return;
                        }
                        data.horarios[index].dth_inicio = data.horarios[index].dth_inicio + ':00';
                        data.horarios[index].dth_fim = data.horarios[index].dth_fim + ':00';
                    });*/
                    if (data.ocorrencia != 0) {
                        const temDia = data.funcionamento_semanal.find((value) => {
                            const day = auxDay.getDay();
                            const item = value == day;
                            return item;
                        });
                        if (isNullOrUndefined(temDia)) {
                            auxDay = UtilService.addDay(auxDay, 1);
                            continue;
                        }
                    }
                    data.horarios.forEach((item, index) => {
                        this.events.push({
                            'title': 'Disponível',
                            'start': UtilService.transformDate(auxDay, 'yyyy-MM-dd') + ' ' + item.dth_inicio,
                            'end': UtilService.transformDate(auxDay, 'yyyy-MM-dd') + ' ' + item.dth_fim
                        });
                    });

                    data.dth_inicio = UtilService.transformDate(data.dth_inicio, 'yyyy-MM-dd') + ' 00:00:00';
                    data.dth_fim = UtilService.transformDate(data.dth_fim, 'yyyy-MM-dd') + ' 00:00:00';
                    auxDay = UtilService.addDay(auxDay, 1);
                }
            }
        }
        this.desativaReload();
        this.reloadCalendario();
        this.ativaReload();
    }

    reloadCalendario() {
        this.fc.ngOnDestroy();
        this.fc.initialize();
    }

    ativaReload() {
        this.reload = true;
    }

    desativaReload() {
        this.reload = false;
    }

    initHorario() {
        this.formMaisHorarios = this.fb.group({
            'id': [null],
            'dth_inicio': [null, Validators.compose([Validators.required])],
            'dth_fim': [null, Validators.compose([Validators.required])],
            'valor': [null, Validators.compose([Validators.required])],
            'informar_saida': [true, Validators.compose([Validators.required])],
            'hr_ativo_app': [true, Validators.compose([Validators.required])],
        });
    }

    checkOcorrencia(value) {

        let dias: any = null;

        switch (value.value) {
            case 0:
                dias = null;
                this.mesmoDia();
                break;
            case 1:
                dias = [1, 2, 3, 4, 5, 6, 7];
                break;
            case 2:
                dias = [UtilService.addDay(this.selectedDate, 1).getDay()];
                break;
            case 3:
                dias = null;
                break;
            case 4:
                dias = [1, 2, 3, 4, 5];
                break;
        }

        this.formHorario.controls['funcionamento_semanal'].setValue(dias);

    }

    salvarHorario(data) {
        if (!this.formHorario.invalid) {
            if (this.formMaisHorarios.invalid) {
                AlertService.infomessage('Informativo', 'Preencha todos os campos do formulário corretamente!');
                return;
            }
            data.horarios.push(this.formMaisHorarios.value);

            if (data.horarios.length > 0) {
                /*data.horarios.forEach((item, index) => {
                    if (data.horarios[index].dth_inicio > data.horarios[index].dth_fim) {
                        AlertService.infomessage('Informativo', 'O horario final deve ser maior que o inicial!');
                        this.delHorario(index);
                        return;
                    }
                    data.horarios[index].dth_inicio = data.horarios[index].dth_inicio + ':00';
                    data.horarios[index].dth_fim = data.horarios[index].dth_fim + ':00';
                });*/
                let hora_fim: any;
                data.horarios.forEach((item, index) => {
                    data.horarios[index].dth_inicio = UtilService.transformDate(data.dth_inicio, 'yyyy-MM-dd') + ' ' + data.horarios[index].dth_inicio;
                    if (data.horarios[index].dth_inicio < data.horarios[index].dth_fim) {
                        hora_fim = data.horarios[index].dth_fim;
                        const data_nova = UtilService.dateFrom(UtilService.transformDate(data.dth_inicio, 'yyyy-MM-dd') + ' ' + hora_fim);
                        data.horarios[index].dth_fim = UtilService.transformDate(UtilService.addDay(data_nova, 1), 'yyyy-MM-dd') + ' ' + hora_fim;
                        return;
                    }
                    data.horarios[index].dth_fim = UtilService.transformDate(data.dth_inicio, 'yyyy-MM-dd') + ' ' + data.horarios[index].dth_fim;
                });
                data.dth_inicio = UtilService.transformDate(data.dth_inicio, 'yyyy-MM-dd') + ' 00:00:00';
                data.dth_fim = UtilService.transformDate(data.dth_fim, 'yyyy-MM-dd') + ' 00:00:00';
            }
            this.horarioService.create(data).subscribe(res => {
                this.router.navigate([AGENDA_ROUTE_LIST_CALENDARIO]);
            });
            return;
        }
        AlertService.infomessage('Informativo', 'Preencha todos os campos do formulário corretamente!');
    }

    voltar() {
        this.router.navigate([AGENDA_ROUTE_LIST_CALENDARIO]);
    }

    loadEventos(locacao, mes, ano) {
        this.horarioService.horariosByMes(locacao, mes, ano).subscribe(res => {
            this.events = res.data;
            this.eventosLocacao = res.data;
        });
    }

    getMonthCurrent(ev) {
        this.defaultView = ev.view.type;
        const locacao = this.formHorario.controls['locacao_id'].value;

        if (ev.view.type == 'timeGridDay') {
            this.viewCurrentMonth = ev.view.currentStart;
            if (!isNullOrUndefined(locacao)) {
                this.loadEventos(locacao, this.viewCurrentMonth, ev.view.currentStart.getFullYear());
                this.selectedDate = ev.view.currentStart;
            }
        }

        if (ev.view.type == 'timeGridWeek') {
            this.viewCurrentMonth = ev.view.currentStart.getUTCMonth();

            if (!isNullOrUndefined(locacao)) {
                this.loadEventos(locacao, this.viewCurrentMonth, ev.view.currentStart.getFullYear());
            }
        }

        if (ev.view.type == 'dayGridMonth') {
            this.viewCurrentMonth = ev.view.currentStart.getUTCMonth();
            if (!isNullOrUndefined(locacao)) {
                this.loadEventos(locacao, this.viewCurrentMonth + 1, ev.view.currentStart.getFullYear());
            }
        }

    }
}
