import {Deserializable} from "../interfaces/deserializable.model";
import {BaseModel} from "./base.model";
import {isArray, isNullOrUndefined} from "util";
import {EnderecoModel} from "../../app/administrativo/shared/endereco/models/endereco.model";
import {TelefoneModel} from "../../app/administrativo/shared/telefone/models/telefone.model";


const FEMININO = 0;
const MASCULINO = 1;

const SOLTEIRO = 0;
const CASADO = 1;
const VIUVO = 2;
const SEPARADO = 3;
const DIVORCIADO = 4;
const UNIAO_ESTAVEL = 5;

const COMUNHAO_PARCIAL = 0;
const COMUNHAO_UNIVERSAL = 1;
const SEPARACAO_TOTAL = 2;
const NAO_INFORMADO = 3;

export class PessoaModel extends BaseModel implements Deserializable {
    nome: string;
    email: string;
    cpf_cnpj: string;
    estado_civil: number;
    regime_uniao: number;
    data_nascimento: Date;
    sexo: number;
    filiacao_mae: string;
    razao_social: string;
    inscricao_municipal: string;
    inscricao_estadual: string;
    telefones: string;
    data_fundacao: any;
    descricao: string;
    created_at: Date;
    updated_at: Date;
    enderecos;

    deserialize(input) {
        if (!isArray(input)) {
            this.assingItens(input);
            Object.assign(this, input);
            return this;
        }
        const array: PessoaModel[] = [];
        input.forEach((item, key) => {
            this.assingItens(item);
            array.push(Object.assign(new PessoaModel(), item));
        });
        return array;
    }

    static getPessoaSexo(tipo) {
        switch (tipo) {
            case FEMININO:
                return 'Feminino';
            case MASCULINO:
                return 'Masculino';
            default:
                return tipo;
        }
    }

    static getSexo() {
        return [
            {label: 'Feminino', value: FEMININO},
            {label: 'Masculino', value: MASCULINO},
        ];
    }

    static getPessoaEstadoCivil(tipo) {
        switch (tipo) {
            case SOLTEIRO:
                return 'Solteiro(a)';
            case CASADO:
                return 'Casado(a)';
            case VIUVO:
                return 'Viúvo(a)';
            case SEPARADO:
                return 'Separado(a)';
            case DIVORCIADO:
                return 'Divorciado(a)';
            case UNIAO_ESTAVEL:
                return 'União Estável';
            default:
                return tipo;
        }
    }

    static getEstadoCivil() {
        return [
            {label: 'Solteiro(a)', value: SOLTEIRO},
            {label: 'Casado(a)', value: CASADO},
            {label: 'Viúvo(a)', value: VIUVO},
            {label: 'Separado(a)', value: SEPARADO},
            {label: 'Divorciado(a)', value: DIVORCIADO},
            {label: 'União Estável', value: UNIAO_ESTAVEL},
        ];
    }

    static getPessoaRegimeUniao(tipo) {
        switch (tipo) {
            case COMUNHAO_PARCIAL:
                return 'Comunhão Parcial de Bens';
            case COMUNHAO_UNIVERSAL:
                return 'Comunhão Universal de Bens';
            case SEPARACAO_TOTAL:
                return 'Separação Total de Bens';
            case NAO_INFORMADO:
                return 'Não Informado';
            default:
                return tipo;
        }
    }

    static getRegimeUniao() {
        return [
            {label: 'Comunhão Parcial de Bens', value: COMUNHAO_PARCIAL},
            {label: 'Comunhão Universal de Bens', value: COMUNHAO_UNIVERSAL},
            {label: 'Separação Total de Bens', value: SEPARACAO_TOTAL},
            {label: 'Não Informado', value: NAO_INFORMADO},
        ];
    }

    private assingItens(input) {
        if (!isNullOrUndefined(input) && input.hasOwnProperty('telefones'))
            input.telefones = (new TelefoneModel()).deserialize(input.telefones.data);

        if (!isNullOrUndefined(input) && input.hasOwnProperty('enderecos'))
            input.enderecos = (new EnderecoModel()).deserialize(input.enderecos.data);

    }
}
