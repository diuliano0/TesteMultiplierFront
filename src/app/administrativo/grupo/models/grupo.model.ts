import {Deserializable} from "../../../../core/interfaces/deserializable.model";
import {BaseModel} from "../../../../core/models/base.model";
import {isArray, isNullOrUndefined, isObject} from "util";
import {PermissaoModel} from "./permissao.model";
import {RotaModel} from "../../rota/models/rota.model";

const DESATIVADO = 0;
const ATIVADO = 1;

export class GrupoModel extends BaseModel implements Deserializable {
    nome: string;
    descricao: string;
    status;
    rotas: RotaModel[];
    permissoes: PermissaoModel[];
    created_at: string;
    updated_at: string;
    dashboards;

    deserialize(input) {
        if (!isArray(input)) {
            this.assingItens(input);
            Object.assign(this, input);
            return this;
        }
        const array: GrupoModel[] = [];
        input.forEach((item, key) => {
            array.push(Object.assign(new GrupoModel(), item));
        });
        return array;
    }

    static getGrupoStatus(tipo) {
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
            {label: 'Ativado', value: ATIVADO},
            {label: 'Desativado', value: DESATIVADO},
        ];
    }

    private assingItens(input) {
        if (input.hasOwnProperty('rotas'))
            input.rotas = (new RotaModel()).deserialize(input.rotas.data);
    }
}
