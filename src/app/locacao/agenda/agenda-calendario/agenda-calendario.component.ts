import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {LocacoesService} from '../../locacoes/services/locacoes.service';
import {ListAbstract} from '../../../../core/components/list.abstract';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilService} from '../../../../core/services/util.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../core/services/alert.service.com';
import {isNullOrUndefined} from 'util';
import {AgendaHorarioService} from '../agenda-horario.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {AGENDA_ROUTE_LIST_CALENDARIO} from '../agenda.consts';
import {FullCalendar} from 'primeng';
import {LocadorService} from '../../locador/services/locador.service';
import {ReservaService} from '../../reserva/services/reserva.service';

@Component({
    selector: 'app-agenda-calendario',
    templateUrl: './agenda-calendario.component.html',
    styleUrls: ['./agenda-calendario.component.scss'],
    providers: [
        LocacoesService,
        AlertService,
        LocadorService,
        AgendaHorarioService,
        ReservaService,
    ],
    encapsulation: ViewEncapsulation.None
})
export class AgendaCalendarioComponent extends ListAbstract implements OnInit, AfterViewInit, AfterViewChecked {

    events;
    locacao;
    selectLocacao;

    queryParams;

    minDate;
    ocorrencia;
    diasSemana;
    meio_pagamento;
    horaMask;

    selectLocador = [];

    pt;
    formGerarHorarios: FormGroup;
    formHorario: any;
    formOpcoesHorarios: FormGroup;
    formOpcoesReserva: any;
    private defaultView: any;
    private viewCurrentMonth: any;

    selectedPermitirApp: any;
    selectedDate;
    options;

    habilitar_reserva = true;

    display_modal_opcoes;
    display_modal_horario;
    display_modal_reserva;
    selectedEvent;

    @ViewChild('fc') fc: FullCalendar;

    constructor(
        private cdRef: ChangeDetectorRef,
        private breadcrumb: BreadcrumbService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private locacoesService: LocacoesService,
        private reservaService: ReservaService,
        private alertService: AlertService,
        private locadorService: LocadorService,
        private horarioService: AgendaHorarioService,
        private router: Router) {
        super();
        this.queryParams = this.activatedRoute.snapshot.queryParams;
        if (this.queryParams.hasOwnProperty('locacao')) {
            this.locacao = Number(this.queryParams.locacao);
        }
    }

    ngOnInit() {
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
            dateClick: (e) => {
                console.log(e);
            },
            viewSkeletonRender: (e) => {
                // alert('viewSkeletonRender')
                // this.getMonthCurrent(e);
            },
            eventClick: (e) => {
                this.detalheEvento(e);
            },
            eventRender: (e) => {
                this.renderHtml(e.event, e.el);
            },
            navLinks: true,
            navLinkDayClick: (e) => {
                this.addEvento(e);
            },
            datesRender: (e) => {
                this.selectedDate = e.view.currentStart;
                this.getMonthCurrent(e);
            }
        };

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

        this.diasSemana = [
            {
                label: 'Domingo',
                value: 7,
            },
            {
                label: 'Segunda',
                value: 1,
            },
            {
                label: 'Terça',
                value: 2,
            },
            {
                label: 'Quarta',
                value: 3,
            },
            {
                label: 'Quinta',
                value: 4,
            },
            {
                label: 'Sexta',
                value: 5,
            },
            {
                label: 'Sábado',
                value: 6,
            },
        ];

        this.meio_pagamento = [
            {
                label: 'Cartão de Débito',
                value: 0,
            },
            {
                label: 'Cartão de Crédito',
                value: 10,
            },
            {
                label: 'Boleto',
                value: 8,
            },
        ];

