import {Deserializable} from "../../../../core/interfaces/deserializable.model";
import {isArray} from "util";
import {RotaModel} from "../../rota/models/rota.model";
import {GrupoModel} from "../../grupo/models/grupo.model";

const DESATIVADO = 0;
const ATIVADO = 1;

export class UsuarioModel implements Deserializable {

    username: string;
    password: string;
    password_confirmation: string;
    email: string;
    cpf: string;
    nome: string;
    anexo;
    status;
    isAdmin: boolean;
    created_at: string;
    updated_at: string;
    grupos;
    rotas;

    deserialize(input) {
        if (!isArray(input)) {
            Object.assign(this, input);
            return this;
        }
        const array: UsuarioModel[] = [];
        input.forEach((item, key) => {
            array.push(Object.assign(new UsuarioModel(), item));
        });
        return array;
    }

    private assingItens(input) {
        if (input.hasOwnProperty('rotas'))
            input.rotas = (new RotaModel()).deserialize(input.rotas.data);
        if (input.hasOwnProperty('grupos'))
            input.grupos = (new GrupoModel()).deserialize(input.grupos.data);
    }

    static getUsuarioStatus(tipo) {
        switch (tipo) {
            case DESATIVADO:
                return 'Desativado';
            case ATIVADO:
                return 'Ativado';
            default:
                return tipo;
        }
    }

    static getStatus() {
        return [
            {label: 'Desativado', value: DESATIVADO},
            {label: 'Ativado', value: ATIVADO},
        ];
    }
}
