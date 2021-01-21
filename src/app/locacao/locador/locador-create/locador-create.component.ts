import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {UtilService} from '../../../../core/services/util.service';
import {LOCADOR_ROUTE_LIST} from '../locador.conts';
import {UsuarioModel} from '../../../administrativo/usuario/models/usuario.model';
import {PessoaModel} from '../../../../core/models/pessoa.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../core/q-breadcrumb/breadcrumb.service';
import {LocadorService} from '../services/locador.service';
import {TelefoneModel} from '../../../administrativo/shared/telefone/models/telefone.model';
import {CreateComponentInterface} from '../../../../core/interfaces/create-component.interface';

@Component({
  selector: 'app-locador-create',
  templateUrl: './locador-create.component.html',
  styleUrls: ['./locador-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocadorCreateComponent  implements OnInit, CreateComponentInterface {

  locadorForm: FormGroup;
  cpfMask;
  locador: any;
  routeParams;
  telefones: TelefoneModel[];
  endereco;
  pessoa1;
  private _pessoa: PessoaModel;
  private _usuario: UsuarioModel;

  imagePath = '../../../../assets/images/user.svg';

  constructor(private breadcrumb: BreadcrumbService,
              private locadorService: LocadorService,
              protected activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.routeParams = this.activatedRoute.snapshot.params;
  }

  get pessoa(): PessoaModel {
    return this._pessoa;
  }

  set pessoa(value: PessoaModel) {
    const usuario = Object.assign({}, this.usuario);
    usuario.nome = value.nome;
    usuario.email = value.email;
    usuario.cpf = value.cpf_cnpj;
    this.usuario = usuario;
    this._pessoa = value;
  }

  get usuario(): UsuarioModel {
    return this._usuario;
  }

  set usuario(value: UsuarioModel) {
    this._usuario = value;
  }

  ngOnInit() {
    this.locadorForm = this.fb.group({
      'matricula': [null],
      'filial_id': [null],
    });
    this.cpfMask = UtilService.cpfMasc();
    if (isNullOrUndefined(this.routeParams.id)) {
      this.breadcrumb.setCrumbs([
        {label: 'Criar Locador'},
      ], false);
    } else {
      this.locadorService.get(this.routeParams.id, {
        include: 'pessoa.enderecos,pessoa.telefones,anexo,usuario'
      }).subscribe((res: any) => {
        this.locador = res.data;
        this.pessoa = this.locador.pessoa;
        // if (!isNullOrUndefined(this.locador.pessoa.data_nascimento))
        //     this.locador.pessoa.data_nascimento = new Date(this.locador.pessoa.data_nascimento);
        this.usuario = this.locador.usuario;
        this.endereco =  isNullOrUndefined(this.locador.pessoa.enderecos) ? null : this.locador.pessoa.enderecos[0];
        this.telefones = this.locador.pessoa.telefones || null;
        if (!isNullOrUndefined(res.data.anexo))
          this.imagePath = res.data.anexo.data.url;
        this.locadorForm.patchValue(this.locador);
      });
      this.breadcrumb.setCrumbs([
        {label: 'Editar Locador'},
      ], false);
    }
  }


  salvar(locador) {
    if (!this.locadorForm.invalid && !isNullOrUndefined(this.endereco) ) {
      let data: any = (isNullOrUndefined(this.locador)) ? {} : this.locador;
      data.pessoa = this.pessoa;
      if (isNullOrUndefined(this.pessoa['id'])) data.user = this.usuario;
      if (!isNullOrUndefined(data.pessoa.anexo.conteudo)) {
        data.anexo = data.pessoa.anexo;
        //data.user.anexo = data.pessoa.anexo;
      }
      data.pessoa.enderecos = [this.endereco];
      data.pessoa.telefones = this.telefones;
      if (isNullOrUndefined(this.routeParams.id)) {
        this.locadorService.create(data).subscribe((e) => {
          this.router.navigate([LOCADOR_ROUTE_LIST]);
        });
      } else {
        this.locadorService.update(this.routeParams.id, data).subscribe((e) => {
          this.router.navigate([LOCADOR_ROUTE_LIST]);
        });
      }

    }
  }

}