        this.breadcrumb.setCrumbs([
            {
                label: 'Agenda',
                routerLink: '/saude/agenda'
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
        this.horaMask = UtilService.horaMasc();
        this.initFormHorario();
        this.initFormOpcoes();
    }

    loadEventos(locacao, mes, ano) {
        this.horarioService.horariosByMes(locacao, mes, ano).subscribe(res => {
            this.events = res.data;
        });
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    ngAfterViewInit(): void {
        if (this.queryParams.hasOwnProperty('locacao')) {
            const calendario = this.fc.getCalendar();
            if (!isNullOrUndefined(calendario)) {
                this.getMonthCurrent(calendario);
            }
        }
    }

    mudarLocacao(ev) {
        const parent = {
            queryParams: {
                'locacao': ev.value,
            }
        };
        this.locacao = ev.value;
        this.reload();
        this.router.navigate([AGENDA_ROUTE_LIST_CALENDARIO], parent);
        this.queryParams = {
            locacao: ev.value
        };
    }

    getMonthCurrent(ev) {
        this.defaultView = ev.view.type;
        if (ev.view.type == 'timeGridDay') {
            this.viewCurrentMonth = ev.view.currentStart;
            if (!isNullOrUndefined(this.locacao)) {
                this.loadEventos(this.locacao, this.viewCurrentMonth, ev.view.currentStart.getFullYear());
                this.selectedDate = ev.view.currentStart;
            }
        }
        if (ev.view.type == 'timeGridWeek') {
            this.viewCurrentMonth = ev.view.currentStart.getUTCMonth();

            if (!isNullOrUndefined(this.locacao)) {
                this.loadEventos(this.locacao, this.viewCurrentMonth, ev.view.currentStart.getFullYear());
            }
        }
        if (ev.view.type == 'dayGridMonth') {
            this.viewCurrentMonth = ev.view.currentStart.getUTCMonth();

            if (!isNullOrUndefined(this.locacao)) {
                this.loadEventos(this.locacao, this.viewCurrentMonth + 1, ev.view.currentStart.getFullYear());
            }

        }
    }

    addEvento(ev) {
        let selectedDay = new Date(UtilService.transformDate(ev, 'yyyy-MM-dd'));
        selectedDay = UtilService.addDay(selectedDay, 1);

        if (selectedDay < (new Date())) {
            return;
        }

        this.desabilitarReserva();

        const locacao = this.selectLocacao.data.find(res => res.value == this.locacao);
        this.formOpcoesHorarios.controls['locacao_nome'].setValue(locacao.label);
        this.formOpcoesHorarios.controls['locacao_id'].setValue(this.locacao);
        this.formOpcoesHorarios.controls['dth_inicio'].setValue(selectedDay);
        this.formOpcoesHorarios.controls['dth_fim'].setValue(selectedDay);
        this.formOpcoesHorarios.controls['data_locacao'].setValue(UtilService.transformDate(selectedDay, 'dd/MM/yyyy'));
        // this.display_modal_horario = true;
        this.display_modal_opcoes = true;
    }

    detalheEvento(e) {
        // this.abrirModalReserva();
        this.habilitarReserva();
        this.abrirModalOpcoes();
        this.selectedEvent = this.events.find(x => x.id == e.event.id);
        this.selectedEvent.dth_inicio = this.selectedEvent.start;
        this.selectedEvent.dth_fim = this.selectedEvent.end;
        this.selectedEvent.locador_nome = (isNullOrUndefined(this.selectedEvent.locador_nome) ? 'Sem Reserva' : this.selectedEvent.locador_nome);
        this.selectedEvent.data_locacao = UtilService.transformDate(this.selectedEvent.start, 'dd/MM/yyyy');
        this.formOpcoesHorarios.patchValue(this.selectedEvent);
    }

    renderHtml(event, element) {
        const agendamento = event.extendedProps;
        if (agendamento.hr_ativo_app) {
            // element.innerHTML += '<i class="ui-icon-phone-iphone fa-size-phone"></i>';
        }
    }

    abrirModalOpcoes() {
        this.display_modal_opcoes = true;
    }

    fecharModalOpcoes() {
        this.display_modal_opcoes = false;
    }

    abrirModalHorario() {
        this.display_modal_horario = true;
    }

    fecharModalHorario() {
        this.display_modal_horario = false;
        this.initFormHorario();
        this.reload();
    }

    abrirModalReserva() {
        this.display_modal_reserva = true;
    }

    fecharModalReserva() {
        this.display_modal_reserva = false;
    }

    cancelarReserva() {
        this.alertService.confirm({
            title: 'Confirmação!',
            html: `Tem certeza que deseja cancelar esta reserva? <br /><br /> Será cobrada <b>taxa administrativa</b> do valor recebido.`,
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
        }).then((success: any) => {
            if (success.value == true) {
                this.reservaService.cancelar(this.selectedEvent.reserva_id).subscribe(res => {
                    AlertService.sucess('Confirmação!', 'Reserva cancelada com sucesso!');
                    this.reload();
                    this.fecharModalOpcoes();
                }, error => {
                });
            }
        }, error => {
        });
    }

    initFormHorario() {
        this.formHorario = this.fb.group({
            'locacao_id': [this.locacao],
            'dth_inicio': [null, Validators.compose([Validators.required])],
            'dth_fim': [null, Validators.compose([Validators.required])],
            'ocorrencia': [null, Validators.compose([Validators.required])],
            'funcionamento_semanal': [null],
            'horarios': this.fb.array([]),
        });
    }

    initFormOpcoes() {
        this.formOpcoesHorarios = this.fb.group({
            'locacao_id': [this.locacao, Validators.compose([Validators.required])],
            'locador_id': [null],
            'reserva_id': [null],
            'locacao_nome': [null],
            'locador_nome': ['Sem Reserva'],
            'locador_telefone': [null],
            'dth_inicio': [null, Validators.compose([Validators.required])],
            'dth_fim': [null, Validators.compose([Validators.required])],
            'data_locacao': [null],
            'hr_ativo_app': [true, Validators.compose([Validators.required])],
            'valor': [null, Validators.compose([Validators.required])],
        });
    }

    delHorario(index: number): void {
        const arrayControl = <FormArray>this.formHorario.controls['horarios'];
        arrayControl.removeAt(index);
    }

    salvarHorario(data) {
        console.log(this.formOpcoesHorarios);
        if (!this.formOpcoesHorarios.invalid) {
            data.dth_inicio = UtilService.transformDate(data.dth_inicio, 'yyyy-MM-dd HH:mm:ss') ;
            data.dth_fim = UtilService.transformDate(data.dth_fim, 'yyyy-MM-dd HH:mm:ss');
            this.horarioService.smartCreate(data).subscribe(res => {
                this.fecharModalOpcoes();
                this.reload();
            });
        }
    }


    abrirGeradorHorarios() {
    }

    checkOcorrencia(value) {

        let dias: any = null;

        switch (value.value) {
            case 0:
                dias = null;
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

    excluirHorario(id) {
        this.horarioService.destroy(id).subscribe(res => {
            this.reload();
            this.fecharModalReserva();
        });
    }

    reload() {
        const calendario = this.fc.getCalendar();
        if (!isNullOrUndefined(calendario)) {
            this.getMonthCurrent(calendario);
        }
    }

    removerHorario(id) {

        if (this.selectedEvent.possui_reserva) {
            AlertService.infomessage('Informativo!', 'Esse horário possui reserva não pode ser excluído primeiro cancele a reserva.');
            return;
        }

        this.alertService.confirm({
            title: 'Confirmação!',
            text: 'Tem certeza que deseja excluir este horário?',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
        }).then((success: any) => {
            if (success.value == true) {
                this.horarioService.excluirHorario(id).subscribe(res => {
                    this.reload();
                    this.fecharModalOpcoes();
                }, error => {
                    AlertService.infomessage('Informativo!', 'Esse horário possui reserva não pode ser excluído.');
                });
            }
        }, error => {
        });
    }

    selectLocadorAutoComplete($event) {
        this.formOpcoesHorarios.controls['locador_telefone'].setValue(this.selectLocador[0].telefone_locador);
    }

    buscarLocador(qev) {
        if (qev.query.length > 2) {
            this.locadorService.listaLocadores(qev.query).subscribe((res) => {
                this.selectLocador = res.data;
            });
        }
    }


    reservar(value) {

        if (this.formOpcoesHorarios.invalid) {
            AlertService.infomessage('Informativo', 'Formulário contém campos inválidos!');
            return;
        }
        this.alertService.confirm({
            title: 'Confirmação!',
            text: 'Deseja reservar este horário para ' + this.selectLocador[0].nome_locador + '?',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
        }).then((success: any) => {
            if (success.value == true) {
                this.reservaService.reservar(this.selectedEvent.id, value.locador_id.value).subscribe(res => {
                    this.reload();
                    this.fecharModalOpcoes();
                }, error => {
                    AlertService.infomessage('Informativo!', 'Esse horário possui reserva não pode ser excluído.');
                });
            }
        }, error => {
        });
    }


    habilitarReserva() {
        this.habilitar_reserva = true;
    }

    desabilitarReserva() {
        this.habilitar_reserva = false;
    }
}

